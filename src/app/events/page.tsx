import React from 'react'
import { TopBar } from '@/components/Dashboard/TopBar'
import EventList from '@/app/events/EventList'

export default function Events() {
    return (
        <div className='bg-white rounded-lg shadow h-screen p-2'>
            <TopBar />
            <EventList />
        </div>
    )
}
