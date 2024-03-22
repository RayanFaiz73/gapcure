
'use client';
import { Room } from 'next-auth';
import { useState, useEffect } from 'react';
import { FaTrashCan, FaMicrophone, FaCamera, FaVideo } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { useStateProvider } from '../contexts/StateContext';
import MessageStatus from './MessageStatus';
import { Comment } from 'react-loader-spinner';
import { reducerCases } from '../contexts/constants';
import ModalConfirmation from './ModalConfirmation';
import { axiosAuth } from '@/lib/axiosInstance';
import { DELETE_ROOM } from '@/utils/ApiRoutes';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Rooms = ({ isFiltered, isLoading, changeRoom }: { isFiltered: boolean; isLoading: boolean; changeRoom: any; }) => {
    const { data: session } = useSession();
    const [{rooms, roomsSearch, onlineUsers, currentRoomId}, dispatch] = useStateProvider();
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    const changeCurrentChat = (index:any, room:Room) => {
      dispatch({
          type:reducerCases.SET_CURRENT_ROOM_ID,
          currentRoomId:room.id
      })
      changeRoom(room);
    };
    const deleteConfirm = (id:number) => {
        setShowModal(true)
        setDeleteId(id);
    };
    const getConfirmationDelete = async (confirm :boolean) => {
        if(confirm){
            try {
                const res = await axiosAuth.delete(DELETE_ROOM(deleteId));
                if(res.status === 200){
                    dispatch({
                        type:reducerCases.SET_ROOMS,
                        rooms:rooms.filter((room : Room) => {
                            if(room.id !== deleteId){
                                return room;
                            }
                        })
                    })
                    dispatch({
                        type:reducerCases.SET_ROOM_SEARCH,
                        roomsSearch:roomsSearch.filter((room : Room) => {
                            if(room.id !== deleteId){
                                return room;
                            }
                        })
                    })
                    if(currentRoomId == deleteId){
                        dispatch({type:reducerCases.SET_CURRENT_ROOM,currentRoom:undefined})
                        dispatch({type:reducerCases.SET_CURRENT_ROOM_ID,currentRoomId:undefined})
                    }
                }
                toast.success(res?.data?.message);
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
        setDeleteId(null);
        setShowModal(false);
    };

    const searchUserIsOnline = (arr: { userId : any } | any[], val: any) => {
        if(arr instanceof Array){
            for(var i=0; i<arr.length; i++){
            if(searchUserIsOnline(arr[i],val)){
              return true;
            }
          }
          return false;
        }else{
          return arr.userId == val;
        //   return arr == val;
        }
    }
    return (
        <>
            <div className="px-6 pb-3 text-white text-2xl font-medium">
                People
            </div>
            <ul className="w-full h-[52vh] overflow-x-hidden overflow-y-auto bg-theme-primary-600">
                {isLoading && (<span className="text-theme-secondary-700 w-full flex justify-center mt-[100px]">
                    <Comment
                        visible={isLoading}
                        height="80"
                        width="80"
                        ariaLabel="contacts-loading"
                        color="#fff"
                        backgroundColor="#272250"
                    />
                </span>)}
                {rooms && !isLoading && !isFiltered && !rooms?.length && (<span className="text-theme-secondary-700 w-full flex justify-center mt-[100px]"> Select a contact to start chat... </span>)}
                {rooms && isFiltered && !rooms?.length && (<span className="text-theme-secondary-700 w-full flex justify-center mt-[100px]"> No messages found </span>)}
                {roomsSearch && isFiltered && roomsSearch.map((room: Room, index: any) => (

                    <li className={`${room.id === currentRoomId ? "bg-theme-primary-300 text-gray-300 " : "bg-black text-white "} px-6 border-b last:border-b-0`} 
                    key={index} onClick={() => changeCurrentChat(index, room)}>
                        <div className="flex items-center space-x-4 py-3 sm:pb-4 border-gray-500">

                            <div className="relative">
                                <img className={`w-10 h-10 rounded-full border-2 ${ searchUserIsOnline(onlineUsers,(room.sender.id == session?.user.id ? room.receiver.id : room.sender.id )) ? "border-green-400" : ""}`} src={`https://flowbite.com/docs/images/people/profile-picture-${index+1}.jpg`} alt={`${room.sender.firstName} ${room.sender.lastName}`} />
                                { room.unreadMessages !== 0 && (<span className="bottom-0 left-7 absolute flex justify-center items-center w-5 h-5 bg-red-500 text-white rounded-full"> {room.unreadMessages} </span>)}
                            </div>
                            <div className="flex-1 min-w-0">
                                {room.sender.id == session?.user.id ? (
                                    <p className="text-sm font-medium truncate">
                                        {room.receiver.firstName} {room.receiver.lastName}
                                    </p>
                                ):(
                                    <p className="text-sm font-medium truncate">
                                        {room.sender.firstName} {room.sender.lastName}
                                    </p>
                                )}
                                <span className="flex items-center gap-1">
                                    {room.lastMessage === undefined && (
                                        <span className="flex gap-1 items-center">
                                            {room.sender.id == session?.user.id ? (
                                                <p className="text-sm font-light text-theme-danger-500 truncate">
                                                    {room.receiver.role.name}
                                                </p>
                                            ):(
                                                <p className="text-sm font-light text-theme-danger-500 truncate">
                                                    {room.sender.role.name}
                                                </p>
                                            )}
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.sender.id == session?.user.id && (
                                        <MessageStatus status={room.lastMessage.status} />
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "text" && (<span className="truncate">{room.lastMessage.message}</span>)}
                                    {room.lastMessage && room.lastMessage.type === "audio" && (
                                        <span className="flex gap-1 items-center">
                                            <FaMicrophone />
                                            Audio
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "photo" && (
                                        <span className="flex gap-1 items-center">
                                            <FaCamera />
                                            Image
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "video" && (
                                        <span className="flex gap-1 items-center">
                                            <FaVideo />
                                            Video
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold ">

                                {/* { room.unreadMessages !== 0 && (<div style={{ minWidth: '1.25rem' }} className="bg-red-500 p-0.5 rounded-full text-white text-xs font-thin text-center me-3">{room.unreadMessages}</div>)} */}

                                <button onClick={() => {setDeleteId(room.id);deleteConfirm(room.id);}}
                                    type="button"
                                    className="text-red-500">
                                    <FaTrashCan className="text-base" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}                
                {rooms && !isLoading && !isFiltered && rooms.map((room: Room, index: any) => (

                    <li className={`${room.id === currentRoomId ? "bg-theme-primary-300 text-gray-300 border-theme-primary-50 border-2" : "bg-black text-white last:border-b-0"} px-6 `} 
                    key={index} onClick={() => changeCurrentChat(index, room)}>
                        <div className="flex items-center space-x-4 py-3 sm:pb-4 border-gray-500">

                            <div className="relative">
                                <img className={`w-10 h-10 rounded-full border-2 ${ searchUserIsOnline(onlineUsers,(room.sender.id == session?.user.id ? room.receiver.id : room.sender.id )) ? "border-green-400" : ""}`} src={`https://flowbite.com/docs/images/people/profile-picture-${index+1}.jpg`} alt={`${room.sender.firstName} ${room.sender.lastName}`} />
                                { room.unreadMessages !== 0 && (<span className="bottom-0 left-7 absolute flex justify-center items-center w-5 h-5 bg-red-500 text-white rounded-full"> {room.unreadMessages} </span>)}
                            </div>
                            <div className="flex-1 min-w-0">
                                {room.sender.id == session?.user.id ? (
                                    <p className="text-sm font-medium truncate">
                                        {room.receiver.firstName} {room.receiver.lastName}
                                    </p>
                                ):(
                                    <p className="text-sm font-medium truncate">
                                        {room.sender.firstName} {room.sender.lastName}
                                    </p>
                                )}
                                <span className="flex items-center gap-1">
                                    {room.lastMessage === undefined && (
                                        <span className="flex gap-1 items-center">
                                            {room.sender.id == session?.user.id ? (
                                                <p className="text-sm font-light text-theme-danger-500 truncate">
                                                    {room.receiver.role.name}
                                                </p>
                                            ):(
                                                <p className="text-sm font-light text-theme-danger-500 truncate">
                                                    {room.sender.role.name}
                                                </p>
                                            )}
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.sender.id == session?.user.id && (
                                        <MessageStatus status={room.lastMessage.status} />
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "text" && (<span className="truncate">{room.lastMessage.message}</span>)}
                                    {room.lastMessage && room.lastMessage.type === "audio" && (
                                        <span className="flex gap-1 items-center">
                                            <FaMicrophone />
                                            Audio
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "photo" && (
                                        <span className="flex gap-1 items-center">
                                            <FaCamera />
                                            Image
                                        </span>
                                    )}
                                    {room.lastMessage && room.lastMessage.type === "video" && (
                                        <span className="flex gap-1 items-center">
                                            <FaVideo />
                                            Video
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold ">

                                {/* { room.unreadMessages !== 0 && (<div style={{ minWidth: '1.25rem' }} className="bg-red-500 p-0.5 rounded-full text-white text-xs font-thin text-center me-3">{room.unreadMessages}</div>)} */}

                                <button onClick={() => {setDeleteId(room.id);deleteConfirm(room.id);}}
                                    type="button"
                                    className="text-red-500">
                                    <FaTrashCan className="text-base" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <ModalConfirmation  
                showModal={showModal} 
                hideModalCallback={setShowModal} 
                // confirmationCallback={setConfirmDelete} 
                confirmationCallback={(value) => getConfirmationDelete(value)} 
            />
        </>
    );
}


export default Rooms;