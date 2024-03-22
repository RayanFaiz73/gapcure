"use client";
import React from "react";


const Alert = () => {
    return (
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 px-4 my-4">
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate dark:text-white">
                            Exercise Alerts
                        </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
                        12-12-2023
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate dark:text-white">
                            Medical New and Updates
                        </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
                        12-12-2023
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate dark:text-white">
                            Laboratory Test Result
                        </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
                        12-12-2023
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate dark:text-white">
                            Follow-Up Appointments
                        </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-300 dark:text-white">
                        12-12-2023
                    </div>
                </div>
            </li>
        </ul>

    );
};

export default Alert;