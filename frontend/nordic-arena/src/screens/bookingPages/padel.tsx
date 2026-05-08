import 'temporal-polyfill/global';
import Calendar from "../../components/calendar";
import type { CalendarEvent } from "../../components/calendar";
import { useEffect, useState } from 'react';


export default function Padel() {
    const today = Temporal.Now.plainDateISO().toString();
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const handleDateChange = (date: string) => { //gets the selected date from calendar component
        setSelectedDate(date);
    };

    //Function that gets the timeslots from the backend
    useEffect(() => {
        console.log('update with date:', selectedDate)
        const fetchTimeSlots = async () => {
            const result = await fetch(`http://127.0.0.1:8000/api/getTimeSlots?date=${selectedDate}&type=padel`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            if (!result.ok) {
                console.log('Error fetching Timeslots');
                return;
            }

            const data = await result.json()
            console.log("RAW API DATA:", data);

            //makes so it puts all the slots into the event useState
        }

        fetchTimeSlots();
    }, [selectedDate])

    return (
        <div>
            <Calendar initialEvents={events} onDateChange={handleDateChange}/>
        </div>
    );
}