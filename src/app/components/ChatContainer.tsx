
'use client';

import { axiosAuth } from '@/lib/axiosInstance';
import { HOST, ROOM_MESSAGES, SEND_MESSAGE } from '@/utils/ApiRoutes';
import { calculateTime } from '@/utils/CalculateTime';
import axios from 'axios';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Message, Room, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { EmojiType } from 'next/dist/compiled/@vercel/og/emoji';
import Image from 'next/image';
import StartSVG from "../../assets/start.svg";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa6';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import { reducerCases } from '../contexts/constants';
import { useStateProvider } from '../contexts/StateContext';
import MessageStatus from './MessageStatus';
import PhotoPicker from './PhotoPicker';
import dynamic from "next/dynamic"
import VoiceMessage from './VoiceMessage';
import SearchMessages from './SearchMessages';
const CaptureAudio = dynamic(() => import("./CaptureAudio"),{ssr:false})
// import CaptureAudio from './CaptureAudio';


// const ChatContainer = ({ currentChat, socket }: { currentChat: any; socket: any; }) => {
const ChatContainer = () => {
    const { data: session } = useSession();
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const scrollRef = useRef();
    const emojiPickerRef = useRef<any>(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [chatWith, setChatWith] = useState<User | undefined>(undefined);
    const [{currentRoom, messages, socket, messagesSearch, onlineUsers, rooms}, dispatch] = useStateProvider();
    const [grabPhoto, setGrabPhoto] = useState<boolean>(false);
    const [showAudioRecorder, setShowAudioRecorder] = useState(false)
    const [socketEvent, setSocketEvent] = useState(false);
    const [newUserOnline, setNewUserOnline] = useState<number | null>(null)

    const ref = useRef<any>();
    const handleScrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if(event.target.id !== "emoji-open"){
                if(emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)){
                    setShowEmojiPicker(false);
                }
            }
        }
        document.addEventListener("click",handleOutsideClick);
        return () => {
            document.removeEventListener("click",handleOutsideClick);  
        }
    }, []);
    const handleEmojiModal = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (emoji : EmojiClickData) =>{
        setMessage((prevMessage) => (prevMessage += emoji.emoji));
    }

    const getAllMessages = async () => {
        
        const res = await axiosAuth.get(ROOM_MESSAGES(currentRoom.id));
        let roomMessages = res.data.messages
        // setMessages(roomMessages);
        dispatch({
            type:reducerCases.SET_MESSAGES,
            messages:roomMessages
        })
    };
    useEffect(() => {
        if(currentRoom){
            getAllMessages();
            if(currentRoom.sender.id == session?.user.id){
                setChatWith(currentRoom.receiver)
            }
            else{
                setChatWith(currentRoom.sender)
            }
        }
    }, [currentRoom]);
    useEffect(() => {
        if(socket.current && !socketEvent){
            socket.current.on("msg-receive",(data:any) => {
                // if(currentRoom && data.room_id == currentRoom?.id){
                    // dispatch({
                    //     type:reducerCases.ADD_MESSAGE,
                    //     newMessage:{
                    //         ...data.message,
                    //     }
                    // })
                // }
                dispatch({
                    type:reducerCases.SET_ROOMS,
                    rooms:data.receiverRooms
                })
            })
        socket.current.on("online-users",(data:any) => {
            setNewUserOnline(data.userId);
            dispatch({
                type:reducerCases.SET_ONLINE_USERS,
                onlineUsers:data.onlineUsers
            })
        })
        setSocketEvent(true)
    }
    if(currentRoom){
        socket.current.on("chat-read",(data:any) => {
            if(currentRoom.id == data.room_id){
                messages.forEach(function(v : Message) {
                    if( v.receiver.id == data.readBy && v.status !== "read" ){
                        v.status = "read";
                    }
                })
            }
            rooms.forEach((room : Room) => {
                if(room.id == data.room_id){
                    // room.messages.forEach(function(v, i) {
                    //     if( v.receiver.id == newUserOnline && v.status !== "read" ){
                    //         v.status = "read";
                    //     }
                    // })
                    if(room.lastMessage && room.lastMessage.receiver.id == data.readBy){
                        room.lastMessage.status = "read";
                    }
                }
            });
        })
    }
    }, [socket.current,messages]);
    useEffect(() => {
        messages.forEach(function(v : Message) {
            if( v.receiver.id == newUserOnline && v.status === "sent" ){
                v.status = "delivered";
            }
        })
    }, [onlineUsers]);
    const sendMessage = async () => {
        if(message){
            try {
                let postData = {
                    room_id:currentRoom.id,
                    message
                }
                const { data } = await axiosAuth.post(SEND_MESSAGE, postData);
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
                setMessage("");
                // handleScrollToBottom();
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
    }
    const photoPickerChange = async (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        let fileInput = e.target as HTMLInputElement;
        if (!fileInput.files) return;
        try {
            const file = fileInput?.files[0];
            const formData = new FormData();
            formData.append("room_id", currentRoom.id)
            formData.append("file", file)
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
            setMessage("");
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
    useEffect(() => {
        handleScrollToBottom();
    }, [messages])
    
    useEffect(() => {
        if(grabPhoto){
            const data = document.getElementById("photo-picker");
            data?.click();
            document.body.onfocus = (e:any) => {
                setTimeout(() => {
                    setGrabPhoto(false);
                },1000)
            }
        }
    }, [grabPhoto]);
    return (
        <div className="w-full lg:w-8/12 mb-3">
            <div className="flex flex-col justify-between bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="bg-theme-primary-700 dark:bg-gray-800 text-gray-300 dark:text-white px-6 pt-6 py-4 font-medium">
                    <div className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}>
                        <div className={`${messagesSearch ? "border-theme-primary-200 border-r pr-1 mr-1" : ""} `}>
                            <div className="flex items-center space-x-4 py-3 mb-6 sm:pb-4 border-gray-500 border-b">
                                <div className="flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full border" src={`https://flowbite.com/docs/images/people/profile-picture-1.jpg`} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                    {chatWith?.firstName} {chatWith?.lastName} 
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                    {chatWith?.role.name} 
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <BiSearch className="cursor-pointer text-xl" onClick={() => dispatch({type:reducerCases.SET_MESSAGE_SEARCH})} />
                                    <BsThreeDotsVertical className="cursor-pointer text-xl" />
                                </div>
                            </div>
                            <div className="overflow-x-hidden overflow-y-auto ">
                                <div className="h-[56vh] flex flex-col justify-end gap-1 overflow-auto" id="chatMessages">
                                    {!messages.length && (
                                        <div className="flex flex-col justify-center items-center">
                                            <Image src={StartSVG} alt="" className="h-[48vh]" priority />
                                            <h1 className="text-3xl text-white mt-4">
                                                Hello, <span>{session?.user?.name}!</span>
                                            </h1>
                                            <h3 className="text-base text-white mt-1">You can chat with {chatWith?.firstName} {chatWith?.lastName}.</h3>
                                        </div>
                                    )}
                                    {messages.map((message: Message, index: any) => (
                                        <div key={index}
                                        className={`flex ${message.sender.id === session?.user.id ? "justify-end" : "justify-start"} `}>
                                            {message.type === "text" && (
                                                <div
                                                className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 
                                                ${message.sender.id == session?.user.id ? "bg-theme-primary-400" : "bg-theme-primary-300"}`}>
                                                        <span className="break-all">
                                                            {message.message}
                                                        </span>
                                                        <div className="flex gap-1 items-end">
                                                            <span className="text-white text-[11px] pt-1 min-w-fit">
                                                                {
                                                                    calculateTime(message.created_at)
                                                                }
                                                            </span>
                                                            <span>
                                                                {
                                                                    message.sender.id === session?.user.id && <MessageStatus status={message.status} />
                                                                }
                                                            </span>
                                                        </div>
                                                </div>
                                            )}
                                            {message.type === "photo" && (
                                                <div
                                                className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 relative 
                                                ${message.sender.id == session?.user.id ? "bg-theme-primary-400" : "bg-theme-primary-300"}`}>
                                                    <Image 
                                                        src={`${HOST}/${message.message}`}
                                                        className="rounded-lg"
                                                        alt="asset"
                                                        height={150}
                                                        width={150}
                                                        />
                                                    <div className="absolute bottom-1 right-3 flex items-end gap-1">
                                                        <span className="text-white text-[11px] pt-1 min-w-fit">
                                                            {
                                                                calculateTime(message.created_at)
                                                            }
                                                        </span>
                                                        <span>
                                                            {
                                                                message.sender.id === session?.user.id && <MessageStatus status={message.status} />
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            {message.type === "video" && (
                                                <div
                                                className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 relative 
                                                ${message.sender.id == session?.user.id ? "bg-theme-primary-400" : "bg-theme-primary-300"}`}>
                                                        <video 
                                                            className="w-72 rounded-lg"
                                                            controls 
                                                            preload="none"
                                                        >
                                                        <source src={`${HOST}/${message.message}`} type="video/mp4" />
                                                        <track
                                                            src={`${HOST}/${message.message}`}
                                                            kind="subtitles"
                                                            srcLang="en"
                                                            label="English"
                                                        />
                                                        Your browser does not support the video tag.
                                                        </video>
                                                    {/* <Image 
                                                        src={`${HOST}/${message.message}`}
                                                        className="rounded-lg"
                                                        alt="asset"
                                                        height={150}
                                                        width={150}
                                                        /> */}
                                                    <div className="absolute bottom-1 right-3 flex items-end gap-1">
                                                        <span className="text-white text-[11px] pt-1 min-w-fit">
                                                            {
                                                                calculateTime(message.created_at)
                                                            }
                                                        </span>
                                                        <span>
                                                            {
                                                                message.sender.id === session?.user.id && <MessageStatus status={message.status} />
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            {message.type === "audio" && (
                                                <VoiceMessage session={session} message={message} />
                                                )}
                                        </div>
                                    ))}
                                    {/* Dummy Div to scroll to bottom */}
                                    <div ref={ref}></div>
                                </div>
                            </div>
                        </div>
                        {
                            messagesSearch && <SearchMessages chatWith={chatWith} />
                        }
                    </div>
                </div>
                {!showAudioRecorder && (
                    <div className="h-20 px-4 flex items-center gap-6 relative">
                        <div className="w-full flex items-center gap-6">
                            <BsEmojiSmile className="cursor-pointer text-xl" title="Emoji" id="emoji-open" onClick={handleEmojiModal} />
                            {showEmojiPicker && (
                                <div className="absolute bottom-16 left-4 z-40" ref={emojiPickerRef}>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme["DARK"]} />
                                </div>
                            )}
                            <ImAttachment className="cursor-pointer text-xl" title="Attach File" onClick={ () =>setGrabPhoto(true)} />
                            <div className="w-full rounded-lg h-110 flex items-center">
                                <input
                                    className="text-sm focus:outline-none bg-theme-primary-400 text-white h-10 rounded-lg px-5 py-4 w-full "
                                    placeholder="Type your message here..."
                                    id={"send-message"}
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    />
                            </div>
                            <div className="flex w-10 items-center justify-center">
                                <button>
                                    {message ? (<MdSend className="cursor-pointer text-xl" title="Send message" onClick={sendMessage} />) : (<FaMicrophone className="cursor-pointer text-xl" title="Record" onClick={()=> setShowAudioRecorder(true)} />)}   
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showAudioRecorder && <CaptureAudio hide={setShowAudioRecorder} />}
            </div>
            {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
        </div>
    );
}


export default ChatContainer;