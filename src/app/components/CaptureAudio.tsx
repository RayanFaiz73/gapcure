"use client";
import { axiosAuth } from "@/lib/axiosInstance";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs"
import { FaCirclePause, FaMicrophone, FaPlay, FaStop, FaTrash } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import { reducerCases } from "../contexts/constants";
import { useStateProvider } from "../contexts/StateContext";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SEND_MESSAGE } from "@/utils/ApiRoutes";


const CaptureAudio = ({hide} : { hide: Dispatch<SetStateAction<boolean>>; }) => {
    const [{currentRoom, messages, socket}, dispatch] = useStateProvider();
    const [isRecording, setIsRecording] = useState(false)
    const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement>()
    const [waveform, setWaveform] = useState<any>()
    const [recordingDuration, setRecordingDuration] = useState(0)
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [renderedAudio, setRenderedAudio] = useState<string | Blob>("")

    const audioRef = useRef<any>(null)
    const mediaRecordedRef = useRef<any>(null)
    const waveFormRef = useRef<any>()

    useEffect(()=>{
        let interval: string | number | NodeJS.Timeout | undefined;
        if(isRecording){
            interval = setInterval(() => {
                setRecordingDuration((prevDuration) => {
                    setTotalDuration(prevDuration + 1)
                    return prevDuration +1;
                });
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }
    },[isRecording])

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: waveFormRef.current,
            waveColor: "#ccc",
            progressColor: "#7ae3c3",
            barWidth: 2,
            height: 30
        });
        setWaveform(wavesurfer);

        wavesurfer.on("finish", () =>{
            setIsPlaying(false);
        })
        return () => {
            wavesurfer.destroy();
        }
    },[])

    useEffect(() => {
        if(waveform) handleStartRecording();
    },[waveform]);

    const formatTime = (time : number) => {
        if(isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    const handleStartRecording = () => {
        setRecordingDuration(0);
        setCurrentPlaybackTime(0);
        setTotalDuration(0);
        setIsRecording(true);
        navigator.mediaDevices.getUserMedia({ audio:true}).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecordedRef.current = mediaRecorder;
            audioRef.current.srcObject = stream; 


            const chunks: BlobPart[] | undefined = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                setRecordedAudio(audio);

                waveform.load(audioUrl);
            }
            mediaRecorder.start();
        }).catch(error => {
            console.log(error)
        })

    }
    const handleStopRecording = () => {
        if(mediaRecordedRef.current && isRecording){
            mediaRecordedRef.current.stop();
            setIsRecording(false);
            waveform.stop();

            const audioChunks: any[] | undefined = [];
            mediaRecordedRef.current.addEventListener("dataavailable", (event: any ) => {
                audioChunks.push(event.data);
            });

            mediaRecordedRef.current.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/mp3"});
                const audioFile = new File([audioBlob], "recording.mp3");
                setRenderedAudio(audioFile);
            })
        }
    }
    useEffect(()=> {
        if(recordedAudio) {
            const updatePlaybackTime = () => {
                setCurrentPlaybackTime(recordedAudio.currentTime);
            }
            recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
            return () => {
                recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
            }
        }
    },[recordedAudio])
    const handlePlayRecording = () => {
        if(recordedAudio){
            waveform.stop();
            waveform.play();
            recordedAudio.play();
            setIsPlaying(true);
        }
    }
    const handlePauseRecording = () => {
        waveform.stop();
        recordedAudio?.pause();
        setIsPlaying(false);
    }



    const sendRecording = async () =>{
        try {
            const formData = new FormData();
            formData.append("room_id", currentRoom.id)
            formData.append("audio", renderedAudio)
            const { data } = await axiosAuth.post(SEND_MESSAGE, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            socket.current.emit("send-msg",{
                room_id:currentRoom.id,
                message: data.message,
                senderRooms: data.senderRooms,
                unreadSenderMessages:data.unreadSenderMessages,
                receiverRooms: data.receiverRooms,
                unreadReceiverMessages:data.unreadReceiverMessages,
            })
            dispatch({
                type:reducerCases.ADD_MESSAGE,
                newMessage:{
                    ...data.message
                },
                fromSelf : true
            })
            dispatch({
                type:reducerCases.SET_ROOMS,
                rooms:data.senderRooms
            })
            hide(false)
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors?.length > 0) {
                    toast.error(error.response?.data?.errors[0],{
                        style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        },
                    });
                }
                toast.error(error.response?.data.message,{
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                });
            } else {
                toast.error(error.message,{
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                });
            }
        }
    }
    return (
        <div className="flex text-2xl w-full justify-end items-center h-20">
            <div className="">
                <FaTrash className="" onClick={() => hide(false)} />
            </div>
            <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-theme-primary-700 rounded-full">
                {isRecording ? (<div className="text-red-500 animate-pulse 2-60 text-center">
                    Recording <span>{recordingDuration}s</span>
                </div>
                ):(
                <div>
                    {recordedAudio && (
                        <>
                        {!isPlaying ? (
                            <FaPlay onClick={handlePlayRecording} />
                        ) : (

                            <FaStop onClick={handlePauseRecording} />
                        )}
                        </>
                    )}
                </div>
                )}
                <div className="w-60" ref={waveFormRef} hidden={isRecording} />
                { recordedAudio && isPlaying && (<span className="w-12">{formatTime(currentPlaybackTime)}</span>)}
                { recordedAudio && !isPlaying && (<span className="w-12">{formatTime(totalDuration)}</span>)}
                </div>
                <audio ref={audioRef} hidden />
                <div className="mr-4">
                    {!isRecording ? (
                        <FaMicrophone className="text-red-500" onClick={handleStartRecording} />
                    ):(
                        <FaCirclePause className="text-red-500" onClick={handleStopRecording} />

                    )}
                </div>
                {!isRecording && (
                    <div>
                        <MdSend className="cursor-pointer mr-4" title="Send" onClick={sendRecording} />
                    </div>
                    )}
        </div>
    );
};

export default CaptureAudio;