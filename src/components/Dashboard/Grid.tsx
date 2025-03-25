import React from 'react'
import { StatCards } from './StatCards';
import { UsageRadar } from './UsageRadar';
import StudentDashboardChart from './ActivityChart';

export const Grid = () => {
    return (
        <div className='px-4 grid gap-3 grid-cols-12'>
            <StatCards />
            <StudentDashboardChart />
            <UsageRadar />
        </div>
    )
};
