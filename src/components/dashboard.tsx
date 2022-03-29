import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

type Props = {}



export default function Dashboard(props: Props) {
    const storeAlbumSales = useAppSelector((state) => state.albumSales.value)
    const chartData = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1996, 1999, 2000, 2002, 2004, 2009, 2010, 2013, 2017, 2018, 2020]
            }
        },
        series: [
            {
                name: "Eminem's Album Sales",
                data: storeAlbumSales
            },
        ]
    }
    return (
        <>
            <Link to='/'>
                <button className='btn me-3 btn-primary mb-4'>Move back Home</button>
            </Link>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type='line'
                width={500}
            />
        </>
    )
}