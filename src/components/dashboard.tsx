import { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { getArtistUUID, getOctoberMonthlyListeners } from '../network/network'
import { useAppSelector } from '../redux/hooks'

type Props = {}



export default function Dashboard(props: Props) {
    const storeAlbumSales = useAppSelector((state) => state.albumSales.value)
    useEffect(() => {
        const uuid = getArtistUUID('billie eillish')
        uuid.then(res => console.log(res));
        // getOctoberMonthlyListeners(uuid)
    }, [])
    const chartData = {
        height: 500,
        width: 500,
        type: 'bar',
        options: {
            chart: {
                id: "basic-bar",
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: false
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -20,
                            offsetY: 0
                        },
                        dataLabels: {
                            enabled: false
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
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
            <Chart options={chartData.options} height={chartData.height} series={chartData.series} type='bar' width={chartData.width} />
        </>
    )
}