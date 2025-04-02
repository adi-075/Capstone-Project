'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Student } from '@/types/student'

export function AccountToggle() {
    const [student, setStudent] = useState<Student | null>(null)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const students = await fetch('/api/students')
                const data = await students.json()
                if (!students.ok) throw new Error(data.error)
                setStudent(Array.isArray(data) ? data[0] : null)
            } catch (error) {
                console.error('Error fetching students:', error)
                setStudent(null)
            }
        }
        fetchStudent()
    }, [])

    return (
        <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
            <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center'>
                <div className='relative size-8 rounded shrink-0 bg-violet-500 cursor-pointer'>
                    <Image
                        src={"/avatar.svg"}
                        alt="avatar"
                        fill
                        className='rounded'
                    />
                </div>
                <div className='text-start'>
                    <span className="text-sm font-bold block">
                        {student?.first_name || 'No Name'}
                    </span>
                    <span className='text-xs block text-stone-500 break-words'>
                        {student?.email || 'No Email'}
                    </span>
                </div>
                {/* <FiChevronDown className='absolute right-1 top-1/2 translate-y-[calc(-50%+4px)] text-xs' />
                <FiChevronUp className='absolute right-1 top-1/2 translate-y-[calc(-50%-4px)] text-xs' /> */}
            </button>
        </div>
    )
}