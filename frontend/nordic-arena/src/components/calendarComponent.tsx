    import type { CalendarEvent } from "@schedule-x/calendar";
    import { MdClose } from "react-icons/md";
    import { createEventModalPlugin } from '@schedule-x/event-modal'
    import { useAuth } from "./authContext";
    import { useNavigate } from "react-router-dom";

    type props = {
        calendarEvent: CalendarEvent
        eventModal: ReturnType<typeof createEventModalPlugin>
    }

//------------------------------(Event Component)-----------------------------------

    export default function CustomEventComponent ({ calendarEvent }: props) {

        const FormattedStart = formatTime(calendarEvent.start);

        const FormattedEnd = formatTime(calendarEvent.end);

        return (
            <div className="w-full !min-w-[100px] h-full p-[2px]">
                {calendarEvent.available && calendarEvent.open && !calendarEvent.pastslottime && ( //Tiden er ledig
                    <div key={calendarEvent.id} data-start={FormattedStart} data-end={FormattedEnd} data-date={calendarEvent.date} className="bg-[#E0F2FE] w-full min-w-[100px] h-full rounded-md border border-1 border-[#BFDBFE] cursor-pointer">
                        <div className="flex flex-col gap-[5px] text-[#0F176B] p-1">
                            <p className="text-xl font-bold">{calendarEvent.title}</p>
                            <p className="text-md">
                            {FormattedStart} - {FormattedEnd}
                            </p>
                        </div>
                    </div>  
                )}

                {calendarEvent.open && !calendarEvent.available && !calendarEvent.pastslottime && ( //Tiden er optaget
                    <div className="bg-red-400 w-full min-w-[100px] h-full rounded-md border border-1 border-[#BFDBFE] cursor-pointer">
                        <div className="flex flex-col gap-[5px] text-[#0F176B] p-1">
                            <p className="text-xl font-bold">{calendarEvent.title}</p>
                            <p className="text-md">
                                Booket
                            </p>
                        </div>
                    </div>  
                )}

                {calendarEvent.open && calendarEvent.pastslottime && ( //Tiden er passeret
                    <div className="bg-gray-100 w-full min-w-[100px] h-full rounded-md border border-1 border-gray-200 cursor-pointer">
                        <div className="flex flex-col gap-[5px] text-[#0F176B] p-1">
                            <p className="text-xl font-bold">{calendarEvent.title}</p>
                        </div>
                    </div>  
                )}  

                {calendarEvent.open == false && ( //Banen er lukket
                    <div className="bg-[#F1F5F9] w-full !min-w-[100px] h-full rounded-md border border-1 border-[#E2E8F0] cursor-not-allowed">
                        <div className="flex flex-col gap-[5px] text-[#94A3B8] p-1">    
                            <p className="text-xl font-bold">{calendarEvent.title}</p>
                            <p className="text-md">
                                Lukket!
                            </p>
                        </div>
                    </div> 
                )}
            </div>
        );
    }

//------------------------------(Modal)-----------------------------------

    export function CustomModalComponent({ calendarEvent, eventModal }: props) { 
        const { user } = useAuth();
        const navigate = useNavigate()

        const FormattedStart = formatTime(calendarEvent.start);

        const FormattedEnd = formatTime(calendarEvent.end);

        async function handleBooking (event: CalendarEvent) {
            if (!user) return alert("Log ind først!");

            if (!confirm(`Er du sikker på at du vil book ${event.title}...`)) {
                return alert("Booking canceled");
            }  

            const response = await fetch('http://127.0.0.1:8000/api/createBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    'courtId': calendarEvent.id,
                    'userId': user.id,
                    'start': FormattedStart,
                    'end': FormattedEnd,
                    'date': calendarEvent.date
                }),
            });

            const result = await response.json()

            if (!response.ok) {
                alert(result['message']);
            }

            alert(result['message']);
            navigate('/');
        }

        return (
            <div>
                {calendarEvent.open && calendarEvent.available && !calendarEvent.pastslottime &&( //tiden er ledig og kan bookes
                    <div className="flex flex-col relative items-center justify-center gap-[10px] p-2">

                        <div className="absolute top-1 right-2">
                            <button className="hover:cursor-pointer text-red-400" onClick={() => {eventModal.close();}}><MdClose /></button>
                        </div>

                        <h2 className="text-2xl font-bold">{calendarEvent.title}</h2>

                        <p className="text-gray-600">
                            {FormattedStart} - {FormattedEnd}
                        </p>

                        <p className="text-gray-600"><span className="text-gray-700 font-bold">{calendarEvent.price}</span> Kr</p>

                        <button 
                            onClick={() => {
                                handleBooking(calendarEvent);
                            }} 
                            className="bg-green-500 rounded p-1 text-white font-semibold text-md md:text-sm transtion duration-300 hover:scale-110 cursor-pointer hover:bg-green-600">
                                Book bane
                        </button>

                    </div>
                )}

                {!calendarEvent.available && !calendarEvent.pastslottime && ( //tiden er allrede booket
                    <div className="flex flex-col relative items-center justify-center gap-[10px] p-2">

                        <div className="absolute top-1 right-2">
                            <button className="hover:cursor-pointer text-red-400" onClick={() => {eventModal.close();}}><MdClose /></button>
                        </div>

                        <h2 className="text-2xl font-bold">{calendarEvent.title}</h2>

                        <p className="text-gray-600">
                            Tidspunktet er desværre optaget.
                        </p>

                    </div>
                )}

                {calendarEvent.open && calendarEvent.pastslottime && ( //Tiden er passeret
                    <div className="flex flex-col relative items-center justify-center gap-[10px] p-2">

                        <div className="absolute top-1 right-2">
                            <button className="hover:cursor-pointer text-red-400" onClick={() => {eventModal.close();}}><MdClose /></button>
                        </div>

                        <h2 className="text-2xl font-bold">{calendarEvent.title}</h2>

                        <p className="text-gray-600">
                            Det valgte tidsrum er desværre allerede passeret.
                        </p>

                    </div>
                )}

                {calendarEvent.open == false && ( //Banen er lukket i dette tidsrum
                    <div className="flex flex-col relative items-center justify-center gap-[10px] p-2">

                        <div className="absolute top-1 right-2">
                            <button className="hover:cursor-pointer text-red-400" onClick={() => {eventModal.close();}}><MdClose /></button>
                        </div>

                        <h2 className="text-2xl font-bold">{calendarEvent.title}</h2>

                        <p className="text-gray-600">
                            Banen er lukket i dette tidsrum.
                        </p>

                    </div>
                )}
            </div>
        );
    }

    function formatTime(time: Temporal.ZonedDateTime | Temporal.PlainDate) {
        return time instanceof Temporal.ZonedDateTime
            ? time.toPlainTime().toString()
            : "";
    }