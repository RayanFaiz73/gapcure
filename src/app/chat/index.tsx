'use client';
import { FaPaperPlane, FaPen, FaPlane, FaPlus, FaTrash, FaTrashCan } from 'react-icons/fa6';

import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import { Session, User } from 'next-auth/core/types';
import { axiosAuth } from '@/lib/axiosInstance';
import { Room } from 'next-auth';
import ChatContainer from '../components/ChatContainer';
import Rooms from '../components/Rooms';
import Welcome from '../components/Welcome';
import { ALL_USERS, CREATE_ROOM, MY_ROOMS } from '@/utils/ApiRoutes';
import { reducerCases } from '../contexts/constants';
import { useStateProvider } from '../contexts/StateContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


export default function Index() {

    const { data: session } = useSession();
    const [modalElement, setModalElement]: any = useState();
    // const socket = useRef<any>();
    const [contacts, setContacts] = useState([]);
    // const [rooms, setRooms] = useState([]);
    // const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState<any>();
    const [{rooms, socket, currentRoom, totalUnreadMessages}, dispatch] = useStateProvider();
    const [searchTerm, setSearchTerm] = useState<string>("")
    // const [searchedRooms, setSearchedRooms] = useState<Room[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isNewChat, setIsNewChat] = useState<boolean>(false)
    const [newChat, setNewChat] = useState<Room | null>(null);
    const [newChatUser, setNewChatUser] = useState<number | null>(null)
    useEffect(() => {
      if(searchTerm){
        dispatch({
            type:reducerCases.SET_ROOM_SEARCH,
            roomsSearch:rooms.filter((room : Room) => {
                if(room.sender.id == session?.user.id){
                    return room.receiver.firstName.toLowerCase().includes(searchTerm) || room.receiver.lastName.toLowerCase().includes(searchTerm)
                }
                else {
                    return room.sender.firstName.toLowerCase().includes(searchTerm) || room.sender.lastName.toLowerCase().includes(searchTerm)
                }
            })
        })
      } else {
        dispatch({
            type:reducerCases.SET_ROOM_SEARCH,
            roomsSearch:[]
        })
      }
    }, [searchTerm])
    
  useEffect(() => {
    if(session?.user){
        setCurrentUser(session.user);
    }
  }, [session]);
  const getAllUsers = async () => {
    const res = await axiosAuth.get(ALL_USERS, {
		withCredentials: true,
		headers: {
		  'SameSite': 'None'
		}
    });
    setContacts(res.data.data);
  };

  const getMyRooms = async () => {
    const res = await axiosAuth.get(MY_ROOMS);
    dispatch({
        type:reducerCases.SET_ROOMS,
        rooms:res.data.rooms
    })
    dispatch({
        type:reducerCases.SET_TOTAL_UNREAD_MESSAGES,
        totalUnreadMessages:res.data.totalUnreadMessages
    })
    setIsLoading(false);
  };
  useEffect(() => {
    if (currentUser) {
        getAllUsers();
        getMyRooms();
    //   if (currentUser.isAvatarImageSet) {
    //     const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    //     setContacts(data.data);
    //   } else {
    //     navigate("/setAvatar");
    //   }
    }
  }, [currentUser]);
  const handleChatChange = (chat : any) => {
    dispatch({
        type:reducerCases.SET_CURRENT_ROOM,
        currentRoom:chat
    })
    dispatch({
        type:reducerCases.SET_CURRENT_ROOM_ID,
        currentRoomId:chat.id
    })
    socket.current.emit("user-read-chat",{
        room_id:chat.id,
        readBy: session?.user.id,
    })
    // setCurrentChat(chat);
  };

    useEffect(() => {


        const $modalElement: any = document.querySelector('#modalEl');

        const modalOptions: ModalOptions = {
            placement: 'bottom-right',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: false,
            onHide: () => {
                // console.log('modal is hidden');
            },
            onShow: () => {
                // console.log('modal is shown');
            },
            onToggle: () => {
                // console.log('modal has been toggled');
            },
        };


        const modal: ModalInterface = new Modal($modalElement, modalOptions);
        setModalElement(modal)
    }, []);

    const showModal = () => {
        modalElement.show()
    }
    const hideModal = () => {
        modalElement.hide()
    }

    const createRoom = async (id : number) => {
        try {
            let postData = {
                id:id,
            }
            const { data } = await axiosAuth.post(CREATE_ROOM, postData);
            setIsNewChat(true);
            setNewChat(data.room);
            dispatch({
                type:reducerCases.ADD_ROOM,
                newRoom:{
                    ...data.room,
                }
            })
            await getMyRooms();
            handleChatChange(data.room);
            modalElement.hide();
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

    // useEffect(() => {
    //     console.log("rooms useEffect",rooms)
    //     if(rooms && isNewChat){
    //         console.log("inside rooms useEffect",rooms)
    //         handleChatChange(newChat);
    //         setNewChat(null);
    //         setIsNewChat(false);
    //     }
    // },[rooms,isNewChat]);


    return (
        <>
            <div className="py-6 text-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full lg:w-4/12 mb-3">
                            <div className="mx-2 bg-theme-primary-500 rounded-xl shadow-lg dark:bg-gray-800 overflow-hidden h-full">
                                <div className="lg:p-6">
                                    <div className="sticky top-0">
                                        <div className="bg-theme-primary-500 dark:bg-gray-800 dark:border-gray-700 px-2">
                                            <div className="flex items-center my-2">
                                                <div className="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                                        <path d="M10.3321 15.3333C10.0025 15.3333 9.68026 15.4311 9.40618 15.6142C9.1321 15.7973 8.91848 16.0576 8.79233 16.3622C8.66619 16.6667 8.63318 17.0018 8.69749 17.3251C8.7618 17.6484 8.92054 17.9454 9.15362 18.1785C9.38671 18.4116 9.68368 18.5703 10.007 18.6346C10.3303 18.6989 10.6654 18.6659 10.9699 18.5398C11.2745 18.4136 11.5348 18.2 11.7179 17.9259C11.9011 17.6518 11.9988 17.3296 11.9988 17C11.9988 16.558 11.8232 16.134 11.5106 15.8215C11.1981 15.5089 10.7742 15.3333 10.3321 15.3333ZM16.9988 15.3333C16.6692 15.3333 16.3469 15.4311 16.0728 15.6142C15.7988 15.7973 15.5851 16.0576 15.459 16.3622C15.3329 16.6667 15.2998 17.0018 15.3642 17.3251C15.4285 17.6484 15.5872 17.9454 15.8203 18.1785C16.0534 18.4116 16.3503 18.5703 16.6737 18.6346C16.997 18.6989 17.3321 18.6659 17.6366 18.5398C17.9412 18.4136 18.2014 18.2 18.3846 17.9259C18.5677 17.6518 18.6655 17.3296 18.6655 17C18.6655 16.558 18.4899 16.134 18.1773 15.8215C17.8647 15.5089 17.4408 15.3333 16.9988 15.3333ZM23.6655 15.3333C23.3358 15.3333 23.0136 15.4311 22.7395 15.6142C22.4654 15.7973 22.2518 16.0576 22.1257 16.3622C21.9995 16.6667 21.9665 17.0018 22.0308 17.3251C22.0951 17.6484 22.2539 17.9454 22.487 18.1785C22.72 18.4116 23.017 18.5703 23.3403 18.6346C23.6636 18.6989 23.9987 18.6659 24.3033 18.5398C24.6078 18.4136 24.8681 18.2 25.0513 17.9259C25.2344 17.6518 25.3321 17.3296 25.3321 17C25.3321 16.558 25.1565 16.134 24.844 15.8215C24.5314 15.5089 24.1075 15.3333 23.6655 15.3333ZM16.9988 0.333313C14.8101 0.333313 12.6428 0.764409 10.6207 1.60199C8.59865 2.43957 6.76133 3.66722 5.21369 5.21487C2.08808 8.34047 0.332134 12.5797 0.332134 17C0.317563 20.8485 1.65012 24.5809 4.0988 27.55L0.765467 30.8833C0.534204 31.1177 0.377544 31.4153 0.315254 31.7386C0.252963 32.0619 0.287834 32.3965 0.415467 32.7C0.553897 32.9999 0.778307 33.2519 1.06021 33.424C1.34212 33.5961 1.6688 33.6805 1.9988 33.6666H16.9988C21.4191 33.6666 25.6583 31.9107 28.7839 28.7851C31.9095 25.6595 33.6655 21.4203 33.6655 17C33.6655 12.5797 31.9095 8.34047 28.7839 5.21487C25.6583 2.08926 21.4191 0.333313 16.9988 0.333313ZM16.9988 30.3333H6.01547L7.56547 28.7833C7.72295 28.629 7.84823 28.4449 7.93406 28.2418C8.01989 28.0386 8.06455 27.8205 8.06547 27.6C8.0592 27.1604 7.87949 26.741 7.56547 26.4333C5.38311 24.2534 4.02409 21.3842 3.71995 18.3146C3.41581 15.2451 4.18537 12.165 5.89751 9.59918C7.60965 7.03338 10.1585 5.14058 13.1097 4.24327C16.0609 3.34596 19.2319 3.49965 22.0825 4.67817C24.9331 5.85668 27.2869 7.9871 28.7429 10.7065C30.1988 13.4258 30.6669 16.5659 30.0673 19.5917C29.4678 22.6174 27.8376 25.3417 25.4547 27.3004C23.0717 29.259 20.0834 30.3309 16.9988 30.3333Z" fill="white" />
                                                    </svg>
                                                    { totalUnreadMessages != 'NaN' && totalUnreadMessages !== 0  && (
                                                        <div style={{ minWidth: '1.25rem' }} className="bg-red-500 p-0.5 -top-2 left-5 rounded-full absolute text-white text-xs text-center">{totalUnreadMessages}</div>
                                                    )}
                                                </div>
                                                    <span className="flex flex-1 justify-between items-center">
                                                        <div className="flex text-white text-base font-light ml-3">
                                                            Messages
                                                        </div>

                                                        <button onClick={showModal} 
                                                            type="button"
                                                            className="p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaPlus className="text-xl" />
                                                        </button>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start w-full my-2 px-2">
                                        <form className="w-full mt-4">
                                            <label htmlFor="messages-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search Messages</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input 
                                                    type="search" 
                                                    className="block w-full p-2 ps-10 text-sm border border-gray-300 rounded-full bg-theme-primary-500 focus:ring-blue-500 focus:border-blue-500 text-white" 
                                                    placeholder="Search Messages" 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <Rooms isFiltered={searchTerm ? true : false} isLoading={isLoading} changeRoom={handleChatChange} />
                                {/* <Rooms rooms={searchTerm ? searchedRooms : rooms} isFiltered={searchTerm ? true : false} isLoading={isLoading} changeRoom={handleChatChange} /> */}
                            </div>
                        </div>
                        {currentRoom === undefined ? (
                            <Welcome />
                        ) : (
                            // <ChatContainer currentChat={currentChat} />
                            <ChatContainer />
                        )}
                    </div>
                </div>
            </div>

            <div id="modalEl" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-theme-primary-500 text-gray-200 border rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold dark:text-white">
                                New Message
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={hideModal} >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="lg:p-4">
                            <div className="flex items-center justify-start w-full my-2">
                                <form className="w-full">
                                    <label htmlFor="messages-search2" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search Messages</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="messages-search2" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-theme-primary-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Messages" required />
                                    </div>
                                </form>
                            </div>
                        <ul className="max-w-md h-[52vh] overflow-x-hidden overflow-y-auto">
                            {contacts.map((contact:User, i) => (
                                <li className="text-gray-300 hover:bg-theme-primary-700 hover:text-white px-2 border-b last:border-b-0" key={i}>
                                <div className="flex items-center space-x-4 py-3 sm:pb-4 border-gray-500" onClick={() => createRoom(contact.id)}>
                                        <div className="flex-shrink-0">
                                            <img className="w-10 h-10 rounded-full border" src={`https://flowbite.com/docs/images/people/profile-picture-${i+1}.jpg`} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                            {contact.firstName} {contact.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate ">
                                            {contact.role.name}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
