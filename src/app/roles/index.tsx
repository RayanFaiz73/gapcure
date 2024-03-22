'use client';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaFlag } from 'react-icons/fa6';
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


export default function Index() {
    const { data: session } = useSession();
    const [users, setUsers] = useState();
    const axiosAuth = useAxiosAuth();

    const getAllUsers = async () => {
      const res = await axiosAuth.get("/auth/get/all");
      setUsers(res.data);
    };

	const [show, setShow] = useState<boolean>(false)
	const handleChange = (selectedDate: Date) => {
		console.log(selectedDate)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	const options: IOptions = {
		autoHide: true,
		todayBtn: true,
		clearBtn: true,
        minDate: new Date("2023-01-01"),
		theme: {
			background: "bg-theme-primary-400 dark:bg-gray-800",
			todayBtn: "bg-theme-primary-600 hover:bg-theme-primary-800",
			clearBtn: "",
			icons: "",
			text: "text-white hover:bg-theme-primary-600",
			disabledText: "",
			input: "bg-theme-primary-500 text-white placeholder:text-gray-300",
			inputIcon: "text-gray-300",
			selected: "bg-theme-primary-600",
		},
        datepickerClassNames: "top-12",
        defaultDate: null,
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Due Date",
        inputDateFormatProp: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
	}

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
                            
                            <div className="w-full mb-4 border-b border-gray-200 ">
                                <div className="p-4 rounded-t-lg">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={4} className="w-full px-0 text-2xl text-gray-100 border-0 focus:ring-0 dark:text-white bg-theme-primary-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none" placeholder="Task Name ..." required></textarea>
                                </div>
                                <div className="flex items-center justify-start px-3 py-2 mb-6">

                                    <div className="w-1/5 me-2">
                                        <Datepicker classNames=""
                                        options={options} onChange={handleChange} show={show} setShow={handleClose} />
                                    </div>

                                    <div className="w-1/6 me-2">
                                        <Menu>
                                            <Float placement="bottom-end" offset={15}>
                                                <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                                    <span className="sr-only">Open user menu</span>
                                                    <FaFlag className="me-2" />
                                                    Priority
                                                </Menu.Button>

                                                <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                                    <Menu.Item>
                                                        <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            
                                                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200 text-center" aria-labelledby="patientButton">
                                                                <li>
                                                                    <div className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</div>
                                                                </li>
                                                                <li>
                                                                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</div>
                                                                </li>
                                                                <li>
                                                                    <div className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Float>
                                        </Menu>
                                    </div>

                                    <div className="w-1/6 me-2">
                                        
                                        <Menu>
                                            <Float placement="bottom-end" offset={15}>
                                                <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                                    <span className="sr-only">Open user menu</span>
                                                    Patient 
                                                    <svg className="w-2.5 h-2.5 ms-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                    </svg>
                                                </Menu.Button>

                                                <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                                    <Menu.Item>
                                                        <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            
                                                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="patientButton">
                                                                <li>
                                                                    <div className="text-gray-300">
                                                                        Chole Muklex
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="text-gray-300">
                                                                        Xavier Johseph
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="text-gray-300">
                                                                        Nnancy Frannklin
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Float>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pb-4 ">
                                <button className="mx-10 my-4 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Add </button>
                            </div>
                        </div>
                        <MyCustomAccordion title="TODAY TO-DO LIST" children={<ToDoTable />} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}