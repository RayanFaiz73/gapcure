'use client'
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaFilePdf, FaFlag, FaMinus, FaPlus, FaTrash, FaTrashCan, FaUser } from "react-icons/fa6";
import { patientCreateSchema } from "./validation";
import Select from 'react-select';
import CreateToDo from "./CreateToDo";
import Datepicker from "tailwind-datepicker-react"

// import Datepicker from "react-tailwindcss-datepicker";
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { Menu } from "@headlessui/react";
import { Float } from "@headlessui-float/react";
import { IoFilterCircle } from "react-icons/io5";
import "./CreatePatient.css";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_PATIENT } from "@/utils/ApiRoutes";

interface careTeam {
    readonly value: number;
    readonly label: string;
    readonly color?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

const careTeams: readonly careTeam[] = [
    { label: "Caretaker 1", value: 1 },
    { label: "Caretaker 2", value: 2 },
    { label: "Caretaker 3", value: 3 },
    { label: "Nurse 1", value: 4 },
    { label: "Nurse 2", value: 5 },
    { label: "Doctor", value: 6 }
];

const CreatePatient = () => {

    const id = Date.now().toString();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    useEffect(() => setIsMounted(true), []);
    useEffect(() => {
        var element: HTMLElement = document.getElementById('date') as HTMLElement;
        var bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offsetRemaining   = elemRect.top - bodyRect.top;
        setOffset(Number(offsetRemaining));
    }, []);

    const { data: session, status, update: sessionUpdate } = useSession()
    const axiosAuth = useAxiosAuth();
    const newPatientOptions = { resolver: yupResolver(patientCreateSchema) };
    const { control, register: newPatient, formState: { errors: newPatientErrors }, reset: patientFormReset, handleSubmit: submitNewPatient, setValue: setNewPatient } = useForm(newPatientOptions);

    const { remove: removeMadicalReportValue } = useFieldArray({
        control,
        name: "medicalReports"
    });
    const { remove: removeReminderValue } = useFieldArray({
        control,
        name: "reminder"
    });
    const { remove: removeAlertValue } = useFieldArray({
        control,
        name: "alert"
    });

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([{ value: "", label: "" }])

    let careTeamChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
        setNewPatient("careTeam", selectedOptions);
    }
    const [medicalReportValues, setMedicalReportValues] = useState([{ name: "" }])
    const [reminderValues, setReminderValues] = useState([{ name: "", date: "", time: "" }])
    const [alertValues, setAlertValues] = useState([{ name: "", date: "", time: "" }])

    let addMedicalReportFormFields = () => {
        setMedicalReportValues([...medicalReportValues, { name: "" }])
    }

    let removeMedicalReportFormFields = (i: any) => {
        removeMadicalReportValue(i);
        let newCareTeamValues = [...medicalReportValues];
        newCareTeamValues.splice(i, 1);
        setMedicalReportValues(newCareTeamValues)
    }

    // let handleReminderChange = (i :any, e :any) => {
    //     let newCareTeamValues :any = [...medicalReportValues];
    //     newCareTeamValues[i][e.target.name] = e.target.value;
    //     setMedicalReportValues(newCareTeamValues);
    //  }

    let addReminderFormFields = () => {
        setReminderValues([...reminderValues, { name: "", date: "", time: "" }])
    }

    let removeReminderFormFields = (i: any) => {
        removeReminderValue(i);
        let newReminderValues = [...reminderValues];
        newReminderValues.splice(i, 1);
        setReminderValues(newReminderValues)
    }


    let addAlertFormFields = () => {
        setAlertValues([...alertValues, { name: "", date: "", time: "" }])
    }

    let removeAlertFormFields = (i: any) => {
        removeAlertValue(i);
        let newAlertValues = [...alertValues];
        newAlertValues.splice(i, 1);
        setAlertValues(newAlertValues)
    }

