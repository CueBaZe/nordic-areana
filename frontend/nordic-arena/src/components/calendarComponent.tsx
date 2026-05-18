import type { CalendarEvent } from "@schedule-x/calendar";

type props = {
    calendarEvent: CalendarEvent
}

export default function CustomEventComponent ({ calendarEvent }: props) {

    const FormattedStart = calendarEvent.start instanceof Temporal.ZonedDateTime ? calendarEvent.start.toPlainTime().toString() : '';
    const FormattedEnd = calendarEvent.end instanceof Temporal.ZonedDateTime ? calendarEvent.end.toPlainTime().toString() : '';

    return (
        <div className="w-full min-w-[100px] h-full p-[2px]">
            {calendarEvent.available && calendarEvent.open && (
                <div key={calendarEvent.id} data-start={FormattedStart} data-end={FormattedEnd} data-date={calendarEvent.date} className="bg-[#E0F2FE] w-full min-w-[100px] h-full rounded-md border border-1 border-[#BFDBFE]">
                    <div className="flex flex-col gap-[5px] text-[#0F176B] p-1">
                        <p className="text-xl font-bold">{calendarEvent.title}</p>
                        <p className="text-md">
                        {FormattedStart} - {FormattedEnd}
                        </p>
                    </div>
                </div>  
            )}

            {calendarEvent.open == false && (
                <div className="bg-[#F1F5F9] w-full min-w-[100px] h-full rounded-md border border-1 border-[#E2E8F0]">
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