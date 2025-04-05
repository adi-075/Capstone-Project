import React from 'react'
import { TopBar } from './TopBar'
import { Grid } from './Grid'

export const Dashboard = () => {
    return (
        <div className='bg-white  dark:bg-[#101935]  rounded-lg shadow p-2 dark:text-white/80'>
            <TopBar />
            <Grid />
        </div>
    )
}
