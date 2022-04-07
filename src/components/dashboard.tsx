import { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArtistUUID, getOctoberMonthlyListeners } from '../network/network'
import { addArtistDetails } from '../redux/albumSalesReducer'
import { useAppSelector } from '../redux/hooks'

type Props = {}



export default function Dashboard(props: Props) {
    const storeAlbumSales = useAppSelector((state) => state.albumSales.value)
    const dispatch = useDispatch()
    useEffect(() => {
        const uuid = getArtistUUID('billie eillish')
        uuid.then(res => {
            // If the api request returns only one item in the object then an error
            // occured.
            const { errors } = res
            if (Object.keys(res).length === 1) {
                console.log(errors[0].message)
            } else if (Object.keys(res).length > 1) {
                const { items } = res
                // Because the items array is possibly undefined we have first check
                // if it's there before dispatching it to the store.
                if (items) {
                    dispatch(addArtistDetails(items[0]))
                }
            }
        });
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