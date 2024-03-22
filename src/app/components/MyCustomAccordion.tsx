"use client";
import React, { ReactNode, useState } from "react";
import "./style.css";


const MyCustomAccordion = ({ title, children }: { title: any, children: ReactNode }) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    return (
        <div className="">
            <div
                className={`accordion-title bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white p-4 font-medium rtl:text-right border-b border-theme-primary-400 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-theme-primary-500 dark:hover:bg-gray-800 ${isOpen ? "open" : ""}`}
                onClick={() => setOpen(!isOpen)}
            >
                <span className="flex flex-1 justify-between">
                    <div className="flex">
                        {title}
                    </div>
                    <span className="flex text-gray-300 me-4 text-xs flex items-center">View all</span>
                </span>
            </div>
            <div className={`accordion-item bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white rounded-b-xl ${!isOpen ? "collapsed" : ""}`}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
};

export default MyCustomAccordion;