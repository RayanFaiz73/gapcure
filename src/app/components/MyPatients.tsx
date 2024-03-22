"use client";
import React from "react";
import { FaArrowRight, FaCalendar, FaPen, FaRegCalendar, FaTrash } from "react-icons/fa6";


const MyPatients = () => {
    return (
        <ul className="max-w-md p-4">
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://source.unsplash.com/collection/302501/?1" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                        Neil Sims
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        Brief Summary of Condition
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100 dark:text-white">
                        <FaArrowRight className="text-white me-4" />
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://source.unsplash.com/collection/302501/?2" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                        Bonnie Green
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        Brief Summary of Condition
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100 dark:text-white">
                        <FaArrowRight className="text-white me-4" />
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://source.unsplash.com/collection/302501/?3" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                        Michael Gough
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        Brief Summary of Condition
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100 dark:text-white">
                        <FaArrowRight className="text-white me-4" />
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://source.unsplash.com/collection/302501/?4" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                        Thomas Lean
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        Brief Summary of Condition
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100 dark:text-white">
                        <FaArrowRight className="text-white me-4" />
                    </div>
                </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://source.unsplash.com/collection/302501/?5" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                        Lana Byrd
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                        Brief Summary of Condition
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-100 dark:text-white">
                        <FaArrowRight className="text-white me-4" />
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default MyPatients;