import 'temporal-polyfill/global';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewDay } from "@schedule-x/calendar"
import Mainlayout from "../mainlayout";

export default function BookingPage() {

    const calender = useCalendarApp({
        locale: 'da-DK',
        views: [
            createViewDay(),
        ],
        events: [
            {
                id: 1,
                title: 'Paddle Bane 1',
                start: Temporal.ZonedDateTime.from('2026-05-07 12:00[UTC]'),
                end: Temporal.ZonedDateTime.from('2026-05-07 13:00[UTC]'),
            }, 
            {
                id: 2,
                title: 'Paddle Bane 2',
                start: Temporal.ZonedDateTime.from('2026-05-07 12:00[UTC]'),
                end: Temporal.ZonedDateTime.from('2026-05-07 13:00[UTC]'),
            },
            {
                id: 3,
                title: 'Paddle Bane 3',
                start: Temporal.ZonedDateTime.from('2026-05-07 12:00[UTC]'),
                end: Temporal.ZonedDateTime.from('2026-05-07 13:00[UTC]'),
            },
            {
                id: 4,
                title: 'Paddle Bane 4',
                start: Temporal.ZonedDateTime.from('2026-05-07 12:00[UTC]'),
                end: Temporal.ZonedDateTime.from('2026-05-07 13:00[UTC]'),
            }
        ],
    });

    return (
        <Mainlayout> 
            <ScheduleXCalendar calendarApp={calender}/>
        </Mainlayout>
    );
}