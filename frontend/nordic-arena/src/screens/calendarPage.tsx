import 'temporal-polyfill/global';
import Calendar, { type Court } from "../components/calendar";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Mainlayout from "../mainlayout";

interface Sports {
    sport: string;
    desc: string;
}

export default function CalendarPage() {
    const today = Temporal.Now.plainDateISO().toString();

    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [events, setEvents] = useState<Court[]>([]);
    const [type, setType] = useState<string>('');
    const [sports, setSports] = useState<Sports[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    // Check Auth
    useEffect(() => {
        if (!user) {
            navigate('/forbidden');
        }
    }, [user, navigate]);

    // Fetch Sports
    useEffect(() => {
        const fetchSports = async () => {
            try {
                setLoading(true);

                const result = await fetch(
                    'http://127.0.0.1:8000/api/getSports'
                );

                if (!result.ok) {
                    throw new Error('Failed to fetch sports');
                }

                const data = await result.json();
                setSports(data);

            } catch (err) {
                setError(`Error fetching sports: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchSports();
    }, []);

    // Fetch TimeSlots
    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (!type) return;

            try {
                const result = await fetch(
                    `http://127.0.0.1:8000/api/getTimeSlots?date=${selectedDate}&type=${type}`
                );

                if (!result.ok) {
                    throw new Error('Failed to fetch timeslots');
                }

                const data = await result.json();
                setEvents(data);

            } catch (err) {
                console.error('Error fetching timeslots', err);
                setError(`Error fetching timeslots: ${err}`);
            }
        };

        fetchTimeSlots();
    }, [selectedDate, type]);

    const selectedSportData = sports.find(
        (s) => s.sport === type
    );

    return (
        <Mainlayout>

            {/* Error State */}
            {error && (
                <div className="flex flex-col items-center justify-center gap-4 bg-[#E0F2FE]/50 border border-[#DBEAFE] rounded-xl p-8 min-h-[200px]">

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className="text-4xl font-medium text-red-600">
                            Fejl!
                        </p>

                        <p className='text-sm font-medium text-[#0F176B]'>
                            Data kunne ikke hentes. Tjek din internetforbindelse, og prøv igen.
                        </p>
                        <p className='text-sm font-medium text-[#0F176B]'>
                            Hvis dette ikke virker, kan du kontakte os via telefon eller mail.
                        </p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {!error && loading && (
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

            {/* Main Content */}
            {!error && !loading && (
                <div className='flex flex-col gap-[30px]'>

                    <select
                        className='text-[#0F176B] h-[40px] w-full max-w-[200px] border border-[#DBEAFE] rounded px-2'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>
                            Vælg en sport...
                        </option>

                        {sports.map((sport) => (
                            <option
                                value={sport.sport}
                                key={sport.sport}
                            >
                                {sport.sport}
                            </option>
                        ))}
                    </select>

                    {selectedSportData && (
                        <div className='w-[300px] md:w-[500px]'>
                            <p className='text-[#0F176B]'>
                                {selectedSportData.desc}
                            </p>
                        </div>
                    )}

                    <Calendar
                        initialEvents={events}
                        onDateChange={handleDateChange}
                    />
                </div>
            )}

        </Mainlayout>
    );
}