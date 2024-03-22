"use client";
import React, { FormEvent, Fragment, useEffect } from "react";
import { useState } from 'react';
import { FaCalendar, FaFlag, FaUser } from 'react-icons/fa6';
import { IoFilterCircle } from "react-icons/io5";
import Datepicker from "tailwind-datepicker-react"
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { Menu } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoCreateSchema } from "./validation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";


const CreateToDo = ({ isWaitList, calendarDate }: { isWaitList?: boolean, calendarDate?: Date  }) => {

    const [show, setShow] = useState<boolean>(false)
	// const [defaultDate, setDefaultDate] = useState<Date | null>(null)
	const [defaultDate, setDefaultDate] = useState<Date>(new Date())
    const [assignee, setAssignee] = useState(0);
    const [patient, setPatient] = useState(0);
    const [assigneeData, setAssigneeData] = useState<any>({
        id:null,
        name:null,
        icon:null
    });
    const [priority, setPriority] = useState("");

    if(calendarDate){
        setDefaultDate(calendarDate);
    }

    const { data: session, status, update: sessionUpdate } = useSession()
    const axiosAuth = useAxiosAuth();
    const newToDoOptions = { resolver: yupResolver(todoCreateSchema)};
    const { register: newToDo ,formState: { errors: newToDoErrors }, reset: toDoFormReset, handleSubmit: submitNewToDo, setValue:setNewToDo, getValues } = useForm(newToDoOptions);
    const onSubmitNewToDo = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            toDoFormReset();
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


    const handleChange = (selectedDate: Date) => {
		setDefaultDate(selectedDate)
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
        defaultDate: new Date(),
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

    const assigneeList = [
        { id:-1 , name: 'Myself', icon: <FaUser/>},
        { id:0 , name: 'WaitList', icon: <IoFilterCircle/>},
        { id:1 , name: 'Patient 1'},
        { id:2 , name: 'Patient 2'},
        { id:3 , name: 'Patient 3'},
    ]
    useEffect(() => {
        setNewToDo("date", defaultDate);
        setNewToDo("assignee", assignee);
        setNewToDo("priority", priority);
        setNewToDo("patient", patient);
        if(assignee || assignee == 0){
            let assigneeObject = assigneeList.find(o => o.id === assignee);
            setAssigneeData(assigneeObject);
        }
    }, [setNewToDo, defaultDate, assignee, priority, patient]);

    return (
        <>
        <form onSubmit={submitNewToDo(onSubmitNewToDo)}>
            <div className="w-full mb-4  ">
                <div className="p-6 rounded-t-lg">
                    <label htmlFor="taskToDo" className="sr-only">Task Name</label>
                    <textarea 
                    {...newToDo("task")}
                    className="w-full px-0 text-2xl text-gray-100 border-0 focus:ring-0 dark:text-white bg-theme-primary-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none" 
                    placeholder="Task Name ..." 
                    id="taskToDo" 
                    rows={4} 
                    ></textarea>
                    {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.task?.message}</div> */}
                </div>
                <div className="flex flex-wrap items-center justify-start px-3 py-2 mb-6">

                    <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                        <Datepicker classNames="" options={options} onChange={handleChange} show={show} setShow={handleClose} />
                        {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.date?.message}</div> */}
                    </div>

                    <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                        <Menu>
                            <Float placement="bottom-end" offset={15} adaptiveWidth={true} >
                                <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                    <span className="sr-only">Open user menu</span>
                                    <FaFlag className="me-2" />
                                    Priority
                                </Menu.Button>

                                <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                    <Menu.Item>
                                        <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">

                                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200 text-center" aria-labelledby="patientButton">
                                                <li onClick={ () => setPriority("High") }>
                                                    <div className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</div>
                                                </li>
                                                <li onClick={ () => setPriority("Medium") }>
                                                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</div>
                                                </li>
                                                <li onClick={ () => setPriority("Low") }>
                                                    <div className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </Menu.Item>
                                </Menu.Items>
                            </Float>
                        </Menu>
                        {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.priority?.message}</div> */}
                    </div>

                    <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                        <Menu>
                            <Float placement="bottom-end" offset={15} adaptiveWidth={true}>
                                <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                    <span className="sr-only">Open user menu</span>
                                    Patient
                                    <svg className="w-2.5 h-2.5 ms-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </Menu.Button>

                                <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                    <Menu.Item>
                                        <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">

                                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="patientButton">
                                                <li onClick={ () => setPatient(1) }>
                                                    <div className="text-gray-300 py-1">
                                                        Chole Muklex
                                                    </div>
                                                </li>
                                                <li onClick={ () => setPatient(2) }>
                                                    <div className="text-gray-300 py-1">
                                                        Xavier Johseph
                                                    </div>
                                                </li>
                                                <li onClick={ () => setPatient(3) }>
                                                    <div className="text-gray-300 py-1">
                                                        Nnancy Frannklin
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </Menu.Item>
                                </Menu.Items>
                            </Float>
                        </Menu>
                        {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.patient?.message}</div> */}
                    </div>

                    {!isWaitList && 
                        <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                            <Menu>
                                <Float placement="bottom-end" offset={15} adaptiveWidth={true}>
                                    <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                        <span className="sr-only">Open user menu</span>
                                        {(assigneeData.name) ? ( <> {assigneeData.name} </> ) : (<> Myself </>)}
                                        <svg className="w-2.5 h-2.5 ms-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </Menu.Button>

                                    <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                        <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="patientButton">
                                                {assigneeList.map((val) => (
                                                <Menu.Item key={val.id} as={Fragment}>
                                                    {() => (
                                                    <li onClick={ () => setAssignee(val.id) }>
                                                        <div className="text-gray-300 py-1  text-center inline-flex items-center">
                                                            {val.icon && <div className="me-2">{val.icon}</div>}
                                                            {val.name}
                                                        </div>
                                                    </li>
                                                    )}
                                                </Menu.Item>
                                                ))}
                                            </ul>
                                        </div>
                                    </Menu.Items>
                                </Float>
                            </Menu>
                            {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.assignee?.message}</div> */}
                        </div>
                    }
                </div>
                    <div className="text-red-500 ml-2 mt-2">{newToDoErrors.task?.message}</div>
                    <div className="text-red-500 ml-2 mt-2">{newToDoErrors.date?.message}</div>
                    <div className="text-red-500 ml-2 mt-2">{newToDoErrors.priority?.message}</div>
                    <div className="text-red-500 ml-2 mt-2">{newToDoErrors.patient?.message}</div>
                    <div className="text-red-500 ml-2 mt-2">{newToDoErrors.assignee?.message}</div>
            </div>
            <div className="flex justify-end pb-4 ">
                <button
                    type="submit"
                    className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Add
                </button>
            </div>
        </form>
        </>
    );
};

export default CreateToDo;