import Mainlayout from "../mainlayout";
import { useAuth } from "../components/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookingItem {
    id: string;
    user_id: string;
    date: string;
    start_time: string;
    end_time: string;
    bane_id: string;
}

interface Bookings {
    today: BookingItem[];
    other: BookingItem[];
}

export default function BookingsPage() {

    const [ Bookings, setBookings ] = useState<Bookings[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/forbidden');
        } 

        const getBookings = async () => {
            const result = await fetch(`http://127.0.0.1:8000/api/getBookings/${user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
            });

            const data = await result.json();

            setBookings(data);

            console.log(data);

        }

        getBookings();
    }, []);

    return (
        <Mainlayout>
            <div>
                <div className="flex flex-col bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded-lg w-[300px] md:w-[450px] h-[500px]">
                    <div className="text-center bg-[#1E3A8A] rounded-t-lg p-2"> {/* Header */}
                        <h1 className="text-2xl text-white font-semibold">Dine Bookinger</h1>
                    </div>

                    <div>
                        {/* Loop trough bookings here */}
                    </div>
                </div>
            </div>
        </Mainlayout>
    );
}   