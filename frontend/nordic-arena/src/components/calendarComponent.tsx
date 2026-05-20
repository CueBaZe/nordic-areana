    import type { CalendarEvent } from "@schedule-x/calendar";
    import { MdClose } from "react-icons/md";
    import { createEventModalPlugin } from '@schedule-x/event-modal'
    import { useAuth } from "./authContext";

    type props = {
        calendarEvent: CalendarEvent
        eventModal: ReturnType<typeof createEventModalPlugin>
    }


    export default function CustomEventComponent ({ calendarEvent }: props) {

        const FormattedStart = formatTime(calendarEvent.start);

        const FormattedEnd = formatTime(calendarEvent.end);

        return (
            <div className="w-full !min-w-[100px] h-full p-[2px]">
                {calendarEvent.available && calendarEvent.open && (
                    <div key={calendarEvent.id} data-start={FormattedStart} data-end={FormattedEnd} data-date={calendarEvent.date} className="bg-[#E0F2FE] w-full min-w-[100px] h-full rounded-md border border-1 border-[#BFDBFE] cursor-pointer">
                        <div className="flex flex-col gap-[5px] text-[#0F176B] p-1">
                            <p className="text-xl font-bold">{calendarEvent.title}</p>
                            <p className="text-md">
                            {FormattedStart} - {FormattedEnd}
                            </p>
                        </div>
                    </div>  
                )}

                {calendarEvent.open == false && (
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

    export function CustomModalComponent({ calendarEvent, eventModal }: props) {
        const { user } = useAuth();

        const FormattedStart = formatTime(calendarEvent.start);

        const FormattedEnd = formatTime(calendarEvent.end);

        function handleBooking (event: CalendarEvent) {
            if (!user) return alert("Log ind først!");

            confirm(`Er du sikker på at du vil book ${event.title}...`);       

            //make api fetch to make the booking
        }

        return (
            <div>
                {calendarEvent.open && (
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
            </div>
        );
    }

    function formatTime(time: Temporal.ZonedDateTime | Temporal.PlainDate) {
        return time instanceof Temporal.ZonedDateTime
            ? time.toPlainTime().toString()
            : "";
    }