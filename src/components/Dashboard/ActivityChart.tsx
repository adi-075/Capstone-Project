"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
        <div id="activity" className="col-span-8 overflow-hidden rounded border border-stone-300">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiUser /> Activity
                </h3>
            </div>
            <div className="h-64 px-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        {/* Left Y-axis for Study Hours */}
                        <YAxis yAxisId="left" label={{ value: 'Study Hours', angle: -90, position: 'insideLeft' }} />
                        {/* Right Y-axis for Assignments Submitted */}
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Assignments', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="studyHours"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            name="Study Hours"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="assignments"
                            stroke="#82ca9d"
                            name="Assignments Submitted"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentDashboardChart;
