'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';
import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from './validation';
import toast from 'react-hot-toast';
import { REGISTER_ROUTE } from '@/utils/ApiRoutes';


export default function Form() {
    const formOptions = { resolver: yupResolver(registerSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState
    const onSubmit = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            const res = await axiosInstance.post(REGISTER_ROUTE, data);

        toast.success(res?.data?.message);
            const loginElement: HTMLElement = document.getElementById('login-tab-example') as HTMLElement;
            loginElement.click();
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
    const router = useRouter();
    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        console.log(response);
        if (!response?.error) {

            toast.success('signin successfully!',{
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            });
            router.push('/');
            router.refresh();
        }
        else {
            toast.error(response.error,{
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            });
        }
    };

    async function handleGithubLogin(){
        signIn('github',{callbackUrl:'http://localhost:3000'});
    }

    useEffect(() => {
        const tabsElement: HTMLElement = document.getElementById('tabs-example') as HTMLElement;

        // create an array of objects with the id, trigger element (eg. button), and the content element
        const tabElements: TabItem[] = [
            {
                id: 'login',
                triggerEl: document.querySelector('#login-tab-example') as HTMLElement,
                targetEl: document.querySelector('#login-example') as HTMLElement
            },
            {
                id: 'registeration',
                triggerEl: document.querySelector('#registeration-tab-example') as HTMLElement,
                targetEl: document.querySelector('#registeration-example') as HTMLElement
            }
        ];

        // options with default values
        const options: TabsOptions = {
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
        const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);

        // open tab item based on id
        // tabs.show('registeration');

    }, []);
    return (
        <>

            <div className="flex h-screen items-center flex-column justify-center px-6 py-12 lg:px-8">
                <div className="flex w-full  max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-5xl">
                    <div className="hidden bg-contain bg-no-repeat lg:block lg:w-1/2" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/tiny-man-unlocking-mobile-phone-with-golden-key-padlock-smartphone-lock-flat-vector-illustration-security-protection-concept-app-mobile-template_74855-12527.jpg?w=1380&t=st=1699544435~exp=1699545035~hmac=6a4486a2817e28572ffb22c9f03d30206e136b635c65a41551dde076ddb6270d')" }}></div>

                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://flowbite.com/docs/images/logo.svg" alt="" />
                        </div>

                        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                            GapCure
                        </p>

                        <div className="lg:w-72 sm:w-auto mx-auto p-3 mt-4 bg-theme-primary-500 dark:border-gray-700 rounded-full">
                            <ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="tabs-example" role="tablist">
                                <li className="mx-2" role="presentation">
                                    <button className="inline-block px-8 py-3 text-white bg-theme-success-600 rounded-full active" id="login-tab-example" type="button" role="tab" aria-controls="login-example" aria-selected="false">Login</button>
                                </li>
                                <li role="presentation">
                                    <button className="inline-block px-8 py-3 rounded-full hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white" id="registeration-tab-example" type="button" role="tab" aria-controls="registeration-example" aria-selected="false">Register</button>
                                </li>
                            </ul>
                        </div>
                        <div id="tabContentExample" className="overflow-x-auto">
                            <div className="hidden p-4" style={{ height: '35rem' }} id="login-example" role="tabpanel" aria-labelledby="login-tab-example">

                                <button className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-lg hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4">
                                    <div className="px-4 py-2">
                                        <svg className="w-6 h-6" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>
                                    </div>

                                    <span className="w-5/6 px-4 py-2 text-center">Sign in with Google</span>
                                </button>

                                <button className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-lg hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4">
                                    <div className="px-4 py-2">


                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M 4.4042969 3 C 3.7572969 3 3.3780469 3.7287656 3.7480469 4.2597656 L 9.7363281 12.818359 L 3.7246094 19.845703 C 3.3356094 20.299703 3.6578594 21 4.2558594 21 L 4.9199219 21 C 5.2129219 21 5.4916406 20.871437 5.6816406 20.648438 L 10.919922 14.511719 L 14.863281 20.146484 C 15.238281 20.680484 15.849953 21 16.501953 21 L 19.835938 21 C 20.482937 21 20.862187 20.272188 20.492188 19.742188 L 14.173828 10.699219 L 19.900391 3.9902344 C 20.232391 3.6002344 19.955359 3 19.443359 3 L 18.597656 3 C 18.305656 3 18.027891 3.1276094 17.837891 3.3496094 L 12.996094 9.0097656 L 9.3945312 3.8554688 C 9.0205313 3.3194687 8.4098594 3 7.7558594 3 L 4.4042969 3 z"></path>
                                        </svg>
                                    </div>

                                    <span className="w-5/6 px-4 py-2 text-center">Sign in with Twitter</span>
                                </button>

                                <button onClick={handleGithubLogin} className="w-full px-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-lg hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center mt-4">
                                    <div className="px-4 py-2">

                                        <svg className="w-6 h-6" viewBox="0 0 30 30">
                                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                        </svg>
                                    </div>

                                    <span className="w-5/6 px-4 py-2 text-center">Sign in with GitHub</span>
                                </button>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-theme-primary-50 lg:w-1/4"></span>

                                    <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                                        or
                                    </span>

                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-gray-400 lg:w-1/4"></span>
                                </div>
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="loginEmailAddress">Email Address</label>
                                        <input
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            id="loginEmailAddress"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="loginPassword">Password</label>
                                            <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                                        </div>

                                        <input
                                            id="loginPassword"
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            type="password"
                                            name="password"
                                            autoComplete="current-password"
                                            required
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-lg hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                            Sign In
                                        </button>
                                    </div>
                                </form>

                                {/* <div className="flex items-center justify-between mt-4">
                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-theme-primary-50 md:w-1/4"></span>

                                    <Link href="/register" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-theme-primary-50 md:w-1/4"></span>
                                </div> */}
                            </div>
                            <div className="hidden p-4" style={{ height: '35rem' }} id="registeration-example" role="tabpanel" aria-labelledby="registeration-tab-example">

                                {/* <form onSubmit={handleRegisterationSubmit}> */}
                                <form onSubmit={handleSubmit(onSubmit)} id="reset">
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="registerNameAddress">Full Name</label>
                                        <input
                                            {...register("name")}
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            id="registerNameAddress"
                                            type="text"
                                            name="name"
                                            required
                                        />
                                        <div className="text-red-500 ml-2 mt-2">{errors.name?.message}</div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="registerEmailAddress">Email Address</label>
                                        <input
                                            {...register("email")}
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            id="registerEmailAddress"
                                            type="email"
                                            name="email"
                                            autoComplete="new"
                                            required
                                        />
                                        <div className="text-red-500 ml-2 mt-2">{errors.email?.message}</div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="registerPhoneNumber">Phone Number</label>
                                        <input
                                            {...register("phone")}
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            id="registerPhoneNumber"
                                            type="text"
                                            name="phone"
                                            autoComplete="phone"
                                            required
                                        />
                                        <div className="text-red-500 ml-2 mt-2">{errors.phone?.message}</div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="registerPassword">Password</label>
                                        </div>

                                        <input
                                            {...register("password")}
                                            id="registerPassword"
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            required
                                        />
                                        <div className="text-red-500 ml-2 mt-2">{errors.password?.message}</div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-200" htmlFor="registerConfirmPassword">Confirm Password</label>
                                        </div>

                                        <input
                                            {...register("confirmPassword")}
                                            id="registerConfirmPassword"
                                            className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                            type="password"
                                            name="confirmPassword"
                                            required
                                        />
                                        <div className="text-red-500 ml-2 mt-2">{errors.confirmPassword?.message}</div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-lg hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                            Register
                                        </button>
                                    </div>
                                </form>

                                {/* <div className="flex items-center justify-between mt-4">
                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-theme-primary-50 md:w-1/4"></span>

                                    <Link href="/login" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">Already Registered?</Link>

                                    <span className="w-1/5 border-b border-theme-primary-50 dark:border-theme-primary-50 md:w-1/4"></span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}