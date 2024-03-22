"use client";
import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs"


const MessageStatus = ({status}:{status:string}) => {
    return (
        <>
            { status === "sent" && <BsCheck className="text-lg" /> }
            { status === "delivered" && <BsCheckAll className="text-lg" /> }
            { status === "read" && <BsCheckAll className="text-lg text-theme-success-300" /> }
        </>
    );
};

export default MessageStatus;