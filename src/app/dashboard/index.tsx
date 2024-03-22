'use client';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaFlag, FaUser } from 'react-icons/fa6';
import { IoFilterCircle } from "react-icons/io5";
// import { Datepicker } from "flowbite-react";
import Datepicker from "tailwind-datepicker-react"
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { Menu } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import MyCustomAccordion from '../components/MyCustomAccordion';
import ToDoTable from '../components/ToDoTable';
import MyPatients from '../components/MyPatients';
import Reminder from '../components/Reminder';
import Alert from '../components/Alert';
import Waitlist from '../components/Waitlist';
import axios, { AxiosError } from 'axios';
import CreateToDo from '../components/CreateToDo';


export default function Index() {
    const { data: session } = useSession();

    return (
        <>
            <div className="py-6 text-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full lg:w-4/12 mb-3">
                            <div className="mx-2 px-3 mb-6 lg:mb-3 bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800 p-4 lg:p-6 mb-4">
                                <p className="text-xl">
                                    Greetings !
                                </p>
                                <div className="text-xl font-bold mb-2">
                                    {session?.user?.name}
                                </div>
                                <p className="text-sm">
                                    Welcome back to <span className="text-red-600"> GapCure </span>
                                </p>
                            </div>
                            <div className="mx-2 mb-6 lg:mb-3 mb-4">
                                <MyCustomAccordion title="ALERTS" children={<Alert />} />
                            </div>
                            <div className="mx-2 mb-6 lg:mb-3 mb-4">
                                <MyCustomAccordion title="MY PATIENTS" children={<MyPatients />} />
                            </div>
                            <div className="mx-2 mb-6 lg:mb-3 mb-4">
                                <MyCustomAccordion title="REMINDER" children={<Reminder />} />
                            </div>
                            <div className="mx-2 mb-6 lg:mb-3 mb-4">
                                <MyCustomAccordion title="WAITLIST" children={<Waitlist />} />
                            </div>

                        </div>
                        <div className="w-full lg:w-8/12 mb-3">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800 mb-4">

                                {/* <div className="w-full mb-4 border-b border-gray-200 "> */}
                                <div className="w-full mb-4 ">
                                    <CreateToDo />
                                </div>
                                {/* <div className="flex justify-end pb-4 ">
                                    <button className="mx-10 my-4 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Add </button>
                                </div> */}
                            </div>
                            <MyCustomAccordion title="TODAY TO-DO LIST" children={<ToDoTable />} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}