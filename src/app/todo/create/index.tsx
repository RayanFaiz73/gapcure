'use client';

import CreateToDo from "@/app/components/CreateToDo";
import Link from "next/link";

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
                                                CREATE TODO
                                            </div>
                                            <Link href="/todo" className="flex text-gray-300 me-4 text-base flex items-center px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> List </Link>
                                        </span>
                                    </div>
                                    {/* <div
                                        className="bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white px-6 pt-6 py-4 font-medium rtl:text-right border-b border-theme-primary-400 dark:border-gray-700 dark:text-gray-400 hover:bg-theme-primary-500 dark:hover:bg-gray-800"
                                    >
                                        <span className="flex flex-1 justify-between items-center">
                                            <div className="flex uppercase text-bold">
                                                CREATE TODO
                                            </div>
                                            <Link href="/todo" className="flex text-gray-300 me-4 text-xs flex items-center px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> List </Link>
                                        </span>
                                    </div> */}
                                    <CreateToDo />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}