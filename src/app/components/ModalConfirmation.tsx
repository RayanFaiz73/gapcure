"use client";
import { Modal, ModalInterface, ModalOptions } from "flowbite";
import React, { useEffect, useState } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs"


const ModalConfirmation = ({showModal, hideModalCallback, confirmationCallback}:{showModal:boolean; hideModalCallback: (showModal:boolean) => void; confirmationCallback: (confirmDelete:boolean) => void;}) => {

    const [modalElement, setModalElement]: any = useState();
    useEffect(() => {


        const $modalElement: any = document.querySelector('#confirmationModal');

        const modalOptions: ModalOptions = {
            placement: 'bottom-right',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: false,
            onHide: () => {
                // console.log('modal is hidden');
            },
            onShow: () => {
                // console.log('modal is shown');
            },
            onToggle: () => {
                // console.log('modal has been toggled');
            },
        };


        const modal: ModalInterface = new Modal($modalElement, modalOptions);
        setModalElement(modal)
    }, []);

    if (showModal) {
        modalElement.show()
    }
    const confirm = () => {
        modalElement.hide();
        confirmationCallback(true)
    }
    const hideModal = () => {
        modalElement.hide();
        confirmationCallback(false)
    }

    return (
        <div id="confirmationModal" tabIndex={-1} className="hidden flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-theme-primary-500 border rounded-lg shadow">
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this chat?</h3>
                        <button
                            onClick={() => {
                                // handleClickDelete(title);
                                confirm();
                            }} 
                            type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={hideModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-theme-secondary-300 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;