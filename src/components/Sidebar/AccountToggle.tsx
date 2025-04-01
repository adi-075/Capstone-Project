'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Student } from '@/types/student'

export function AccountToggle() {
    const [student, setStudent] = useState<Student | null>(null)

    useEffect(() => {
        const getStudent = async () => {
            try {
                const response = await fetch('/api/students')
                const data = await response.json()
                if (!response.ok) throw new Error(data.error)
                // Set the first student from the response
                setStudent(data[0] || null)
            } catch (error) {
                console.error('Error fetching students:', error)
                setStudent(null)
            }
        }
        getStudent()
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
                    <span className="text-sm font-bold block">{student?.first_name || 'Loading...'}</span>
                    <span className='text-xs block text-stone-500 break-words w-28'>
                        {student?.email || 'Loading...'}
                    </span>
                </div>
                <FiChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs' />
                <FiChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs' />
            </button>
        </div>
    )
}