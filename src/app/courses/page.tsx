export const dynamic = 'force-dynamic'

import React from 'react'
import { TopBar } from '@/components/Dashboard/TopBar'
import Course from './course'

export default function Courses() {
    return (
        <div className='bg-white rounded-lg shadow p-2'>
            <TopBar />
            <Course />
        </div>
    )
}
