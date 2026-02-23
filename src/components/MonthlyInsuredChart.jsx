import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import TableRecentInsureds from './TableRecentInsureds';


const MonthlyInsuredChart = ({ insuredByMonth, year = 2026 }) => {
    const data = Array.from({ length: 12 }, (_, i) => {
        const monthIndex = i + 1;

        const existing = insuredByMonth?.find(
            (item) => item.month === monthIndex && item.year === year
        );

        return {
            name: new Date(year, i).toLocaleString("fr-FR", {
                month: "short",
            }),
            insured: existing?.totalInsured || 0,
            claim: existing?.totalClaim || 0,
        };
    });

    return (
    

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">
                    📊 Assurés vs Sinistres ({year})
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        barCategoryGap="50%"
                        barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="insured"
                            name="Assurés créés"
                            fill="#340BE5"
                            barSize={16}
                            radius={[6, 6, 0, 0]} />
                        <Bar
                            dataKey="claim"
                            name="Sinistres ouverts"
                            fill="#BEBBFC"
                            barSize={16}
                            radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        


    )
}

export default MonthlyInsuredChart