"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell
} from "recharts"

const data = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 2100 },
  { name: "Wed", sales: 1800 },
  { name: "Thu", sales: 3200 },
  { name: "Fri", sales: 2800 },
  { name: "Sat", sales: 4500 },
  { name: "Sun", sales: 3800 },
]

const categoryData = [
  { name: "Fresh Fruits", value: 45, color: "#10b981" },
  { name: "Dry Fruits", value: 25, color: "#3b82f6" },
  { name: "Nuts", value: 20, color: "#f59e0b" },
  { name: "Combos", value: 10, color: "#8b5cf6" },
]

export function SalesTrendChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSales)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CategoryDistribution() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 px-4 mt-2">
         {categoryData.map((cat, i) => (
           <div key={i} className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{cat.name}</span>
           </div>
         ))}
      </div>
    </div>
  )
}
