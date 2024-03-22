"use client";
import React from "react";


const Waitlist = () => {
    return (
        
        // <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 px-4 my-4">
        //     <li className="py-4 sm:py-4">
        //         <div className="flex items-center space-x-4 rtl:space-x-reverse">
        //             <div className="flex-1 min-w-0">
        //                 <p className="text-sm text-gray-300 truncate dark:text-white">
        //                     Patient Name
        //                 </p>
        //             </div>
        //             <div className="inline-flex items-center text-center text-sm text-gray-300 dark:text-white">
        //                 Status
        //             </div>
        //         </div>
        //     </li>
        //     <li className="py-3 sm:py-4">
        //         <div className="flex items-center space-x-4 rtl:space-x-reverse">
        //             <div className="flex-1 min-w-0">
        //                 <p className="text-sm text-gray-300 truncate dark:text-white">
        //                     Kristy Lane
        //                 </p>
        //             </div>
        //             <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
        //                 <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Done</span>
        //             </div>
        //         </div>
        //     </li>
        //     <li className="py-3 sm:py-4">
        //         <div className="flex items-center space-x-4 rtl:space-x-reverse">
        //             <div className="flex-1 min-w-0">
        //                 <p className="text-sm text-gray-300 truncate dark:text-white">
        //                     Alita Anna
        //                 </p>
        //             </div>
        //             <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
        //                     <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Done</span>
        //             </div>
        //         </div>
        //     </li>
        //     <li className="py-3 sm:py-4">
        //         <div className="flex items-center space-x-4 rtl:space-x-reverse">
        //             <div className="flex-1 min-w-0">
        //                 <p className="text-sm text-gray-300 truncate dark:text-white">
        //                     Lexi John
        //                 </p>
        //             </div>
        //             <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
        //                     <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400">Not Done</span>
        //             </div>
        //         </div>
        //     </li>
        // </ul>




    <div className="relative overflow-x-auto mb-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-100 uppercase bg-theme-primary-700 dark:bg-theme-primary-700 dark:text-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3 w-8/12">
                        Patient Name
                    </th>
                    <th scope="col" className="px-2 py-3 text-center">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-theme-primary-700">
                    <th scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-xs font-light text-gray-100">
                            Kristy Lane
                        </div>  
                    </th>
                    <td className="px-2 py-2 text-center text-white">
                        <span className="bg-theme-secondary-100 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400"> Done </span>
                    </td>
                </tr>
                <tr className="border-b border-theme-primary-700">
                    <th scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-xs font-light text-gray-100">
                            Alita Anna
                        </div>  
                    </th>
                    <td className="px-2 py-2 text-center text-white">
                        <span className="bg-theme-secondary-300 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400"> Not Done </span>
                    </td>
                </tr>
                <tr className="border-b border-theme-primary-700">
                    <th scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-xs font-light text-gray-100">
                            Lexi John
                        </div>  
                    </th>
                    <td className="px-2 py-2 text-center text-white">
                        <span className="bg-theme-secondary-300 text-theme-secondary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-theme-secondary-400 border border-theme-secondary-400"> Not Done </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    );
};

export default Waitlist;