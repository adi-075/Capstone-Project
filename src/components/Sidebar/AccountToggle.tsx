import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Image from 'next/image'

export const RocketDash = () => {
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
                    <span className="text-sm font-bold block">Aditya</span>
                    <span className='text-xs block text-stone-500 break-words w-28'>amhambr@rockets.utoledo.edu</span>
                </div>
                <FiChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs' />
                <FiChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs' />
            </button>
        </div>
    )
}
