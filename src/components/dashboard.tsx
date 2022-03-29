import Chart from 'react-apexcharts'

type Props = {}

const chartData = {
    options: {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
            name: "series-1",
            data: [32, 12, 13, 33, 29, 60, 3, 7]
        }
    ]
}

export default function Dashboard(props: Props) {
    return (
        <>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type='line'
                width={500}
            />
        </>
    )
}