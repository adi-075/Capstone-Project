import React from 'react'
import { TopBar } from './TopBar'
import { Grid } from './Grid'

export const Dashboard = () => {
    return (
        <div className='bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg shadow-lg shadow-black/5 dark:shadow-[#000000]/20 p-2 dark:text-white/80 border border-stone-300/50 dark:border-white/10'>
            <TopBar />
            <Grid />
        </div>
    )
}
