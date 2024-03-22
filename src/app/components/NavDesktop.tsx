import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBell, FaCalendarDays, FaCirclePlus, FaClipboardUser, FaFileLines, FaUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

export const NavDesktop = () => {
    const pathname = usePathname();
    
    return (
        <div className="sticky top-0 z-10 px-3 min-h-screen overflow-y-auto">
            <div
                className="flex items-center justify-center mb-4 h-16">
                <Link href="/">
                    {/* <x-application-logo
                className="block w-72 h-14 fill-current text-gray-800 dark:text-gray-200 logo dark:logo" /> */}

                    <div className="flex items-center justify-start">
                        {/* <Link href="https://flowbite.com" className="flex ml-2 md:mr-24"> */}
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-14 mr-3" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                        {/* </Link> */}
                    </div>
                </Link>
            </div>
            <ul className="space-y-2">
                <li>
                    <Link href="/profile" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/profile" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <FaUser />
                        <span className="ml-3">Profile</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/dashboard" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <MdDashboard />
                        <span className="ml-3">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/reminder" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/reminder" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <FaBell />
                        <span className="ml-3">Reminder</span>
                    </Link>
                </li>
                <li>
                    <Link href="/alert" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/alert" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <BiSolidAlarmAdd />
                        <span className="ml-3">Alert</span>
                    </Link>
                </li>
                <li>
                    <button type="button" className={"flex items-center w-full p-2 text-base text-gray-500 transition duration-75 rounded-lg group dark:text-white hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"}
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" aria-expanded={(pathname == "/patient" || pathname == "/patient/create" || pathname == "/patient/active" ? "true" : "false")}>
                        <FaCirclePlus />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Patient</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <ul id="dropdown-example" className={"py-2 space-y-2 " + (pathname == "/patient" || pathname == "/patient/create" || pathname == "/patient/active" ? "" : "hidden")}>
                        <li>
                            <Link href="/patient/create" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient/create" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                Add Patient
                            </Link>
                        </li>
                        <li>
                            <Link href="/patient" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                Patient List
                            </Link>
                        </li>
                        <li>
                            <Link href="/patient/active" className={"flex items-center w-full text-gray-500 p-1 transition duration-75 rounded-lg pl-10 group dark:text-white " + (pathname == "/patient/active" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                                Active Patients
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="/todo" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/todo" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <FaFileLines />
                        <span className="ml-3">To do / Wait List</span>
                    </Link>
                </li>
                <li>
                    <Link href="/mycalendar" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/mycalendar" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <FaCalendarDays />
                        <span className="ml-3">My Calendar</span>
                    </Link>
                </li>


                <li>
                    <Link href="/roles" className={"flex items-center p-2 text-gray-500 rounded-lg dark:text-white group " + (pathname == "/roles" ? "bg-theme-success-600 text-white" : "hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700")}>
                        <FaClipboardUser />
                        <span className="ml-3">Roles</span>
                    </Link>
                </li>
                <li>
                    <button onClick={() => { signOut(); }} type="button" className={"w-full flex items-center p-2 rounded-lg dark:text-white group bg-theme-danger-600 text-white"}>
                        <FaSignOutAlt />
                        <span className="ml-3">Sign Out</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};