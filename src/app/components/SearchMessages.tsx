
'use client';
import { useState, useEffect } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoMdClose } from "react-icons/io";
import {  } from 'react-icons/fa';
import { reducerCases } from '../contexts/constants';
import { useStateProvider } from '../contexts/StateContext';
import { Message, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { calculateTime } from '@/utils/CalculateTime';
import MessageStatus from './MessageStatus';

const SearchMessages = ({ chatWith }: { chatWith: User | undefined;  }) => {
    const { data: session } = useSession();
    const [ { messages }, dispatch ] = useStateProvider();
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchedMessages, setSearchedMessages] = useState<Message[]>([])
    useEffect(() => {
      if(searchTerm){
        setSearchedMessages(
            messages.filter(
                (message : Message) =>
                    message.type === "text" && message.message.includes(searchTerm)
            )
        )
      } else {
        setSearchedMessages([]);
      }
    }, [searchTerm ])
    

    return (
            <div className="h-[72vh] overflow-x-hidden overflow-y-auto">
                <div className="flex items-center space-x-4 py-3 mb-1 sm:pb-4 border-gray-500 border-b">
                    <div className="flex w-full h-10 items-center gap-2">
                        <IoMdClose className="cursor-pointer text-2xl" onClick={() => dispatch({type:reducerCases.SET_MESSAGE_SEARCH})} />
                                <div className="flex items-center gap-5 px-3 py-1 flex-grow rounded-full bg-theme-primary-500">
                                <div className="flex flex-1">
                                    <input type="text" placeholder="Search here..."
                                        className="block w-full p-2 text-sm text-white bg-theme-primary-500 border-none focus:ring-0"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="right-0">
                                    <BiSearchAlt2 className="cursor-pointer text-xl" />
                                </div>
                                </div>
                        {/* <span>Search Messages</span> */}
                    </div>
                </div>
                <div className="flex flex-wrap flex-col justify-center gap-1 overflow-auto" >
                    <span className="mb-2 text-sm text-theme-secondary-50 bg-theme-secondary-900 rounded-lg py-1 w-full text-center">
                        {`Search for messages with ${chatWith?.firstName} ${chatWith?.lastName} `}
                    </span>
                </div>
                            <div className="flex flex-wrap flex-col justify-end gap-1 overflow-auto" >
                                {!searchTerm && !searchedMessages.length && (<span className="text-theme-secondary-700 w-full flex justify-center mt-[100px]"> Start Search by typing... </span>)}
                                {searchTerm && !searchedMessages.length && (<span className="text-theme-secondary-700 w-full flex justify-center mt-[100px]"> No messages found </span>)}
                                {searchedMessages.map((message: Message, index: any) => (
                                    <div key={index}
                                    className={`flex ${message.sender.id === session?.user.id ? "justify-end" : "justify-start"} `}>
                                        <div
                                        className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 
                                        ${message.sender.id == session?.user.id ? "bg-theme-primary-400" : "bg-theme-primary-300"}`}>
                                                <span className="break-all">
                                                    {message.message}
                                                </span>
                                                <div className="flex gap-1 items-end">
                                                    <span className="text-gray-500 text-[11px] pt-1 min-w-fit">
                                                        {
                                                            calculateTime(message.created_at)
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            message.sender.id === session?.user.id && <MessageStatus status={message.status} />
                                                        }
                                                    </span>
                                                </div>
                                        </div>
                                    </div>
                                )
                                )}

                            </div>
            </div>
    );
}


export default SearchMessages;