import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



import linegraphstyle from '../style/linegraphstyle.module.css'

const LineGraph = () => {

    const data = [
        {name: 'Jan', sedan: 22, sports: 7, trucks: 10, suv: 20},
        {name: 'Feb', sedan: 12, sports: 2, trucks: 14, suv: 15},
        {name: 'Mar', sedan: 11, sports: 1, trucks: 14, suv: 9},
        {name: 'Apr', sedan: 20, sports: 7, trucks: 8, suv: 7},
        {name: 'May', sedan: 31, sports: 1, trucks: 7, suv: 7},
        {name: 'Jun', sedan: 25, sports: 4, trucks: 9, suv: 11},
        {name: 'Jul', sedan: 29, sports: 2, trucks: 11, suv: 2},
        {name: 'Aug', sedan: 20, sports: 6, trucks: 15, suv: 0},
        {name: 'Sep', sedan: 11, sports: 20, trucks: 13, suv: 12},
        {name: 'Oct', sedan: 22, sports: 11, trucks: 12, suv: 9 },
        {name: 'Nov', },
        {name: 'Dec', }
    ];

    return (
        <div className={linegraphstyle.mainContainer}>
            
            <div className={linegraphstyle.linegraphWrapper}>
                <div className={linegraphstyle.header}>
                    <h2>Most Sold Vehicles</h2>
                </div>
                <ResponsiveContainer width="100%" height="100%" className={linegraphstyle.chart}>
                    <LineChart data={data}>
                        <Line type="linear" dataKey='sedan' stroke='blue' strokeWidth={2} />
                        <Line type="linear" dataKey='sports' stroke='red' strokeWidth={2} />
                        <Line type="linear" dataKey='trucks' stroke='orange' strokeWidth={2} />
                        <Line type="linear" dataKey='suv' stroke='green' strokeWidth={2} />
                        <CartesianGrid stroke='black' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip  />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default LineGraph