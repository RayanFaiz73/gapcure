"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { randomTaskCreateSchema } from "./validation";

const CreateRandomTask = () => {

    const { data: session, status, update: sessionUpdate } = useSession()
    const axiosAuth = useAxiosAuth();
    const newRandomTaskOptions = { resolver: yupResolver(randomTaskCreateSchema)};
    const { register: newRandomTask ,formState: { errors: newRandomTaskErrors }, reset: ranndomTaskFormReset, handleSubmit: submitNewRandomTask } = useForm(newRandomTaskOptions);
    const onSubmitNewRandomTask = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            ranndomTaskFormReset();
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

                    <form onSubmit={submitNewRandomTask(onSubmitNewRandomTask)}>
                        <div className="p-6">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                                        htmlFor="randomTask">
                                        Write Random Task
                                    </label>

                                    <textarea 
                                        {...newRandomTask("name")}
                                        className="w-full text-gray-100 border border-2 rounded-lg focus:ring-0 dark:text-white bg-theme-primary-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none" 
                                        placeholder="write a random task here"
                                        id="randomTask"
                                        name="randomTask"
                                        required
                                        rows={6} 
                                        ></textarea>

                                    <div className="text-red-500 ml-2 mt-2">{newRandomTaskErrors.name?.message}</div>
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
export default CreateRandomTask;