    // const photoPickerChange = async (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    //     let fileInput = e.target as HTMLInputElement;
    //     if (!fileInput.files) return;
    //     try {
    //         const file = fileInput?.files[0];
    //         const formData = new FormData();
    //         formData.append("room_id", currentRoom.id)
    //         formData.append("file", file)
    //         const { data } = await axiosAuth.post(SEND_MESSAGE, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });
    //     } catch (error: any) {
    //         if (axios.isAxiosError(error)) {
    //             if (error.response?.data?.errors?.length > 0) {
    //                 toast.error(error.response?.data?.errors[0],{
    //                     style: {
    //                     borderRadius: '10px',
    //                     background: '#333',
    //                     color: '#fff',
    //                     },
    //                 });
    //             }
    //             toast.error(error.response?.data.message,{
    //                 style: {
    //                 borderRadius: '10px',
    //                 background: '#333',
    //                 color: '#fff',
    //                 },
    //             });
    //         } else {
    //             toast.error(error.message,{
    //                 style: {
    //                 borderRadius: '10px',
    //                 background: '#333',
    //                 color: '#fff',
    //                 },
    //             });
    //         }
    //     }
    // }
    const onSubmitNewPatient = async (data: FormEvent<HTMLFormElement> | any) => {
        try {
            console.log(data);
            console.log(data?.medicalReports?.files)
            console.log(data?.medicalReports)

            // const file = data?.medicalReports?.files[0];
            const medicalReports = data?.medicalReports;
            const formData = new FormData();
            for (var x = 0; x < data?.medicalReports.length; x++) {
                formData.append("medicalReports", data?.medicalReports[x][0]);
            }
            formData.append("address", data.address)
            formData.append("alert", data.alert)
            formData.append("anotherAddress", data.anotherAddress)
            formData.append("assignee", data.assignee)
            formData.append("careTeam", JSON.stringify(data.careTeam))
            formData.append("date", data.date)
            formData.append("details", data.details)
            formData.append("dob", data.dob)
            formData.append("medicalReports", medicalReports)
            formData.append("name", data.name)
            formData.append("priority", data.priority)
            formData.append("reminder", data.reminder)
            formData.append("task", data.task)
            const res = await axiosInstance.post(CREATE_PATIENT, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success(res?.data?.message);
            console.log(res);
            // patientFormReset();
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors?.length > 0) {
                    toast.error(error.response?.data?.errors[0], {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
                toast.error(error.response?.data.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error(error.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        }
    }
    const [show, setShow] = useState<boolean>(false)
    // const [defaultDate, setDefaultDate] = useState<Date | null>(null)
    const [defaultDate, setDefaultDate] = useState<Date>(new Date())
    const [assignee, setAssignee] = useState(0);
    // const [patient, setPatient] = useState(0);
    const [priorityData, setPriorityData] = useState<any>({
        id: null,
        name: null
    });
    const [assigneeData, setAssigneeData] = useState<any>({
        id: null,
        name: null,
        icon: null
    });
    const [priority, setPriority] = useState("");

    const handleChange = (selectedDate: Date) => {
        setDefaultDate(selectedDate)
    }
    const handleClose = (state: boolean) => {
        setShow(state)
    }

    const options: IOptions = {
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        minDate: new Date("2023-01-01"),
        theme: {
            background: "bg-theme-primary-400 dark:bg-gray-800",
            todayBtn: "bg-theme-primary-600 hover:bg-theme-primary-800",
            clearBtn: "",
            icons: "",
            text: "text-white hover:bg-theme-primary-600",
            disabledText: "",
            input: "bg-theme-primary-500 text-white placeholder:text-gray-300",
            inputIcon: "text-gray-300",
            selected: "bg-theme-primary-600",
        },
        datepickerClassNames: `absolute top-[${offset}px] mb-6 pb-6`,
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Due Date",
        inputDateFormatProp: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    }

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    }
    const assigneeList = [
        { id: -1, name: 'Myself', icon: <FaUser /> },
        { id: 0, name: 'WaitList', icon: <IoFilterCircle /> },
        { id: 1, name: 'Patient 1' },
        { id: 2, name: 'Patient 2' },
        { id: 3, name: 'Patient 3' },
    ]
    const priorityList = [
        { value: "Low", name: "Low", color: "theme-danger" },
        { value: "Medium", name: "Medium", color: "green" },
        { value: "High", name: "High", color: "theme-warning" },
    ]

    useEffect(() => {
        setNewPatient("date", defaultDate);
        setNewPatient("assignee", assignee);
        setNewPatient("priority", priority);
        if (assignee || assignee == 0) {
            let assigneeObject = assigneeList.find(obj => obj.id === assignee);
            setAssigneeData(assigneeObject);
        }
        if (priority) {
            let priorityObject = priorityList.find(obj => obj.value === priority);
            setPriorityData(priorityObject);
        }
    }, [setNewPatient, defaultDate, assignee, priority]);

    
    return (

        <div className="flex flex-wrap mb-6">

            <div className="w-full mb-3">
                <div className="bg-theme-primary-500 rounded-lg dark:bg-gray-800">

                    <form onSubmit={submitNewPatient(onSubmitNewPatient)}>
                        <div className="p-6">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="namePatient">
                                        Patient Name
                                    </label>
                                    <input
                                        {...newPatient("name")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Patient Name"
                                        id="namePatient"
                                        type="text"

                                    />
                                    <div className="text-red-500 ml-2 mt-2">{newPatientErrors.name?.message}</div>
                                </div>
                                <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="dobPatient">
                                        Date of Birth
                                    </label>
                                    <input
                                        {...newPatient("dob")}
                                        className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                        placeholder="Patient Date"
                                        id="dobPatient"
                                        type="date"

                                    />
                                    <div className="text-red-500 ml-2 mt-2">{newPatientErrors.dob?.message}</div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="addressPatient">
                                        Patient Address
                                    </label>

                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                            <input
                                                {...newPatient("address")}
                                                className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                placeholder="write adress"
                                                id="addressPatient"
                                                type="text"

                                            />
                                            <div className="text-red-500 ml-2 mt-2">{newPatientErrors.address?.message}</div>
                                        </div>
                                        <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-3">
                                            <input
                                                {...newPatient("anotherAddress")}
                                                className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                placeholder="write another address"
                                                id="anotherAddressPatient"
                                                type="text"

                                            />
                                            <div className="text-red-500 ml-2 mt-2">{newPatientErrors.anotherAddress?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="detailsPatient">
                                        Patient Details & Documentations
                                    </label>
                                    <textarea
                                        {...newPatient("details")}
                                        className="block w-full px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300 resize-none"
                                        placeholder="write a random task here"
                                        id="detailsPatient"

                                        rows={6}
                                    ></textarea>
                                    <div className="text-red-500 ml-2 mt-2">{newPatientErrors.details?.message}</div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3 mt-5">
                                    <div className="flex uppercase text-white text-xl font-medium">
                                        ADD MEDICAL RECORDS
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="detailsPatient">
                                        Medical Reports
                                    </label>

                                    {medicalReportValues.map((element, index) => (

                                        <div className="flex flex-wrap -mx-3" key={index}>
                                            <div className="w-10/12 lg:w-11/12 px-3 mb-6 lg:mb-3">
                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor={"medical-reports-" + index} className="flex flex-col items-center justify-center w-full border rounded-lg cursor-pointer bg-theme-primary-600 hover:bg-theme-primary-700">
                                                        <div className="flex justify-center py-3">
                                                            <FaFilePdf className="mx-2" />
                                                            <p className="text-sm text-gray-300 font-thin">
                                                                Upload PDF
                                                            </p>
                                                        </div>
                                                        <input
                                                            // {...newPatient("medicalReports")} 
                                                            {...newPatient(`medicalReports.${index}`)}
                                                            id={"medical-reports-" + index}
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="w-1/12 px-3 mb-6 lg:mb-3">
                                                {
                                                    index ?
                                                        <button onClick={() => removeMedicalReportFormFields(index)}
                                                            type="button"
                                                            className="p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-danger-600 rounded-full hover:bg-theme-danger-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaTrashCan className="text-xl" />
                                                        </button>
                                                        :
                                                        <button onClick={() => addMedicalReportFormFields()}
                                                            type="button"
                                                            className="p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaPlus className="text-xl" />
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3 mt-5">
                                    <div className="flex uppercase text-white text-xl font-medium">
                                        SELECTING PATIENT CARE TEAM
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    <label className="block mb-2 text-sm font-extralight text-gray-300"
                                        htmlFor="detailsPatient">
                                        Care Team
                                    </label>
                                    {isMounted &&
                                        <Select
                                            id={id}
                                            classNames={{
                                                control: (state) => {
                                                    let defaultClasses = "block w-full h-14 px-4 py-2 mb-2 text-gray-200 bg-theme-primary-400 border"
                                                    if (state.isFocused) {

                                                    }
                                                    return defaultClasses;
                                                }
                                            }}
                                            classNamePrefix="react-select"
                                            options={careTeams}
                                            closeMenuOnSelect={false}
                                            isClearable={isClearable}
                                            // isSearchable={isSearchable}
                                            // components={{ IndicatorSeparator }}
                                            isMulti
                                            onChange={careTeamChange}

                                        />
                                    }
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3 mt-5">
                                    <div className="flex uppercase text-white text-xl font-medium">
                                        ADD REMINDER
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    {reminderValues.map((element, reminderIndex) => (

                                        <div className="flex flex-wrap -mx-3" key={reminderIndex}>
                                            <div className="w-full lg:w-5/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"reminder-name-" + reminderIndex}>
                                                    Reminder Name
                                                </label>
                                                <input
                                                    {...newPatient(`reminder.${reminderIndex}.name`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Reminder Name"
                                                    id={"reminder-name-" + reminderIndex}
                                                    type="text"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.reminder?.[reminderIndex]?.name?.message}</div>
                                            </div>
                                            <div className="w-5/12 lg:w-3/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"reminder-date-" + reminderIndex}>
                                                    Date
                                                </label>
                                                <input
                                                    {...newPatient(`reminder.${reminderIndex}.date`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Reminder Date"
                                                    id={"reminder-date-" + reminderIndex}
                                                    type="date"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.reminder?.[reminderIndex]?.date?.message}</div>
                                            </div>
                                            <div className="w-5/12 lg:w-3/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"reminder-time-" + reminderIndex}>
                                                    Time
                                                </label>
                                                <input
                                                    {...newPatient(`reminder.${reminderIndex}.time`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Reminder Time"
                                                    id={"reminder-time-" + reminderIndex}
                                                    type="time"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.reminder?.[reminderIndex]?.time?.message}</div>
                                            </div>
                                            <div className="w-2/12 lg:w-1/12 px-3 mb-6 lg:mb-3 flex items-center">
                                                {
                                                    reminderIndex ?
                                                        <button onClick={() => removeReminderFormFields(reminderIndex)}
                                                            type="button"
                                                            className="mt-4 p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-danger-600 rounded-full hover:bg-theme-danger-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaTrashCan className="text-xl" />
                                                        </button>
                                                        :
                                                        <button onClick={() => addReminderFormFields()}
                                                            type="button"
                                                            className="mt-4 p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaPlus className="text-xl" />
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3 mt-5">
                                    <div className="flex uppercase text-white text-xl font-medium">
                                        ADD ALERT
                                    </div>
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3">
                                    {alertValues.map((element, alertIndex) => (

                                        <div className="flex flex-wrap -mx-3" key={alertIndex}>
                                            <div className="w-full lg:w-3/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"alert-name-" + alertIndex}>
                                                    Alert Name
                                                </label>
                                                <input
                                                    {...newPatient(`alert.${alertIndex}.name`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Alert Name"
                                                    id={"alert-name-" + alertIndex}
                                                    type="text"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.alert?.[alertIndex]?.name?.message}</div>
                                            </div>
                                            <div className="w-5/12 lg:w-3/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"alert-date-" + alertIndex}>
                                                    Date
                                                </label>
                                                <input
                                                    {...newPatient(`alert.${alertIndex}.date`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Alert Date"
                                                    id={"alert-date-" + alertIndex}
                                                    type="date"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.alert?.[alertIndex]?.name?.message}</div>
                                            </div>
                                            <div className="w-5/12 lg:w-3/12 px-3 mb-6 lg:mb-3">
                                                <label className="block mb-2 text-sm font-extralight text-gray-300"
                                                    htmlFor={"alert-time-" + alertIndex}>
                                                    Time
                                                </label>
                                                <input
                                                    {...newPatient(`alert.${alertIndex}.time`)}
                                                    className="block w-full h-14 px-4 py-2 text-gray-200  bg-theme-primary-400 border rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-theme-primary-50 focus:border-theme-success-400 focus:ring-opacity-40 dark:focus:border-theme-success-300 focus:outline-none focus:ring focus:ring-theme-success-300"
                                                    placeholder="Alert Time"
                                                    id={"alert-time-" + alertIndex}
                                                    type="time"

                                                />
                                                <div className="text-red-500 ml-2 mt-2">{newPatientErrors.alert?.[alertIndex]?.name?.message}</div>
                                            </div>
                                            <div className="w-2/12 lg:w-1/12 px-3 mb-6 lg:mb-3 flex items-center">
                                                {
                                                    alertIndex ?
                                                        <button onClick={() => removeAlertFormFields(alertIndex)}
                                                            type="button"
                                                            className="mt-4 p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-danger-600 rounded-full hover:bg-theme-danger-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaTrashCan className="text-xl" />
                                                        </button>
                                                        :
                                                        <button onClick={() => addAlertFormFields()}
                                                            type="button"
                                                            className="mt-4 p-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                                            <FaPlus className="text-xl" />
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full px-3 mb-6 lg:mb-3 mt-5">
                                    <div className="flex uppercase text-white text-xl font-medium">
                                        ADD TASK
                                    </div>

                                    <div className="w-full mb-4  ">
                                        <div className="p-6 rounded-t-lg">
                                            <label htmlFor="taskToDo" className="sr-only">Task Name</label>
                                            <textarea
                                                {...newPatient("task")}
                                                className="w-full px-0 text-2xl text-gray-100 border-0 focus:ring-0 dark:text-white bg-theme-primary-500 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                                                placeholder="Task Name ..."
                                                id="taskToDo"
                                                rows={4}
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-start px-3 py-2 mb-6">

                                            <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                                                <Datepicker classNames="" options={options} onChange={handleChange} show={show} setShow={handleClose} />

                                                {/* <Datepicker 
                                                    inputClassName={"w-full bg-theme-primary-500 border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500"}
                                                    containerClassName="bg-theme-primary-500 mt-8" 
                                                    primaryColor={"indigo"} 
                                                    useRange={false} 
                                                    asSingle={true} 
                                                    value={value} 
                                                    onChange={handleValueChange} 
                                                />  */}
                                            </div>

                                            <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                                                <Menu>
                                                    <Float placement="bottom-end" offset={15} adaptiveWidth={true} >
                                                        <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                                            <span className="sr-only">Open user menu</span>
                                                            <FaFlag className="me-2" />
                                                            {(priorityData.name) ? (<> {priorityData.name} </>) : (<> Priority </>)}
                                                        </Menu.Button>

                                                        <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                                            <Menu.Item>
                                                                <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">

                                                                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200 text-center" aria-labelledby="patientButton">
                                                                        {priorityList.map((val) => (
                                                                            <Menu.Item key={val.value} as={Fragment}>
                                                                                {() => (
                                                                                    <li onClick={() => setPriority(val.value)}>
                                                                                        <div className={`bg-${val.color}-100 text-${val.color}-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-${val.color}-400 border border-${val.color}-400`}>
                                                                                            {val.name}
                                                                                        </div>
                                                                                    </li>
                                                                                )}
                                                                            </Menu.Item>
                                                                        ))}
                                                                        {/* <li onClick={ () => setPriority("High") }>
                                                                            <div className="bg-theme-danger-100 text-theme-danger-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-danger-400 border border-theme-danger-400">High</div>
                                                                        </li>
                                                                        <li onClick={ () => setPriority("Medium") }>
                                                                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">Medium</div>
                                                                        </li>
                                                                        <li onClick={ () => setPriority("Low") }>
                                                                            <div className="bg-theme-warning-100 text-theme-warning-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-theme-warning-400 border border-theme-warning-400">Low</div>
                                                                        </li> */}
                                                                    </ul>
                                                                </div>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Float>
                                                </Menu>
                                            </div>

                                            <div className="flex w-full md:mx-4 md:my-2 py-2 md:w-1/5">
                                                <Menu>
                                                    <Float placement="bottom-end" offset={15} adaptiveWidth={true}>
                                                        <Menu.Button className="w-full px-5 py-2 text-center inline-flex items-center border border-gray-300 text-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:bg-theme-primary-500">
                                                            <span className="sr-only">Open user menu</span>
                                                            {(assigneeData.name) ? (<> {assigneeData.name} </>) : (<> Myself </>)}
                                                            <svg className="w-2.5 h-2.5 ms-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                            </svg>
                                                        </Menu.Button>

                                                        <Menu.Items className="bg-theme-primary-500 border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
                                                            <div className="px-4 py-3 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="patientButton">
                                                                    {assigneeList.map((val) => (
                                                                        <Menu.Item key={val.id} as={Fragment}>
                                                                            {() => (
                                                                                <li onClick={() => setAssignee(val.id)}>
                                                                                    <div className="text-gray-300 py-1  text-center inline-flex items-center">
                                                                                        {val.icon && <div className="me-2">{val.icon}</div>}
                                                                                        {val.name}
                                                                                    </div>
                                                                                </li>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </Menu.Items>
                                                    </Float>
                                                </Menu>
                                                {/* <div className="text-red-500 ml-2 mt-2">{newToDoErrors.assignee?.message}</div> */}
                                            </div>
                                        </div>
                                        <div className="text-red-500 ml-2 mt-2">{newPatientErrors.task?.message}</div>
                                        <div className="text-red-500 ml-2 mt-2">{newPatientErrors.date?.message}</div>
                                        <div className="text-red-500 ml-2 mt-2">{newPatientErrors.priority?.message}</div>
                                        <div className="text-red-500 ml-2 mt-2">{newPatientErrors.assignee?.message}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pb-4 ">
                            <button
                                type="submit"
                                className="mx-10 px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-theme-success-600 rounded-full hover:bg-theme-success-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreatePatient;