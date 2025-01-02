import { useState, useEffect } from 'react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import areachartstyle from '../style/areachartstyle.module.css'


const FinancialGains = () => {

        const data = [
            {name: 'Jan', revenue:4000, expenses:4000, profitLoss: 0},
            {name: 'Feb', revenue: 200, expenses:2700},
            {name: 'Mar', revenue: 1000, expenses:1200},
            {name: 'Apr', revenue: 5000, expenses:2300},
            {name: 'May', revenue: 2500, expenses:378},
            {name: 'Jun', revenue: 3500, expenses:3828},
            {name: 'Jul', revenue: 5500, expenses:3828},
            {name: 'Aug', revenue: 7500, expenses:3828},
            {name: 'Sep', revenue: 6500, expenses:2500 },
            {name: 'Oct', revenue: 2000, expenses:2300},
            {name: 'Nov', },
            {name: 'Dec', }
        ]

    return (
        <div>
            <div className={areachartstyle.mainWrapper}>
                <div className={areachartstyle.header}>
                    <h1>Financial Gains</h1>
                </div>
                <ResponsiveContainer >
                    <AreaChart data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorrevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#52b788" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#52b788" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorexpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d00000" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#d00000" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="revenue" stroke="#52b788" fillOpacity={1} fill="url(#colorrevenue)" />
                        <Area type="monotone" dataKey="expenses" stroke="#d00000" fillOpacity={1} fill="url(#colorexpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            



        </div>
    )
}

export default FinancialGains