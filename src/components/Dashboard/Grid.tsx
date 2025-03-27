import React from 'react'
import { StatCards } from './StatCards';
import { GradingGrid } from '../Courses Grading/GradingGrid';
import PerformanceRadar from './PerformanceRadar';
import StudentDashboardChart from './ActivityChart';

export const Grid = () => {
    return (
        <><div className='px-4 pb-5 grid gap-3 grid-cols-12'>
            <h1 className='col-span-12 text-2xl font-bold' > Metrics</h1 >
            <StatCards />
            <StudentDashboardChart />
            <PerformanceRadar />
            <h1 className='col-span-12 text-2xl font-bold mt-1'>Courses</h1>
        </div >
            <div className='px-4 pb-5 grid gap-10 grid-cols-12'>
                <GradingGrid />
            </div>
        </>
    )
};
