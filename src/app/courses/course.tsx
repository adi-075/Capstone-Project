import React from 'react'
import { CourseCard } from './card'

export default function Course() {
    return (
        <>
            <h1 className='text-left px-5 text-2xl font-bold mb-5 text-stone-950 dark:text-white/80'>Enrolled Courses</h1>
            <div className='px-4 grid gap-5 grid-cols-12 p-2'>
                <CourseCard />
            </div>
        </>
    )
}
