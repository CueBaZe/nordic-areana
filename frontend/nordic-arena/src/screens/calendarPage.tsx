import 'temporal-polyfill/global';
import Calendar, { type Court } from "../components/calendar";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Mainlayout from "../mainlayout";

interface sports {
    sport: string,
    desc: string,
}


export default function CalendarPage() {
    const today = Temporal.Now.plainDateISO().toString();
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [events, setEvents] = useState<Court[]>([]);
    const [type, setType] = useState<string>('');
    const [sports, setSports] = useState<sports[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { user } = useAuth();
    const navigate = useNavigate()

    const handleDateChange = (date: string) => { //gets the selected date from calendar component
        setSelectedDate(date);
    };

    // 1. Check Auth
    useEffect(() => {
        if (!user) {
            navigate('/forbidden');
        }
    }, [user, navigate]);

    // 2. Fetch Sports List (Only once on mount)
    useEffect(() => {
        const fetchSports = async () => {
            try {
                setLoading(true);
                const result = await fetch(`http://127.0.0.1:8000/api/getSports`);
                if (result.ok) {
                    const data = await result.json();
                    console.log(data)
                    setSports(data);
                }
            } catch (err) {
                console.error('Error fetching Sports', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSports();
    }, []);

    // 3. Fetch TimeSlots (When date or type changes)
    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (!type) return;

            try {
                const result = await fetch(
                    `http://127.0.0.1:8000/api/getTimeSlots?date=${selectedDate}&type=${type}`
                );
                if (result.ok) {
                    const data = await result.json();
                    setEvents(data);
                    console.log(data)
                }
            } catch (err) {
                console.error('Error fetching Timeslots', err);
            }
        };

        fetchTimeSlots();
    }, [selectedDate, type]);

    const selectedSportData = sports.find(s => s.sport === type);

    return (
        <Mainlayout>
            {!loading ? (
                <div className='flex flex-col gap-[30px]'>
                    <select 
                        className='text-[#0F176B] h-[40px] w-full max-w-[200px] border border-1 border-[#DBEAFE] rounded px-2'
                        value={type} onChange={(e) => {setType(e.target.value)}}
                    >
                        <option value="" disabled>
                            Vælg en sport...
                        </option>
                        {sports.map(sport => (
                            <option value={sport.sport} key={sport.sport}>
                                {sport.sport}
                            </option>
                        ))}
                    </select>
                    {selectedSportData && (
                        <div className='w-[300px] md:w-[500px]'>
                            <p className='text-[#0F176B]'>{selectedSportData.desc}</p>
                        </div>
                    )}
                    <Calendar initialEvents={events} onDateChange={handleDateChange}/>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 bg-[#E0F2FE]/50 border border-[#DBEAFE] rounded-xl p-8 min-h-[300px]">

                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DBEAFE] border-t-[#0F176B]" />

                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-lg font-medium text-[#0F176B] tracking-wide animate-pulse">
                            Vent venligst
                        </p>

                        <p className='text-sm font-medium text-[#0F176B] animate-pulse'>
                            Mens vi henter bane dataen
                        </p>
                    </div>
                </div>
            )}
        </Mainlayout>
    );
}