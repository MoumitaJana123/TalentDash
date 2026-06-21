'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  data: { name: string; salary: number }[];
}

export default function SalaryChart({ data }: Props) {
  return (
    // The key is adding a specific height here so the container isn't 0
    <div className="w-full h-[300px]"> 
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salary" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}