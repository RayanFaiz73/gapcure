'use client';
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate } from "@fullcalendar/core";
// import { v4 as uuid } from "uuid";
import { INITIAL_EVENTS, createEventId } from './event-utils'
import CalendarAddEvent from "../components/CalendarAddEvent";
import useScreenSize from "@/lib/hooks/useScreenSize";
import "./style.css";


export default function Form() {
    const screenSize = useScreenSize();
    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false);
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [events, setEvents]: any = useState([]);
    const [currentEvents, setCurrentEvents]: any = useState([]);

    useEffect(() => {
        // if(screenSize[0] <= 640){
        if(screenSize.width && screenSize.width <= 640){
            var x = document.getElementsByClassName('fc-header-toolbar');
            var i;
            for (i = 0; i < x.length; i++) 
            {
                x[i].classList.add('flex-col','space-y-2');
            }
        }
        else {
            var x = document.getElementsByClassName('fc-header-toolbar');
            var i;
            for (i = 0; i < x.length; i++) 
            {
                x[i].classList.remove('flex-col','space-y-2');
            }

        }
    }, [screenSize]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setShowModal(true)
        // let title = prompt('Please enter a new title for your event')
        // let calendarApi = selectInfo.view.calendar

        // calendarApi.unselect() // clear date selection

        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        // }
    }
    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events)
    }


    const renderSidebar = () => {

        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }
    
    const moreLinkClassNames = (args: { num: number; }) => {
        if(screenSize.width && screenSize.width <= 640){
            return [];
        }
        return [];
    }
    const moreLinkContent = (args: { num: number; }) => {
        if(screenSize.width && screenSize.width <= 640){
            return { html: '<span class="bg-theme-primary-100 flex justify-center items-center text-center" style="height: 20px; width: 20px; border-radius: 50%;">'+args.num+'</span>'}
            // return ;
            return '+'+args.num;
        }
        return { html: '<span class="flex justify-center items-center text-center"><span class="bg-theme-warning-100 m-1" style="height: 8px; width: 8px; border-radius: 50%;"></span><span class="flex text-xs font-extralight italic">'+args.num+' more </span></span>'}
        return '+'+args.num+' more';
    }

    return (
        <>
            <div className="py-6 text-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">

                        {/* <div className="w-full lg:w-3/12 mb-3 p-2">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="p-4">
                                    {renderSidebar()}
                                </div>
                            </div>
                        </div> */}
                        <div className="w-full mb-3 p-2">
                            <div className="bg-theme-primary-500 rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="p-4">
                                    <FullCalendar
                                        events={events}
                                        headerToolbar={{
                                            start: "prev,next today",
                                            center: 'title',
                                            end: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                                        }}
                                        plugins={[daygridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
                                        //   views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                                        loading={e => setLoading(e)}
                                        editable={false}
                                        selectable={true}
                                        dragScroll={false}
                                        selectMirror={true}
                                        dayMaxEvents={(screenSize.width && screenSize.width <= 640) ? true : 1}
                                        // moreLinkContent={(screenSize.width && screenSize.width <= 640) ? '*' : "and more"}
                                        moreLinkContent={moreLinkContent}
                                        moreLinkClassNames={moreLinkClassNames}
                                        eventMaxStack={1}
                                        dayMaxEventRows={1}
                                        weekends={weekendsVisible}
                                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed

                                        select={handleDateSelect}
                                        eventContent={renderEventContent} // custom render function
                                        eventClick={handleEventClick}
                                        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                                    /* you can update a remote database when these fire:
                                    eventAdd={function(){}}
                                    eventChange={function(){}}
                                    eventRemove={function(){}}
                                    */
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CalendarAddEvent showModal={showModal} hideModalCallback={setShowModal} />
        </>
    );


}


// export function renderSidebar() {

//     return (
//         <div className='demo-app-sidebar'>
//           <div className='demo-app-sidebar-section'>
//             <h2>Instructions</h2>
//             <ul>
//               <li>Select dates and you will be prompted to create a new event</li>
//               <li>Drag, drop, and resize events</li>
//               <li>Click an event to delete it</li>
//             </ul>
//           </div>
//           <div className='demo-app-sidebar-section'>
//             <label>
//               <input
//                 type='checkbox'
//                 checked={weekendsVisible}
//                 onChange={handleWeekendsToggle}
//               ></input>
//               toggle weekends
//             </label>
//           </div>
//           <div className='demo-app-sidebar-section'>
//             <h2>All Events ({currentEvents.length})</h2>
//             <ul>
//               {currentEvents.map(renderSidebarEvent)}
//             </ul>
//           </div>
//         </div>
//       )
// }


// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
    let color = 'border-theme-primary-100';
    if(eventInfo.event.extendedProps.type == 'Reminder'){
        color = 'border-theme-primary-100';
    } else if (eventInfo.event.extendedProps.type == 'To-Do'){
        color = 'border-theme-warning-100';
    } else if (eventInfo.event.extendedProps.type == 'WaitList'){
        color = 'border-theme-secondary-100';
    }
    return (
        <>
            {/* <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i> */}
            <div className={"fc-daygrid-event-dot "+ color}></div>
            <div>
                <div className="fc-event-time">{eventInfo.event.extendedProps.type} {eventInfo.timeText}</div>
                <div className="fc-event-title">{eventInfo.event.title}</div>
            </div>
        </>
    )
}

function renderSidebarEvent(event: EventApi) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}