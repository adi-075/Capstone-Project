import React from 'react'
import { TopBar } from './TopBar'
import { Grid } from './Grid'

export const Dashboard = () => {
    return (
        <div className='bg-white rounded-lg shadow p-2'>
            <TopBar />
            <Grid />
        </div>
    )
}
