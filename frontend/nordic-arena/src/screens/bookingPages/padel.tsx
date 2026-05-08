import 'temporal-polyfill/global';
import Calendar from "../../components/calendar";
import type { CalendarEvent } from "../../components/calendar";
import { useEffect, useState } from 'react';


export default function Padel() {
    const today = Temporal.Now.plainDateISO().toString();
    const [selectedDate, setSelectedDate] = useState<string>(today);

    const handleDateChange = (date: string) => { //gets the selected date from calendar component
        setSelectedDate(date);
    };

    //Function that gets the timeslots from the backend
    useEffect(() => {
        console.log('update with date:', selectedDate)
        //fetch timeslots from backend
    }, [selectedDate])


    const eventsFromDB = [
        { id: '1', title: 'Paddle', start: '2026-05-08 12:00', end: '2026-05-08 13:00', available: false },
        { id: '2', title: 'Paddle', start: '2026-05-08 12:00', end: '2026-05-08 13:00', available: true }
    ];

    const formattedEvents: CalendarEvent[] = eventsFromDB.map(event => ({ //converts the time objects into the right format
    ...event,
    start: Temporal.ZonedDateTime.from(`${event.start}[UTC]`), 
    end: Temporal.ZonedDateTime.from(`${event.end}[UTC]`)
    }));

    return (
        <div>
            <Calendar initialEvents={formattedEvents} onDateChange={handleDateChange}/>
        </div>
    );
}