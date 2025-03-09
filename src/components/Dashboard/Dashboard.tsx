import React from 'react'
import { TopBar } from './TopBar'
import { Grid } from './Grid'

export const Dashboard = () => {
    return (
        <div className='bg-white rounded-lg shadow h-screen p-2'>
            <TopBar />
            <Grid />
        </div>
    )
}
