import 'temporal-polyfill/global';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewDay } from "@schedule-x/calendar"
import Mainlayout from "../mainlayout";

export interface CalendarEvent {
    id: string,
    title: string,
    start: Temporal.ZonedDateTime | Temporal.PlainDate;
    end: Temporal.ZonedDateTime | Temporal.PlainDate;
    available?: boolean,
}

interface CalendarProps {
    initialEvents: CalendarEvent[];
    onDateChange: (date: string) => void;
}

export default function Calendar({ initialEvents, onDateChange }: CalendarProps) {

    const today = Temporal.Now.plainDateISO()
    const twoWeekAhead = today.add({ days: 14  })

    const calender = useCalendarApp({
        locale: 'da-DK',
        views: [
            createViewDay(),
        ],
        events: initialEvents,
        callbacks: {
            onRangeUpdate(range) {
                const dateOnly = range.start.toPlainDate().toString();
                onDateChange(dateOnly);
            },
        },
        minDate: today,
        maxDate: twoWeekAhead,
    });

    return (
        <Mainlayout> 
            <ScheduleXCalendar calendarApp={calender}/>
        </Mainlayout>
    );
}