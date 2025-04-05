import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Resource {
    title: string;
    description: string;
    url: string;
    category: string;
    icon: string;
}

interface ResourceCardProps {
    resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    return (
        <div className="relative h-96 rounded-xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0">
                <Image
                    src={resource.icon}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/50 dark:bg-[#101935]/50 backdrop-blur-md backdrop-saturate-150 p-4 m-3 rounded-lg shadow-sm border border-stone-300/50 dark:border-white/10">
                    <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200">
                            {resource.category}
                        </span>
                    </div>
                    
                    <h3 className="text-stone-900 dark:text-[#AEB9E1] text-lg font-medium mb-2 line-clamp-2">
                        {resource.title}
                    </h3>

                    <p className="text-stone-800 dark:text-white/80 mb-4 line-clamp-3">
                        {resource.description}
                    </p>

                    <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <button className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded transition-colors duration-300">
                            View Resource
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}; 