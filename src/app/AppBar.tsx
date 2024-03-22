"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { initFlowbite, TabItem, Tabs, TabsInterface, TabsOptions } from 'flowbite';
import { Menu, Disclosure, Popover, Transition } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { FaUser, FaLock, FaClipboardUser, FaBell, FaCirclePlus, FaFileLines, FaCalendarDays } from "react-icons/fa6";
import { BiSolidAlarmAdd } from "react-icons/bi";
import toast from 'react-hot-toast';
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { HOST, MY_ROOMS } from "@/utils/ApiRoutes";
import { io } from "socket.io-client";
import { reducerCases } from "./contexts/constants";
import { useStateProvider } from "./contexts/StateContext";
import { Room } from "next-auth";
import { axiosAuth } from "@/lib/axiosInstance";
import { FaSignOutAlt } from "react-icons/fa";
import { NavMobile } from "./components/NavMobile";



const AppBar = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [customOpen, setCustomOpen] = useState(false);
    const [socketEvent, setSocketEvent] = useState(false);
    const socket = useRef<any>();
    const [{currentRoom, rooms, onlineUsers, totalUnreadMessages}, dispatch] = useStateProvider();
    const [newUserOnline, setNewUserOnline] = useState<number | null>(null)
    useEffect(() => {
        initFlowbite();
    }, [])

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
  };
  useEffect(() => {
    if(session?.user){
        getMyRooms();
    }
  }, [session]);
    useEffect(() => {
        if(session && socket.current){
            let data = {
                userId : session.user.id,
                currentRoom : currentRoom?.id
            }
            socket.current.emit("add-user",data)
            dispatch({type: reducerCases.SET_SOCKET, socket})
            if(currentRoom){
                dispatch({
                    type:reducerCases.SET_TOTAL_UNREAD_MESSAGES,
                    totalUnreadMessages:totalUnreadMessages - currentRoom.unreadMessages
                })
                currentRoom.unreadMessages = 0;
            }
        }
    }, [currentRoom])
    
    useEffect(() => {
        if(session){
            socket.current = io(HOST ? HOST : "http://localhost:8888");
            // socket.current.emit("add-user",session.user.id)
            let data = {
                userId : session.user.id,
                currentRoom : currentRoom?.id
            }
            socket.current.emit("add-user",data)
            dispatch({type: reducerCases.SET_SOCKET, socket})
        }
    }, [session]);
    useEffect(() => {
        if(socket.current && !socketEvent){
            socket.current.on("msg-receive",(data:any) => {
            dispatch({
                type:reducerCases.SET_ROOMS,
                rooms:data.receiverRooms
            })
            dispatch({
                type:reducerCases.SET_TOTAL_UNREAD_MESSAGES,
                totalUnreadMessages:data.unreadReceiverMessages
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
    }, [socket.current]);
    useEffect(() => {
        if(socket.current && currentRoom){
            socket.current.on("msg-receive",(data:any) => {
                if(currentRoom && data.room_id == currentRoom?.id){
                    dispatch({
                        type:reducerCases.ADD_MESSAGE,
                        newMessage:{
                            ...data.message,
                        }
                    })
                }
                dispatch({
                    type:reducerCases.SET_ROOMS,
                    rooms:data.receiverRooms
                })
                dispatch({
                    type:reducerCases.SET_TOTAL_UNREAD_MESSAGES,
                    totalUnreadMessages:data.unreadReceiverMessages
                })
            })
        }
    }, [socket.current, currentRoom])
    useEffect(() => {
        if(rooms){
            rooms.forEach((room : Room) => {
                if(room.receiver.id == newUserOnline || room.sender.id == newUserOnline){
                    if(room.lastMessage && room.lastMessage.receiver.id == newUserOnline){
                        room.lastMessage.status = (room.lastMessage.status !== "read") ? "delivered":"read";
                    }
                }
            });
            dispatch({
                type:reducerCases.SET_ROOMS,
                rooms:rooms
            })
        }
    }, [onlineUsers]);
    
    const notificationClick = (check: boolean) => {
        if (!check) {
            setTimeout(() => {
                let tabsElement: HTMLElement = document.getElementById('tabs-example') as HTMLElement;

                // create an array of objects with the id, trigger element (eg. button), and the content element
                let tabElements: TabItem[] = [
                    {
                        id: 'login',
                        triggerEl: document.querySelector('#login-tab-example') as HTMLElement,
                        targetEl: document.querySelector('#login-example') as HTMLElement
                    },
                    {
                        id: 'registration',
                        triggerEl: document.querySelector('#registration-tab-example') as HTMLElement,
                        targetEl: document.querySelector('#registration-example') as HTMLElement
                    }
                ];

                // options with default values
                let options: TabsOptions = {
                    defaultTabId: 'login',
                    activeClasses: 'text-white bg-theme-success-600',
                    inactiveClasses: 'hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white',
                    // onShow: () => {
                    //     console.log('tab is shown');
                    // }
                };
                /*
                * tabElements: array of tab objects
                * options: optional
                */
                let tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);
            }, 100);
        }
        // setCustomOpen(prev => {
        //     console.log(!prev);
        //     if(!prev){
        //         setTimeout(() => {
        //             let tabsElement: HTMLElement = document.getElementById('tabs-example') as HTMLElement;

        //             // create an array of objects with the id, trigger element (eg. button), and the content element
        //             let tabElements: TabItem[] = [
        //                 {
        //                     id: 'login',
        //                     triggerEl: document.querySelector('#login-tab-example') as HTMLElement,
        //                     targetEl: document.querySelector('#login-example') as HTMLElement
        //                 },
        //                 {
        //                     id: 'registration',
        //                     triggerEl: document.querySelector('#registration-tab-example') as HTMLElement,
        //                     targetEl: document.querySelector('#registration-example') as HTMLElement
        //                 }
        //             ];

        //             // options with default values
        //             let options: TabsOptions = {
        //                 defaultTabId: 'login',
        //                 activeClasses: 'text-white bg-theme-success-600',
        //                 inactiveClasses: 'hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white',
        //                 // onShow: () => {
        //                 //     console.log('tab is shown');
        //                 // }
        //             };
        //             /*
        //             * tabElements: array of tab objects
        //             * options: optional
        //             */
        //             let tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);
        //         }, 100);

        //     }
        //     return !prev
        // });
        // console.log(customOpen);
    }

    // useEffect(() => {
    //     console.log(customOpen)
    //     if(customOpen){
    //         setTimeout(() => {
    //             const tabsElement: HTMLElement = document.getElementById('tabs-example') as HTMLElement;

    //             // create an array of objects with the id, trigger element (eg. button), and the content element
    //             const tabElements: TabItem[] = [
    //                 {
    //                     id: 'login',
    //                     triggerEl: document.querySelector('#login-tab-example') as HTMLElement,
    //                     targetEl: document.querySelector('#login-example') as HTMLElement
    //                 },
    //                 {
    //                     id: 'registration',
    //                     triggerEl: document.querySelector('#registration-tab-example') as HTMLElement,
    //                     targetEl: document.querySelector('#registration-example') as HTMLElement
    //                 }
    //             ];

    //             // options with default values
    //             const options: TabsOptions = {
    //                 defaultTabId: 'login',
    //                 activeClasses: 'text-white bg-theme-success-600',
    //                 inactiveClasses: 'hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white',
    //                 // onShow: () => {
    //                 //     console.log('tab is shown');
    //                 // }
    //             };

    //             /*
    //             * tabElements: array of tab objects
    //             * options: optional
    //             */
    //             const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);

    //             // open tab item based on id
    //             // tabs.show('registration');
    //         }, 100);
    //     }

    // }, [customOpen]);


    return (
        <>
        
        {/* <NavMobile /> */}
            <div className="flex ">
                <aside className="w-80 min-h-screen hidden lg:block sm:min-h-full bg-theme-primary-500 dark:bg-gray-800 shadow-lg" aria-label="Sidebar">
                    <div className="sticky top-0 z-10 px-3 min-h-screen overflow-y-auto">
                        <div
                            className="flex items-center justify-center mb-4 h-16">
                            <Link href="/">
                                {/* <x-application-logo
                                    className="block w-72 h-14 fill-current text-gray-800 dark:text-gray-200 logo dark:logo" /> */}

                                <div className="flex items-center justify-start">
                                    {/* <Link href="https://flowbite.com" className="flex ml-2 md:mr-24"> */}
                                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-14 mr-3" alt="FlowBite Logo" />
                                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                                    {/* </Link> */}
                                </div>
                            </Link>
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/profile" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/profile" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <FaUser />
                                    <span className="ml-3">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/dashboard" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <MdDashboard />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reminder" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/reminder" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <FaBell />
                                    <span className="ml-3">Reminder</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/alert" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/alert" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <BiSolidAlarmAdd />
                                    <span className="ml-3">Alert</span>
                                </Link>
                            </li>
                            <li>
                                <button type="button" className={"flex items-center w-full p-2 text-base text-gray-500 transition duration-75 rounded-lg group dark:text-white hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"}
                                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" aria-expanded={(pathname == "/patient" || pathname == "/patient/create" || pathname == "/patient/active" ? "true" : "false")}>
                                    <FaCirclePlus />
                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">Patient</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={"py-2 space-y-2 " + (pathname == "/patient" || pathname == "/patient/create" || pathname == "/patient/active" ? "" : "hidden")}>
                                    <li>
                                        <Link href="/patient/create" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient/create" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                            Add Patient
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/patient" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                            Patient List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/patient/active" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient/active" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                            Active Patients
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/todo" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/todo" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <FaFileLines />
                                    <span className="ml-3">To do / Wait List</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/mycalendar" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/mycalendar" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <FaCalendarDays />
                                    <span className="ml-3">My Calendar</span>
                                </Link>
                            </li>


                            <li>
                                <Link href="/roles" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/roles" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                    <FaClipboardUser />
                                    <span className="ml-3">Roles</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => { signOut(); }} type="button" className={"w-full flex items-center p-2 rounded-lg dark:text-white group bg-theme-danger-600 text-white"}>
                                    <FaSignOutAlt />
                                    <span className="ml-3">Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="block w-full">
                    <div className="sticky top-0 z-10">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3 bg-theme-primary-500 border-b border-theme-primary-300 dark:bg-gray-800 dark:border-gray-700">
                        <NavMobile />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start w-full ms-10">
                                    <form className="w-full">
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-theme-primary-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div className="mx-3">
                                            <Popover>
                                                {({ open, close }) => (
                                                    <>

                                                        <Popover.Button className="block"
                                                            onClick={() => notificationClick(open)}
                                                        >

                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="35" viewBox="0 0 29 35" fill="none">
                                                                <path d="M14.5 34.4584C15.3177 34.4584 16.102 34.1335 16.6802 33.5553C17.2585 32.977 17.5833 32.1928 17.5833 31.375H11.4166C11.4166 32.1928 11.7415 32.977 12.3197 33.5553C12.898 34.1335 13.6822 34.4584 14.5 34.4584ZM2.16664 28.2917H26.8333C27.1382 28.2916 27.4362 28.2012 27.6896 28.0318C27.9431 27.8624 28.1407 27.6216 28.2573 27.3399C28.374 27.0583 28.4045 26.7484 28.345 26.4493C28.2856 26.1503 28.1388 25.8757 27.9233 25.6601L25.2916 23.0284V14.4167C25.2867 11.8244 24.3495 9.32031 22.6513 7.3617C20.9531 5.40309 18.6071 4.12058 16.0416 3.74835V2.08335C16.0416 1.67448 15.8792 1.28235 15.5901 0.993231C15.301 0.704112 14.9089 0.541687 14.5 0.541687C14.0911 0.541687 13.699 0.704112 13.4099 0.993231C13.1207 1.28235 12.9583 1.67448 12.9583 2.08335V3.74835C10.3929 4.12058 8.04685 5.40309 6.34863 7.3617C4.65041 9.32031 3.71327 11.8244 3.70831 14.4167V23.0284L1.07668 25.6601C0.861145 25.8757 0.714369 26.1503 0.654911 26.4493C0.595452 26.7484 0.625982 27.0583 0.74264 27.3399C0.859298 27.6216 1.05685 27.8624 1.31031 28.0318C1.56378 28.2012 1.86178 28.2916 2.16664 28.2917ZM6.33993 24.7566C6.62907 24.4676 6.79156 24.0755 6.79164 23.6667V14.4167C6.79164 12.3723 7.60377 10.4117 9.04936 8.96607C10.495 7.52048 12.4556 6.70835 14.5 6.70835C16.5444 6.70835 18.505 7.52048 19.9506 8.96607C21.3962 10.4117 22.2083 12.3723 22.2083 14.4167V23.6667C22.2084 24.0755 22.3709 24.4676 22.66 24.7566L23.1117 25.2084H5.88823L6.33993 24.7566Z" fill="white" />
                                                            </svg>
                                                            <div style={{ minWidth: '1.25rem' }} className="bg-red-500 p-0.5 top-3 right-20 rounded-full absolute text-white text-xs text-center">1</div>
                                                        </Popover.Button>
                                                        {open && (
                                                            <div>
                                                                <Popover.Panel className="w-56 absolute right-0 bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                                                    {/* <Popover.Item> */}




                                                                    <div className="w-auto mx-auto px-2 py-1 my-2 bg-theme-primary-500 dark:border-gray-700 rounded-full">
                                                                        <ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-300 " id="tabs-example" role="tablist">
                                                                            <li className="bg-theme-primary-400 mx-2 p-1 rounded-full" role="presentation">
                                                                                <button className="inline-block px-2 py-1 w-20 text-xs rounded-full text-white bg-theme-success-600 active" id="login-tab-example" type="button" role="tab" aria-controls="login-example" aria-selected="false">
                                                                                    Reminder
                                                                                </button>
                                                                                <button className="inline-block px-2 py-1 w-20 text-xs rounded-full" id="registration-tab-example" type="button" role="tab" aria-controls="registration-example" aria-selected="false">
                                                                                    Alert
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div id="tabContentExample" className="overflow-x-auto">
                                                                        <div className="hidden px-2 max-h-40" id="login-example" role="tabpanel" aria-labelledby="login-tab-example">
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Reminder</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Reminder (15 mins left)</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Medication Reminder</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Reminder (15 mins left)</p>
                                                                            <p className="text-xs text-gray-100 rounded-full px-3 pb-2 text-center" style={{ fontSize: '0.65rem' }}>View all</p>

                                                                        </div>
                                                                        <div className="hidden px-2 max-h-40" id="registration-example" role="tabpanel" aria-labelledby="registration-tab-example">
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Alert</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Alert (15 mins left)</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Medication Alert</p>
                                                                            <p className="text-xs text-gray-100 hover:bg-gray-600 rounded-full px-3 py-2">Exercise Alert (15 mins left)</p>
                                                                            <p className="text-xs text-gray-100 rounded-full px-3 pb-2 text-center" style={{ fontSize: '0.65rem' }}>View all</p>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </div>
                                                        )}

                                                    </>
                                                )}
                                            </Popover>
                                        </div>
                                        <div className="mx-3">
                                            <Link href="/chat" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                                    <path d="M10.3321 15.3333C10.0025 15.3333 9.68026 15.4311 9.40618 15.6142C9.1321 15.7973 8.91848 16.0576 8.79233 16.3622C8.66619 16.6667 8.63318 17.0018 8.69749 17.3251C8.7618 17.6484 8.92054 17.9454 9.15362 18.1785C9.38671 18.4116 9.68368 18.5703 10.007 18.6346C10.3303 18.6989 10.6654 18.6659 10.9699 18.5398C11.2745 18.4136 11.5348 18.2 11.7179 17.9259C11.9011 17.6518 11.9988 17.3296 11.9988 17C11.9988 16.558 11.8232 16.134 11.5106 15.8215C11.1981 15.5089 10.7742 15.3333 10.3321 15.3333ZM16.9988 15.3333C16.6692 15.3333 16.3469 15.4311 16.0728 15.6142C15.7988 15.7973 15.5851 16.0576 15.459 16.3622C15.3329 16.6667 15.2998 17.0018 15.3642 17.3251C15.4285 17.6484 15.5872 17.9454 15.8203 18.1785C16.0534 18.4116 16.3503 18.5703 16.6737 18.6346C16.997 18.6989 17.3321 18.6659 17.6366 18.5398C17.9412 18.4136 18.2014 18.2 18.3846 17.9259C18.5677 17.6518 18.6655 17.3296 18.6655 17C18.6655 16.558 18.4899 16.134 18.1773 15.8215C17.8647 15.5089 17.4408 15.3333 16.9988 15.3333ZM23.6655 15.3333C23.3358 15.3333 23.0136 15.4311 22.7395 15.6142C22.4654 15.7973 22.2518 16.0576 22.1257 16.3622C21.9995 16.6667 21.9665 17.0018 22.0308 17.3251C22.0951 17.6484 22.2539 17.9454 22.487 18.1785C22.72 18.4116 23.017 18.5703 23.3403 18.6346C23.6636 18.6989 23.9987 18.6659 24.3033 18.5398C24.6078 18.4136 24.8681 18.2 25.0513 17.9259C25.2344 17.6518 25.3321 17.3296 25.3321 17C25.3321 16.558 25.1565 16.134 24.844 15.8215C24.5314 15.5089 24.1075 15.3333 23.6655 15.3333ZM16.9988 0.333313C14.8101 0.333313 12.6428 0.764409 10.6207 1.60199C8.59865 2.43957 6.76133 3.66722 5.21369 5.21487C2.08808 8.34047 0.332134 12.5797 0.332134 17C0.317563 20.8485 1.65012 24.5809 4.0988 27.55L0.765467 30.8833C0.534204 31.1177 0.377544 31.4153 0.315254 31.7386C0.252963 32.0619 0.287834 32.3965 0.415467 32.7C0.553897 32.9999 0.778307 33.2519 1.06021 33.424C1.34212 33.5961 1.6688 33.6805 1.9988 33.6666H16.9988C21.4191 33.6666 25.6583 31.9107 28.7839 28.7851C31.9095 25.6595 33.6655 21.4203 33.6655 17C33.6655 12.5797 31.9095 8.34047 28.7839 5.21487C25.6583 2.08926 21.4191 0.333313 16.9988 0.333313ZM16.9988 30.3333H6.01547L7.56547 28.7833C7.72295 28.629 7.84823 28.4449 7.93406 28.2418C8.01989 28.0386 8.06455 27.8205 8.06547 27.6C8.0592 27.1604 7.87949 26.741 7.56547 26.4333C5.38311 24.2534 4.02409 21.3842 3.71995 18.3146C3.41581 15.2451 4.18537 12.165 5.89751 9.59918C7.60965 7.03338 10.1585 5.14058 13.1097 4.24327C16.0609 3.34596 19.2319 3.49965 22.0825 4.67817C24.9331 5.85668 27.2869 7.9871 28.7429 10.7065C30.1988 13.4258 30.6669 16.5659 30.0673 19.5917C29.4678 22.6174 27.8376 25.3417 25.4547 27.3004C23.0717 29.259 20.0834 30.3309 16.9988 30.3333Z" fill="white" />
                                                </svg>
                                                { totalUnreadMessages != 'NaN' && totalUnreadMessages != 0  && (
                                                    <div style={{ minWidth: '1.25rem' }} className="bg-red-500 p-0.5 top-3 right-6 rounded-full absolute text-white text-xs text-center">{totalUnreadMessages}</div>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default AppBar;