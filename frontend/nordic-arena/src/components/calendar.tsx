import { Temporal } from 'temporal-polyfill';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createViewDay } from "@schedule-x/calendar"
import { useEffect, useMemo } from 'react';
import CustomEventComponent, { CustomModalComponent } from './calendarComponent';

export interface Slot {
    start: string;
    end: string; 
    date: string;
    price: string;
    available: boolean;
    pastslottime: boolean;
    open: boolean;
}

export interface Court {
    id: string,
    title: string,
    slots: Slot[],
}

interface CalendarProps {
    initialEvents: Court[];
    onDateChange: (date: string) => void;
}

export default function Calendar({ initialEvents, onDateChange }: CalendarProps) {

    const today = Temporal.Now.plainDateISO() //gets todays date
    const twoWeekAhead = today.add({ days: 14  }) //get the date 2 weeks ahead
    const eventModal = useMemo(() => createEventModalPlugin(), []);


    const calender = useCalendarApp({
        locale: 'da-DK',
        views: [
            createViewDay(),
        ],
        events: [],
        
        callbacks: {
            onRangeUpdate(range) {
                const dateOnly = range.start.toPlainDate().toString();
                onDateChange(dateOnly);
            },
        },
        minDate: today,
        maxDate: twoWeekAhead,
        dayBoundaries: {
            start: '01:00',
            end: '23:00',
        },
        plugins: [eventModal]
        
    });

    useEffect(() => {   
        if (initialEvents.length > 0) {
            const flattenEvents = initialEvents.flatMap(court => { //Goes trough all obejcts in initialEvents and flattens the array
                
                return court.slots.map((slot) => { //loops trough all the slots in the court
                    
                    //fomats the time to match the right format
                    const startZonedDateTime = Temporal.ZonedDateTime.from(`${slot.date}T${slot.start}:00[UTC]`); 
                    const endZonedDateTime = Temporal.ZonedDateTime.from(`${slot.date}T${slot.end}:00[UTC]`);

                    return {
                        id: court.id,
                        title: court.title,
                        start: startZonedDateTime,
                        end: endZonedDateTime,
                        date: slot.date,
                        price: slot.price,
                        available: slot.available,
                        pastslottime: slot.pastslottime,
                        open: slot.open,
                    };
                }); 
            });
            calender?.events.set(flattenEvents);
        }
    }, [initialEvents])


    return (
        <ScheduleXCalendar calendarApp={calender} 
        customComponents={{
            timeGridEvent: CustomEventComponent,
            eventModal: (props) => (
                <CustomModalComponent {...props} eventModal={eventModal} />  
            ) 
        }}/>
    );
}