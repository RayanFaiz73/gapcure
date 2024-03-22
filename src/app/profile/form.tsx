'use client';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '@/lib/axiosInstance';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { newEmailSchema, passwordResetSchema, newNameSchema } from './validation';
import { UPDATE_EMAIL_ADDRESS, UPDATE_PASSWORD, UPDATE_PERSONNAL_INFO } from '@/utils/ApiRoutes';


export default function Form() {
    // const { data: session } = useSession();
    // const session = useSession();
    const { data: session, status, update: sessionUpdate } = useSession()
    const axiosAuth = useAxiosAuth();

    // const [show, setShow] = useState<boolean>(false)
    // const handleChange = (selectedDate: Date) => {
    //     console.log(selectedDate)
    // }
    // const handleClose = (state: boolean) => {
    //     setShow(state)
    // }

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

    const newEmailOptions = { resolver: yupResolver(newEmailSchema) ,
        defaultValues: {
          email: "",
          password: ""
        } };
    const passwordResetOptions = { resolver: yupResolver(passwordResetSchema),
        defaultValues: {
          password: "",
          currentPassword: "",
          passwordConfirm: "",
        } };
    const newNameOptions = { resolver: yupResolver(newNameSchema)};

    const { register: newEmail, setValue:newEmailSet ,formState: { errors: newEmailErrors }, reset: newEmailReset, handleSubmit: submitNewEmail } = useForm(newEmailOptions);
    const { register: passwordReset ,formState: { errors: passwordResetErrors }, reset: passwordFormReset, handleSubmit: submitPasswordReset } = useForm(passwordResetOptions);
    const { register: newName,  setValue:newNameSet ,formState: { errors: newNameErrors }, reset: newNameReset, handleSubmit: submitNewName, setValue: setInfoForm } = useForm(newNameOptions);


    useEffect(() => {
        if(session){
            newEmailSet('email',session?.user.email);
            newNameSet('firstName',session?.user.firstName);
            newNameSet('lastName',session?.user.lastName);
        }
        return () => {
            session
        };
      }, [session]);

    const onSubmitNewEmail = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            const res = await axiosAuth.put(UPDATE_EMAIL_ADDRESS, data);
            if(res.status === 200){
                sessionUpdate(res)
            }
            toast.success(res?.data?.message);
            newEmailReset();

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

    const onSubmitPasswordReset = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            const res = await axiosAuth.put(UPDATE_PASSWORD, data);
            if(res.status === 200){
                sessionUpdate(res)
            }
            toast.success(res?.data?.message);
            passwordFormReset();
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

    const onSubmitNewName = async (data: FormEvent<HTMLFormElement> | any) => {
            const res = await axiosAuth.put(UPDATE_PERSONNAL_INFO, data);
            if(res.status === 200){
                sessionUpdate(res)
            }
            toast.success(res?.data?.message);
            newNameReset();
    }
    return (
        <>
            <div className="py-6 text-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">

                        <div className="w-full mb-3">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800">

                                <form onSubmit={submitNewName(onSubmitNewName)}>
                                    <div
                                        className="border-b border-gray-200 text-2xl font-bold tracking-tight text-gray-300 dark:text-white px-6 py-3">
                                        PROFILE SETTINGS
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="w-full lg:w-1/6 px-3 mb-6 lg:mb-3 flex flex-col flex-wrap justify-center items-center">
                                                <div className="flex">
                                                    <img className="w-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                                </div>
                                                <div className="flex">
                                                    <span className="block  text-sm font-medium text-gray-300 dark:text-white">click to edit</span>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-5/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="firstName">
                                                    First name
                                                </label>
                                                <input
                                                    {...newName("firstName")}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    id="firstName"
                                                    type="text"
                                                    name="firstName"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newNameErrors.firstName?.message}</div>
                                            </div>
                                            <div className="w-full lg:w-5/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="lastName">
                                                    Last name
                                                </label>
                                                <input
                                                    {...newName("lastName")}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    id="lastName"
                                                    type="text"
                                                    name="lastName"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newNameErrors.lastName?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pb-4 ">
                                        <button 
                                            type="submit"
                                            className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800">

                                <form onSubmit={submitPasswordReset(onSubmitPasswordReset)}>
                                    <div
                                        className="border-b border-gray-200 text-2xl font-bold tracking-tight text-gray-300 dark:text-white px-6 py-3">
                                        CHANGE PASSWORD
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="currentPassword">
                                                    Current Password
                                                </label>
                                                <input
                                                    {...passwordReset("currentPassword")}
                                                    id="currentPassword"
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    type="password"
                                                    name="currentPassword"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{passwordResetErrors.currentPassword?.message}</div>
                                            </div>
                                            <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="newPassword">
                                                    New Password
                                                </label>
                                                <input
                                                    {...passwordReset("password")}
                                                    id="newPassword"
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    type="password"
                                                    name="password"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{passwordResetErrors.password?.message}</div>
                                            </div>
                                            <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="passwordConfirm">
                                                    Password Confirm
                                                </label>


                                                <input
                                                    {...passwordReset("passwordConfirm")}
                                                    id="passwordConfirm"
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    type="password"
                                                    name="passwordConfirm"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{passwordResetErrors.passwordConfirm?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pb-4 ">
                                        <button
                                            type="submit"
                                            className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800">
                                <form onSubmit={submitNewEmail(onSubmitNewEmail)}>
                                    <div
                                        className="border-b border-gray-200 text-2xl font-bold tracking-tight text-gray-300 dark:text-white px-6 py-3">
                                        CHANGE EMAIL
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    {...newEmail("email")}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newEmailErrors.email?.message}</div>
                                            </div>
                                            <div className="w-full lg:w-1/3 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                                 htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    {...newEmail("password")}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newEmailErrors.password?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pb-4 ">
                                        <button 
                                            type="submit"
                                            className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}