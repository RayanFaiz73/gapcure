'use client';
import Link from 'next/link';
import { FaCalendar, FaCircleCheck, FaPen, FaTrash } from 'react-icons/fa6';
import { useEffect } from 'react';
import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";


export default function Index() {

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
            activeClasses: 'bg-theme-success-600',
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
            <div className="py-6 text-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white rounded-xl">
                                <div className="relative overflow-x-auto mb-8 rounded-xl">
                                    <div
                                        className="bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white px-6 pt-6 py-4 font-medium rtl:text-right border-b border-theme-primary-400 dark:border-gray-700 dark:text-gray-400 hover:bg-theme-primary-500 dark:hover:bg-gray-800"
                                    >
                                        <span className="flex flex-1 justify-between items-center">
                                            <ul className="flex flex-wrap justify-start -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="tabs-example" role="tablist">
                                                <li className="mx-2" role="presentation">
                                                    <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg bg-theme-success-600 active" id="login-tab-example" type="button" role="tab" aria-controls="login-example" aria-selected="false">TO-DO LIST</button>
                                                </li>
                                                <li role="presentation">
                                                    <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white" id="registeration-tab-example" type="button" role="tab" aria-controls="registeration-example" aria-selected="false">WAITLIST</button>
                                                </li>
                                            </ul>
                                            <Link href="todo/create" className="flex text-gray-300 me-4 text-base flex items-center px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Create </Link>
                                        </span>
                                    </div>

                                    {/* <div className="p-3 bg-theme-primary-500 dark:border-gray-700 rounded-lg">
                                        <ul className="flex flex-wrap justify-start -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="tabs-example" role="tablist">
                                            <li className="mx-2" role="presentation">
                                                <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg bg-theme-success-600 active" id="login-tab-example" type="button" role="tab" aria-controls="login-example" aria-selected="false">TO-DO LIST</button>
                                            </li>
                                            <li role="presentation">
                                                <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white" id="registeration-tab-example" type="button" role="tab" aria-controls="registeration-example" aria-selected="false">WAITLIST</button>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <div id="tabContentExample" className="overflow-x-auto">
                                        <div className="" id="login-example" role="tabpanel" aria-labelledby="login-tab-example">

                                            <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                                <thead className="text-base text-gray-100 bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 text-xl font-medium w-5/12">
                                                            Tasks
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-xl font-medium w-2/12 text-center">
                                                            Assignee
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-xl font-medium w-1/12 text-center">
                                                            Priority
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-xl font-medium w-2/12 text-center">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-xl font-medium w-2/12 text-center">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Patient Registration</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Health Data</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Symptoms</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Medical Records</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Patient Registration</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Health Data</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Symptoms</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-theme-primary-700">
                                                        
                                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="">
                                                                <div className="text-base font-normal text-gray-100">Medical Records</div>
                                                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                            </div>  
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="text-base font-thin text-gray-100">Patient Registration</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center text-white">
                                                            <div className="flex justify-center items-center">
                                                                <FaPen className="mx-2"/>
                                                                <FaTrash className="mx-2"/>
                                                                <FaCalendar className="mx-2"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="hidden" id="registeration-example" role="tabpanel" aria-labelledby="registeration-tab-example">

                                            <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                                    <thead className="text-base text-gray-100  bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-4 text-xl font-medium w-7/12">
                                                                Tasks
                                                            </th>
                                                            <th scope="col" className="px-6 py-4 text-xl font-medium w-1/12 text-center">
                                                                Priority
                                                            </th>
                                                            <th scope="col" className="px-6 py-4 text-xl font-medium w-2/12 text-center">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="px-6 py-4 text-xl font-medium w-2/12 text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Patient Registration</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Health Data</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Symptoms</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Medical Records</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Patient Registration</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Health Data</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Symptoms</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="border-b border-theme-primary-700">
                                                            
                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <div className="">
                                                                    <div className="text-base font-normal text-gray-100">Medical Records</div>
                                                                    <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                                                                </div>  
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaPen className="mx-2"/>
                                                                    <FaTrash className="mx-2"/>
                                                                    <FaCalendar className="mx-2"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    {/* <div className="bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white px-6 pt-6 py-4 font-medium rtl:text-right border-b border-theme-primary-400 dark:border-gray-700 dark:text-gray-400 hover:bg-theme-primary-500 dark:hover:bg-gray-800">
                                        <span className="flex flex-1 justify-between items-center">
                                            <div className="flex uppercase text-bold">
                                                TODOs
                                            </div>
                                            <Link href="todo/create" className="flex text-gray-300 me-4 text-xs flex items-center px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Create </Link>
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}