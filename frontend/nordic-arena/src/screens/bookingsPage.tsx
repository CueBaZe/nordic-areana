import Mainlayout from "../mainlayout";
import { useAuth } from "../components/authContext";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface BookingItem {
    id: string;
    title: string;
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

    const [ Bookings, setBookings ] = useState<Bookings | null>(null);
    const [ selectedBooking, setSelectedBooking ] = useState<BookingItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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

        }

        getBookings();
    }, [user, navigate, selectedBooking]);

    const handleCancelBooking = async (courtId: string) => {
        try {
            setLoading(true);
            const result = await fetch(`http://127.0.0.1:8000/api/cancelBooking/${user?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    'courtId': courtId,
                }),
            });

            const data = await result.json();

            if (!data.ok) {
                setSelectedBooking(null);   
            }

            setSelectedBooking(null);

        } catch (err) {
            console.error('Error canceling the booking', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Mainlayout>
            <div className="flex flex-col md:flex-row gap-[25px] justify-center items-center">
                <div className="flex flex-col bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded-lg w-[300px] md:w-[450px] h-[500px] overflow-y-auto">
                    <div className="text-center bg-[#1E3A8A] rounded-t-lg p-2"> {/* Header */}
                        <h1 className="text-2xl text-white font-semibold">Dine Bookinger</h1>
                    </div>

                    <div>
                        {Bookings?.today && Bookings.today.length > 0 && ( // Todays bookings
                            <div className="flex flex-col p-4 gap-2">
                                <h1 className="text-[#0F176B] text-lg">Idag:</h1>
                                {Bookings.today.map(booking =>
                                    <div onClick={() => setSelectedBooking(booking)} className="flex flex-row bg-[#BEE3FC] rounded-lg  justify-between p-2 transition duration-300 hover:scale-105 cursor-pointer" key={booking.id}>
                                        <p className="text-[#0F176B] font-semibold text-sm md:text-md">{booking.title}</p>
                                        <div className="flex flex-row gap-[10px]">
                                            <p className="text-[#0F176B] text-xs md:text-sm">{booking.date}</p>
                                            <p className="text-[#0F176B] text-xs md:text-sm">{booking.start_time} - {booking.end_time}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {Bookings?.other && Bookings.other.length > 0 && ( // Other bookings 
                            <div className="flex flex-col p-4 gap-2">
                                <h1 className="text-[#0F176B] text-lg">Andre dage:</h1>
                                {Bookings.other.map(booking =>
                                    <div onClick={() => setSelectedBooking(booking)} className="flex flex-row bg-[#BEE3FC] rounded-lg  justify-between p-2 transition duration-300 hover:scale-105 cursor-pointer" key={booking.id}>
                                        <p className="text-[#0F176B] font-semibold text-sm md:text-md">{booking.title}</p>
                                        <div className="flex flex-row gap-[10px]">
                                            <p className="text-[#0F176B] text-xs md:text-sm">{booking.date}</p>
                                            <p className="text-[#0F176B] text-xs md:text-sm">{booking.start_time} - {booking.end_time}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {selectedBooking && ( //Modal shown when a booking is clicked
                    <div className="flex flex-col items-center bg-[#E0F2FE] border border-1 border-[#DBEAFE] rounded-lg w-[300px] h-[250px]">
                        <div className="text-center relative bg-[#1E3A8A] rounded-t-lg p-2 w-full"> {/* Header */}
                            <h1 className="text-2xl text-white font-semibold">{selectedBooking.title}</h1>
                            <div className="absolute top-1 right-2">
                                <MdClose onClick={() => setSelectedBooking(null)} size={20} color="#EF5350"/>
                            </div>
                        </div>

                        <div className="m-2 text-center flex flex-col gap-[20px]">
                            <p className="text-[#0F176B] text-lg">Start: {selectedBooking.start_time}</p>
                            <p className="text-[#0F176B] text-lg">Slut: {selectedBooking.end_time}</p>
                            <p className="text-[#0F176B] text-lg">Dato: {selectedBooking.date}</p>
                        </div>

                        {/* Button to cancel */}
                        {loading ? (
                            <button className="mt-3 bg-red-200 rounded-lg p-1 text-white text-lg transition duration-300 animate-pulse hover:scale-110 cursor-pointer">Loading..</button>
                        ) : (
                            <button onClick={() => handleCancelBooking(selectedBooking.id)} className="mt-3 bg-red-400 rounded-lg p-1 text-white text-lg transition duration-300 hover:scale-110 cursor-pointer">Afmeld</button>
                        )}
                    </div>
                )}
            </div>
        </Mainlayout>
    );
}   