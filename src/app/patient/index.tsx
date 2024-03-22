'use client';
import Link from 'next/link';
import { FaCalendar, FaCircleCheck, FaPen, FaRegStar, FaSortDown, FaSortUp, FaStar, FaTrash } from 'react-icons/fa6';
import { useEffect } from 'react';
import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function Index() {

    const pathname = usePathname();
    useEffect(() => {
        const tabsElement: HTMLElement = document.getElementById('tabs-div') as HTMLElement;

        // create an array of objects with the id, trigger element (eg. button), and the content element
        const tabElements: TabItem[] = [
            {
                id: 'master',
                triggerEl: document.querySelector('#master-tab-div') as HTMLElement,
                targetEl: document.querySelector('#master-div') as HTMLElement
            },
            {
                id: 'active',
                triggerEl: document.querySelector('#active-tab-div') as HTMLElement,
                targetEl: document.querySelector('#active-div') as HTMLElement
            },
            {
                id: 'discharged',
                triggerEl: document.querySelector('#discharged-tab-div') as HTMLElement,
                targetEl: document.querySelector('#discharged-div') as HTMLElement
            }
        ];

        // options with default values
        const options: TabsOptions = {
            defaultTabId: 'master',
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
        if(pathname == '/patient/active'){
            // open tab item based on id
            tabs.show('active');
        }

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
                                            <ul className="flex flex-wrap justify-start -mb-px text-xl font-normal text-center text-gray-500 dark:text-gray-400" id="tabs-div" role="tablist">
                                                <li className="mx-1" role="presentation">
                                                    <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg bg-theme-success-600 active" id="master-tab-div" type="button" role="tab" aria-controls="master-div" aria-selected="false">MASTER LIST</button>
                                                </li>
                                                <li className="mx-1" role="presentation">
                                                    <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white" id="active-tab-div" type="button" role="tab" aria-controls="active-div" aria-selected="false">ACTIVE PATIENTS</button>
                                                </li>
                                                <li className="mx-1" role="presentation">
                                                    <button className="inline-block px-8 py-3 text-white border border-theme-success-600 rounded-lg hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white" id="discharged-tab-div" type="button" role="tab" aria-controls="discharged-div" aria-selected="false">DISCHARGED PATIENTS</button>
                                                </li>
                                            </ul>
                                            <Link href="/patient/create" className="flex text-gray-300 me-4 text-base flex items-center px-10 py-3 font-normal tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Add Patient </Link>
                                        </span>
                                    </div>
                                    <div id="tabContentExample" className="overflow-x-auto">
                                        <div className="" id="master-div" role="tabpanel" aria-labelledby="master-tab-div">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                                <thead className="text-gray-100 bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-4/12">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-2/12 text-center">
                                                            Pytho Score
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-3/12 text-center">
                                                            Registration Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-1/12 text-center">
                                                            Calendar
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-2/12 text-center">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...Array(5).fill(0)].map((_, i) => (
                                                        <tr className="border-b border-theme-primary-700" key={i}>

                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <img className="w-10 h-10 rounded-full" src={`https://flowbite.com/docs/images/people/profile-picture-${i + 1}.jpg`} alt="Jese image" />
                                                                <div className="ps-3">
                                                                    <div className="text-base font-extralight text-gray-300">Neil Sims</div>
                                                                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                                                                </div>
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                {((i + 1) % 2 === 0) ?
                                                                    (<div className="flex justify-center text-base font-extralight text-green-500">
                                                                        <span className="flex">
                                                                            53
                                                                        </span>
                                                                        <span className="flex -mt-5"><div className="flex justify-center align-items flex-col">
                                                                            <span className="text-xs">-12%</span>
                                                                            <FaSortDown className="-mt-2"/>
                                                                        </div>
                                                                        </span>
                                                                    </div>) :

                                                                    (<div className="flex justify-center text-base font-extralight text-red-500">
                                                                        <span className="flex">
                                                                            147
                                                                        </span>
                                                                        <span className="flex -mt-5">
                                                                            <div className="flex justify-center align-items flex-col">
                                                                                <span className="text-xs">+2%</span>
                                                                                <FaSortUp />
                                                                            </div>
                                                                        </span>
                                                                    </div>)
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                12-12-2023
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex justify-center">
                                                                    <span className="flex justify-center bg-theme-success-100 text-theme-success-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-success-400 border border-theme-success-400">
                                                                        <FaCalendar className="me-1" />
                                                                        View
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaRegStar className="mx-2" />
                                                                    <FaPen className="mx-2" />
                                                                    <FaTrash className="mx-2" />
                                                                    <IoIosRedo className="mx-2" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="hidden" id="active-div" role="tabpanel" aria-labelledby="active-tab-div">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                                <thead className="text-gray-100 bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-4/12">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-2/12 text-center">
                                                            Pytho Score
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-3/12 text-center">
                                                            Registration Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-1/12 text-center">
                                                            Calendar
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-2/12 text-center">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...Array(5).fill(0)].map((_, i) => (
                                                        <tr className="border-b border-theme-primary-700" key={i}>

                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <img className="w-10 h-10 rounded-full" src={`https://flowbite.com/docs/images/people/profile-picture-${i + 1}.jpg`} alt="Jese image" />
                                                                <div className="ps-3">
                                                                    <div className="text-base font-extralight text-gray-300">Neil Sims</div>
                                                                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                                                                </div>
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                {((i + 1) % 2 === 0) ?
                                                                    (<div className="flex justify-center text-base font-extralight text-green-500">
                                                                        <span className="flex">
                                                                            53
                                                                        </span>
                                                                        <span className="flex -mt-5"><div className="flex justify-center align-items flex-col">
                                                                            <span className="text-xs">-12%</span>
                                                                            <FaSortDown className="-mt-2"/>
                                                                        </div>
                                                                        </span>
                                                                    </div>) :

                                                                    (<div className="flex justify-center text-base font-extralight text-red-500">
                                                                        <span className="flex">
                                                                            147
                                                                        </span>
                                                                        <span className="flex -mt-5">
                                                                            <div className="flex justify-center align-items flex-col">
                                                                                <span className="text-xs">+2%</span>
                                                                                <FaSortUp />
                                                                            </div>
                                                                        </span>
                                                                    </div>)
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                12-12-2023
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex justify-center">
                                                                    <span className="flex justify-center bg-theme-success-100 text-theme-success-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-success-400 border border-theme-success-400">
                                                                        <FaCalendar className="me-1" />
                                                                        View
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaStar className="text-green-500 mx-2" />
                                                                    <FaPen className="mx-2" />
                                                                    <FaTrash className="mx-2" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="hidden" id="discharged-div" role="tabpanel" aria-labelledby="discharged-tab-div">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-400">
                                                <thead className="text-gray-100 bg-theme-primary-400 dark:bg-theme-primary-700 dark:text-gray-100">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-6/12">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-3/12 text-center">
                                                            Registration Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-1/12 text-center">
                                                            Calendar
                                                        </th>
                                                        <th scope="col" className="px-6 py-4 text-lg font-normal w-2/12 text-center">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[...Array(5).fill(0)].map((_, i) => (
                                                        <tr className="border-b border-theme-primary-700" key={i}>

                                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                                <img className="w-10 h-10 rounded-full" src={`https://flowbite.com/docs/images/people/profile-picture-${i + 1}.jpg`} alt="Jese image" />
                                                                <div className="ps-3">
                                                                    <div className="text-base font-extralight text-gray-300">Neil Sims</div>
                                                                    {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                                                                </div>
                                                            </th>
                                                            <td className="px-6 py-4 text-center">
                                                                12-12-2023
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex justify-center">
                                                                    <span className="flex justify-center bg-theme-success-100 text-theme-success-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-success-400 border border-theme-success-400">
                                                                        <FaCalendar className="me-1" />
                                                                        View
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-center text-white">
                                                                <div className="flex justify-center items-center">
                                                                    <FaRegStar className="mx-2" />
                                                                    <FaPen className="mx-2" />
                                                                    <FaTrash className="mx-2" />
                                                                    <IoIosUndo className="mx-2" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}