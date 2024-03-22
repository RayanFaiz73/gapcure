
'use client';

import { useEffect, useState } from 'react';
// import { Button, Modal, Tabs, TabsComponent } from 'flowbite-react';
// import { Button, Modal } from 'flowbite-react';
import { Tabs } from 'flowbite';
import type { TabsOptions, TabsInterface, TabItem } from 'flowbite';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import CreateToDo from './CreateToDo';
import CreateReminder from './CreateReminder';
import CreateRandomTask from './CreateRandomTask';
import CreateAlert from './CreateAlert';


const CalendarAddEvent = ({ showModal, hideModalCallback }: { showModal?: boolean; hideModalCallback?: (showModal: boolean) => void; }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalElement, setModalElement]: any = useState();
    // let modalElement: ModalInterface;

    useEffect(() => {


        const $modalElement: any = document.querySelector('#modalEl');

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
                const tabsElement: HTMLElement = document.getElementById('tabs-div') as HTMLElement;

                // create an array of objects with the id, trigger element (eg. button), and the content element
                const tabElements: TabItem[] = [
                    {
                        id: 'todo',
                        triggerEl: document.querySelector('#todo-tab-div') as HTMLElement,
                        targetEl: document.querySelector('#todo-div') as HTMLElement
                    },
                    {
                        id: 'reminder',
                        triggerEl: document.querySelector('#reminder-tab-div') as HTMLElement,
                        targetEl: document.querySelector('#reminder-div') as HTMLElement
                    },
                    {
                        id: 'alert',
                        triggerEl: document.querySelector('#alert-tab-div') as HTMLElement,
                        targetEl: document.querySelector('#alert-div') as HTMLElement
                    },
                    {
                        id: 'waitlist',
                        triggerEl: document.querySelector('#waitlist-tab-div') as HTMLElement,
                        targetEl: document.querySelector('#waitlist-div') as HTMLElement
                    },
                    {
                        id: 'random',
                        triggerEl: document.querySelector('#random-tab-div') as HTMLElement,
                        targetEl: document.querySelector('#random-div') as HTMLElement
                    }
                ];

                // options with default values
                const options: TabsOptions = {
                    defaultTabId: 'todo',
                    activeClasses: 'text-white bg-theme-success-600',
                    inactiveClasses: 'hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white',
                    onShow: () => {
                        // console.log('tab is shown');
                    }
                };

                /*
                * tabElements: array of tab objects
                * options: optional
                */
                const tabs: TabsInterface = new Tabs(tabsElement, tabElements, options);

                // open tab item based on id
                // tabs.show('registeration');
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
    const hideModal = () => {
        modalElement.hide()
        hideModalCallback?.(false)
    }


    return (
        <>
            <div id="modalEl" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full justify-end items-end flex">
                <div className="relative p-4 w-full max-w-6xl max-h-full ">
                    <div className="relative bg-theme-primary-500 text-gray-200 border rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold dark:text-white">
                                Events
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={hideModal} >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <div className="md:flex">
                                <ul className="flex-column md:w-1/5 space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0" id="tabs-div" role="tablist">
                                    <li className="inline-block w-full text-center px-8 py-3 text-white bg-theme-success-600 rounded-lg border active" 
                                        id="todo-tab-div" role="tab" aria-controls="todo-div" aria-selected="false">
                                            To do
                                    </li>
                                    <li className="inline-block w-full text-center px-8 py-3 rounded-lg border hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white"
                                        id="reminder-tab-div" role="tab" aria-controls="reminder-div" aria-selected="false">
                                            Reminder
                                    </li>
                                    <li className="inline-block w-full text-center px-8 py-3 rounded-lg border hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white"
                                        id="alert-tab-div" role="tab" aria-controls="alert-div" aria-selected="false">
                                            Alert
                                    </li>
                                    <li className="inline-block w-full text-center px-8 py-3 rounded-lg border hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white"
                                        id="waitlist-tab-div" role="tab" aria-controls="waitlist-div" aria-selected="false">
                                            Waitlist
                                    </li>
                                    <li className="inline-block w-full text-center px-8 py-3 rounded-lg border hover:text-gray-300 hover:bg-theme-primary-300 dark:hover:bg-theme-primary-600 dark:hover:text-white"
                                        id="random-tab-div" role="tab" aria-controls="random-div" aria-selected="false">
                                            Random
                                    </li>
                                </ul>
                                <div id="tabContentDiv" className="bg-theme-primary-500 border text-medium dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                                    <div className="hidden p-4 md:min-h-[26rem]" id="todo-div" role="tabpanel" aria-labelledby="todo-tab-div">
                                        <CreateToDo isWaitList={false} />
                                    </div>
                                    <div className="hidden p-4 md:min-h-[26rem]" id="reminder-div" role="tabpanel" aria-labelledby="reminder-tab-div">
                                        <CreateReminder />
                                    </div>
                                    <div className="hidden p-4 md:min-h-[26rem]" id="alert-div" role="tabpanel" aria-labelledby="alert-tab-div">
                                        <CreateAlert />
                                    </div>
                                    <div className="hidden p-4 md:min-h-[26rem]" id="waitlist-div" role="tabpanel" aria-labelledby="waitlist-tab-div">
                                        <CreateToDo isWaitList={true} />
                                    </div>
                                    <div className="hidden p-4 md:min-h-[26rem]" id="random-div" role="tabpanel" aria-labelledby="random-tab-div">
                                        <CreateRandomTask />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default CalendarAddEvent;