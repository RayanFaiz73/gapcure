"use client";
import React from "react";
import { FaCalendar, FaCircleCheck, FaPen, FaRegCalendar, FaTrash } from "react-icons/fa6";


const ToDoTable = () => {
    return (
        
        <div className="relative overflow-x-auto mb-8">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-100 uppercase bg-theme-primary-700 dark:bg-theme-primary-700 dark:text-gray-100">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                {/* <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label> */}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tasks
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Priority
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Patient Registration</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <FaCircleCheck className="text-green-800" />
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Health Data</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Symptoms</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <FaCircleCheck className="text-green-800" />
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Medical Records</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Patient Registration</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <FaCircleCheck className="text-green-800" />
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Health Data</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Symptoms</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Complete</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-theme-primary-700">
                        <td className="w-4 px-4 py-2">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-300 bg-gray-100 border-gray-300 rounded dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="">
                                <div className="text-base font-semibold text-gray-100">Medical Records</div>
                                <div className="font-normal text-gray-500">John Doe 12-12-2023</div>
                            </div>  
                        </th>
                        <td className="px-6 py-2">
                            <span className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</span>
                        </td>
                        <td className="px-6 py-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Completed</span>
                        </td>
                        <td className="px-6 py-2 text-center text-white">
                            <div className="flex justify-center items-center">
                                <FaPen className="mx-2"/>
                                <FaTrash className="mx-2"/>
                                {/* <FaRegCalendar className="mx-2"/> */}
                                <FaCalendar className="mx-2"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ToDoTable;