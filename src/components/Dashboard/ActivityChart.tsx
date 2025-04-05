"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { FiUser } from "react-icons/fi";


const data = [
    { day: 'Monday', studyHours: 3, assignments: 1 },
    { day: 'Tuesday', studyHours: 4, assignments: 2 },
    { day: 'Wednesday', studyHours: 2, assignments: 1 },
    { day: 'Thursday', studyHours: 5, assignments: 3 },
    { day: 'Friday', studyHours: 6, assignments: 2 },
    { day: 'Saturday', studyHours: 4, assignments: 1 },
    { day: 'Sunday', studyHours: 3, assignments: 0 },
];

const StudentDashboardChart = () => {
    return (
        <div id="activity" className="col-span-8 overflow-hidden rounded border border-stone-300 dark:border-white/15 bg-white dark:bg-[#101935]">
            <div className="p-4 border-b border-stone-200 dark:border-white/15">
                <h3 className="flex items-center gap-1.5 font-medium text-stone-950 dark:text-white/80">
                    <FiUser className="text-violet-500" /> Activity
                </h3>
            </div>
            <div className="h-64 px-4 py-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="studyHoursGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="assignmentsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#AEB9E1" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#AEB9E1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis 
                            dataKey="day" 
                            stroke="#6B7280"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            yAxisId="left" 
                            stroke="#6B7280"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'Study Hours', angle: -90, position: 'insideLeft', fill: '#6B7280' }} 
                        />
                        <YAxis 
                            yAxisId="right" 
                            orientation="right" 
                            stroke="#6B7280"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'Assignments', angle: 90, position: 'insideRight', fill: '#6B7280' }} 
                        />
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '0.5rem',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                            }}
                            labelStyle={{ color: '#374151', fontWeight: '500' }}
                            itemStyle={{ color: '#6B7280' }}
                        />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="studyHours"
                            fill="url(#studyHoursGradient)"
                            stroke="none"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="studyHours"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#8B5CF6' }}
                            name="Study Hours"
                        />
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="assignments"
                            fill="url(#assignmentsGradient)"
                            stroke="none"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="assignments"
                            stroke="#AEB9E1"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#AEB9E1' }}
                            name="Assignments Submitted"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentDashboardChart;
