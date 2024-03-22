import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    type: 'Reminder',
    title: 'Medication Reminder',
    start: todayStr
  },
  {
    id: createEventId(),
    type: 'To-Do',
    title: 'Health Task',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    type: 'WaitList',
    title: 'Patient 1 is waiting',
    start: todayStr + 'T13:00:00'
  },
  {
    id: createEventId(),
    type: 'Reminder',
    title: 'Excercise Reminder',
    start: todayStr + 'T14:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}