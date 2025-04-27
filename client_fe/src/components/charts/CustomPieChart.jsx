import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

function CustomPieChart({
    data, 
    colors, 
    label, 
    totalAmount, 
    showTextAnchor
}) {
  return (
    <ResponsiveContainer width="100%" height={390}>
        <PieChart>
            <Pie 
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                isAnimationActive={true}
            > 
                {data.map((entry,index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>

            <Tooltip content={CustomTooltip}
            wrapperStyle={{ outline: 'none' }}
            isAnimationActive={true}
            />
            <Legend content={CustomLegend}/>

            {showTextAnchor && (
                <>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy={-25}
                        fill='#666'
                        fontSize="14px"
                    >
                        {label}
                    </text>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy={8}
                        fill='#333'
                        fontSize="24px"
                        fontWeight='semi-bold'
                    >
                        {totalAmount}
                    </text>
                    
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart