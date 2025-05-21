'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#A3A0CA', '#D7A251', '#8EDF81'];

const data = [
  { name: 'Белки', value: 400 },
  { name: 'Жиры', value: 300 },
  { name: 'Углеводы', value: 700 }
];

export const AnalysisChart = () => {
  return (
    <div style={{ width: '320px', height: '320px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name }) => name}
            isAnimationActive={false} // Отключаем анимацию/интерактив
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
