'use client';
import Link from 'next/link';
import { FaPen, FaTrash } from 'react-icons/fa6';


export default function Index() {
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
                                            <div className="flex uppercase text-white text-2xl font-medium">
                                                ALERT
                                            </div>
                                            <Link href="alert/create" className="flex text-gray-300 me-4 text-base flex items-center px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Create </Link>
                                        </span>
                                    </div>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                        <thead className="text-base text-gray-100 bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 text-xl font-medium w-1/2">
                                                    Alert Name
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-xl font-medium">
                                                    Date & Time
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-xl font-medium">
                                                    Patient
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-xl font-medium text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(7).fill(0)].map((_, i) => (
                                            <tr className="border-b border-theme-primary-700" key={i}>
                                                <td className="p-6">
                                                    Excercise Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                    Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            ))}
                                            {/* <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                    Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                   Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                    Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                   Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                    Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                   Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                    Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-theme-primary-700">
                                                <td className="p-6">
                                                    Medication Alert
                                                </td>
                                                <td className="p-6">
                                                    12-12-2023 11:23 PM
                                                </td>
                                                <td className="p-6">
                                                   Mathida Bell
                                                </td>
                                                <td className="p-6 text-center text-white">
                                                    <div className="flex justify-center items-center">
                                                        <FaPen className="mx-2"/>
                                                        <FaTrash className="mx-2"/>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}