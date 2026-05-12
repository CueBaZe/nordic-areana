import 'temporal-polyfill/global';
import Calendar from "../components/calendar";
import type { CalendarEvent } from "../components/calendar";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Mainlayout from "../mainlayout";


export default function CalendarPage() {
    const today = Temporal.Now.plainDateISO().toString();
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [type, setType] = useState<string>('');

    const { user } = useAuth();
    const navigate = useNavigate()

    const handleDateChange = (date: string) => { //gets the selected date from calendar component
        setSelectedDate(date);
    };

    //Function that gets the timeslots from the backend
    useEffect(() => {

        if (!user) {
            navigate('/forbidden');
        }

        //Fetch sports here


        if (!type) {
            return;
        }

        const fetchTimeSlots = async () => {
            const result = await fetch(`http://127.0.0.1:8000/api/getTimeSlots?date=${selectedDate}&type=${type} `, {
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

            const data = await result.json();

            setEvents(data);
        }

        fetchTimeSlots();
    }, [selectedDate, type])

    return (
        <Mainlayout>
            <div className='flex flex-col gap-[30px]'>
                <select 
                    className='h-[40px] w-full max-w-[200px] border border-1 border-[#DBEAFE] rounded px-2'
                    value={type} onChange={(e) => {setType(e.target.value)}}
                >
                    <option value="" disabled>
                        Vælg en sport...
                    </option>
                    {/* Loop sport items here */}
                </select>
                <Calendar initialEvents={events} onDateChange={handleDateChange}/>
            </div>
        </Mainlayout>
    );
}