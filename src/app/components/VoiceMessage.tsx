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
import { HOST } from "@/utils/ApiRoutes";
import { Session, User, Message } from 'next-auth';
import { useSession } from 'next-auth/react';
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "./MessageStatus";


const VoiceMessage = ({ session, message } : { session: Session | null ,message: Message }) => {
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const [audioMessage, setAudioMessage] = useState<HTMLAudioElement>()

    const waveFormRef = useRef<any>(null)
    const waveform = useRef<any>(null)

    useEffect(() => {
        if(waveform.current === null){
            waveform.current = WaveSurfer.create({
                container: waveFormRef.current,
                waveColor: "#ccc",
                progressColor: "#7ae3c3",
                barWidth: 2,
                height: 30
            });
            waveform.current.on("finish", () =>{
                setIsPlaying(false);
            })
        }
        return () => {
            waveform.current.destroy();
        }
    },[])
    useEffect(() => {
        const audioURL = `${HOST}/${message.message}`;
        const audio = new Audio(audioURL)
        setAudioMessage(audio);
        waveform.current.load(audioURL)
        waveform.current.on("ready", () => {
            setTotalDuration(waveform.current.getDuration());
        })
        return () => {
            waveform.current.destroy();
        }
    },[message.message])


    const formatTime = (time : number) => {
        if(isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    useEffect(()=> {
        if(audioMessage) {
            const updatePlaybackTime = () => {
                setCurrentPlaybackTime(audioMessage.currentTime);
            }
            audioMessage.addEventListener("timeupdate", updatePlaybackTime);
            return () => {
                audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
            }
        }
    },[audioMessage])
    const handlePlayAudio = () => {
        if(audioMessage){
            waveform.current.stop();
            waveform.current.play();
            audioMessage.play();
            setIsPlaying(true);
        }
    }
    const handlePauseAudio = () => {
        waveform.current.stop();
        audioMessage?.pause();
        setIsPlaying(false);
    }


    return (
        <div className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md
        ${message.sender.id == session?.user?.id ? "bg-theme-primary-400" : "bg-theme-primary-300"}`}>
            {/* <div>
                Avatar
            </div> */}
            <div className="cursor-pointer text-xl">
                {!isPlaying ? (
                    <FaPlay onClick={handlePlayAudio} />
                ):(
                    <FaStop onClick={handlePauseAudio} />
                )}
            </div>
            <div className="relative">
                <div className="w-60" ref={waveFormRef} />
                <div className="text-[11px] pt-1 flex justify-between absolute bottom-[-18px] w-full">
                    <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
                    <div className="flex gap-1">
                        <span>
                            {calculateTime(message.created_at)}
                        </span>
                        {
                            message.sender.id === session?.user.id && <MessageStatus status={message.status} />
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VoiceMessage;