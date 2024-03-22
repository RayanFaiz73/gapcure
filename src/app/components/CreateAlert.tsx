"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { alertCreateSchema } from "./validation";

const CreateAlert = () => {

    const { data: session, status, update: sessionUpdate } = useSession()
    const axiosAuth = useAxiosAuth();
    const newAlertOptions = { resolver: yupResolver(alertCreateSchema)};
    const { register: newAlert ,formState: { errors: newAlertErrors }, reset: alertFormReset, handleSubmit: submitNewAlert } = useForm(newAlertOptions);
    const onSubmitNewAlert = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            alertFormReset();
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

        <div className="flex flex-wrap mb-6">

            <div className="w-full mb-3">
                <div className="bg-theme-primary-500 rounded-lg dark:bg-gray-800">

                    <form onSubmit={submitNewAlert(onSubmitNewAlert)}>
                        <div className="p-6">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                        htmlFor="nameAlert">
                                        Alert Name
                                    </label>
                                    <input
                                        {...newAlert("name")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Alert Name"
                                        id="nameAlert"
                                        type="text"
                                        name="nameAlert"
                                        required
                                    />
                                    <div className="text-red-500 ml-2 mt-2">{newAlertErrors.name?.message}</div>
                                </div>
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                        htmlFor="patientAlert">
                                        Patient
                                    </label>
                                    <select 
                                        {...newAlert("patient")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Patient Name"
                                        id="patientAlert"
                                        name="patientAlert"
                                        required
                                        >
                                            <option value=""> Select Patient </option>
                                            <option value="1"> Patient 1 </option>
                                            <option value="2"> Patient 2 </option>

                                    </select>
                                    <div className="text-red-500 ml-2 mt-2">{newAlertErrors.patient?.message}</div>
                                </div>
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                        htmlFor="dateAlert">
                                        Date
                                    </label>
                                    <input
                                        {...newAlert("date")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Alert Date"
                                        id="dateAlert"
                                        type="text"
                                        name="dateAlert"
                                        required
                                    />
                                    <div className="text-red-500 ml-2 mt-2">{newAlertErrors.date?.message}</div>
                                </div>
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white"
                                        htmlFor="timeAlert">
                                        Time
                                    </label>
                                    <input
                                        {...newAlert("time")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Alert Time"
                                        id="timeAlert"
                                        type="text"
                                        name="timeAlert"
                                        required
                                    />
                                    <div className="text-red-500 ml-2 mt-2">{newAlertErrors.time?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pb-4 ">
                            <button
                                type="submit"
                                className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateAlert;