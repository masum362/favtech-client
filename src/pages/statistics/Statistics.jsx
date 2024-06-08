import React from 'react'
import { useQuery } from '@tanstack/react-query';
import useAuthSecure from '../../hooks/useAuthSecure'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {value}
    </text>
  );
};

const Statistics = () => {
  const authSecure = useAuthSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await authSecure("/statistics");
      return response.data;
    }
  })


  console.log(data)
  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Statistics</h1>
      <div className='w-full border flex items-center justify-center mt-12'>
        <PieChart width={600} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  )
}

export default Statistics