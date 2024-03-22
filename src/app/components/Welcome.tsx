
'use client';
import StartSVG from "../../assets/start.svg";
import Image from 'next/image'
import { useSession } from "next-auth/react";

const Welcome = () => {

    const { data: session } = useSession();
    return (
        <div className="w-full lg:w-8/12 mb-3">
            <div className="flex flex-col justify-between bg-theme-primary-500 dark:bg-gray-800 text-white dark:text-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="bg-theme-primary-500 dark:bg-gray-800 text-gray-300 dark:text-white px-6 pt-6 py-4 font-medium">
                    <div className="">
                        <div className="flex flex-wrap flex-col text-gray-800 text-sm font-light my-2 " >
                            <div className="flex flex-col justify-center items-center">
                                <Image src={StartSVG} alt="" className="h-[60vh]" priority />
                                <h1 className="text-3xl text-white mt-4">
                                    Welcome, <span>{session?.user?.name}!</span>
                                </h1>
                                <h3 className="text-base text-white mt-1">Please select a chat to Start messaging.</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Welcome;