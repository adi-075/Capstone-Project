export const dynamic = 'force-dynamic'

import React from 'react'
import { TopBar } from '@/components/Dashboard/TopBar'
import { ResourceCard } from './ResourceCard'

const sampleResources = [
    {
        title: "Find your Major",
        description: "Find out what you're interested in and what you're good at.",
        url: "https://www.utoledo.edu/programs/",
        category: "Academic",
        icon: "/capstone.jpg"
    },
    {
        title: "Plan of Study",
        description: "Find out what classes you need to take to get your degree.",
        url: "https://catalog.utoledo.edu/undergraduate/engineering/engineering-technology/bs-information-technology/",
        category: "Academic",
        icon: "/information-security.jpg"
    },
    {
        title: "International Student",
        description: "If you're an international student, find out resources for you.",
        url: "https://www.utoledo.edu/cisp/international/",
        category: "International",
        icon: "/scripting.jpg"
    },
    {
        title: "Course Materials",
        description: "Access supplementary materials for your courses.",
        url: "https://utoledo.bncollege.com/course-material/course-finder",
        category: "Academic",
        icon: "/courses/1.avif"
    },
    {
        title: "Counselling Services",
        description: "Are you feeling stressed? Need help with your studies? The University of Toledo offers counselling services to help you.",
        url: "https://www.utoledo.edu/studentaffairs/counseling/",
        category: "Mental Health",
        icon: "/courses/2.avif"
    },
    {
        title: "RocketHacks",
        description: "Explore hackathon resources and competition guidelines.",
        url: "https://rockethacks.org/",
        category: "Events",
        icon: "/rockethacks.png"
    },
];

export default function Resources() {
    return (
        <div className='bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 rounded-lg shadow p-2 border border-stone-300/50 dark:border-white/10'>
            <TopBar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-stone-950 dark:text-white/80 mb-8 text-center">
                    Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleResources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                    ))}
                </div>
            </div>
        </div>
    )
}
