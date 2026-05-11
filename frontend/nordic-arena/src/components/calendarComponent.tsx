import type { CalendarEvent } from "@schedule-x/calendar";

type props = {
    calendarEvent: CalendarEvent
}

export default function CustomEventComponent ({ calendarEvent }: props) {

    const FormattedStart = calendarEvent.start instanceof Temporal.ZonedDateTime ? calendarEvent.start.toPlainTime().toString() : '';
    const FormattedEnd = calendarEvent.end instanceof Temporal.ZonedDateTime ? calendarEvent.end.toPlainTime().toString() : '';

    return (
        <div className="w-full min-w-[100px] h-full p-[2px]">
            <div className="bg-blue-400 w-full min-w-[100px] h-full rounded-md border border-black">
            <div className="flex flex-col gap-[5px] text-white p-1">
                <p className="text-xl font-bold">{calendarEvent.title}</p>
                <p className="text-md">
                {FormattedStart} - {FormattedEnd}
                </p>
            </div>
            </div>
        </div>
);
}