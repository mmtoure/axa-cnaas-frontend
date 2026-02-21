import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


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
        <div className="p-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
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
                                    fill="#6366F1"
                                    barSize={16}
                                    radius={[6, 6, 0, 0]} />
                                <Bar
                                    dataKey="claim"
                                    name="Sinistres ouverts"
                                    fill="#EF4444"
                                    barSize={16}
                                    radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="...">05</div>
            </div>
        </div>

    )
}

export default MonthlyInsuredChart