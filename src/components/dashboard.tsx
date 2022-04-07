import { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { getArtistUUID, getOctoberMonthlyListeners, monthlyListenersResponse, UUIDResponse } from '../network/network'
import { addArtistDetails, addCityNames, addListenersByCity, addMonthlyListenersAndIncome } from '../redux/albumSalesReducer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

type Props = {}



export default function Dashboard(props: Props) {
    const listenersByCity = useAppSelector((state) => state.albumSales.listeners)
    const cityNames = useAppSelector((state) => state.albumSales.cityNames)
    const artistDetails = useAppSelector((state) => state.albumSales.artistDetails)
    const dispatch = useAppDispatch()

    const getListenersByCity = (data: Record<string, any>[]) => {
        const firstTwelveCities = data.slice(0, 11)
        let cityNames: string[] = []
        let listeners: number[] = []
        firstTwelveCities.map(city => {
            cityNames.push(city.cityName)
            listeners.push(city.value)
        })
        dispatch(addCityNames(cityNames))
        dispatch(addListenersByCity(listeners))
    }

    const extractResponse = (response: Promise<UUIDResponse> | Promise<monthlyListenersResponse>, type: string) => {
        response.then(res => {
            // If the api request returns only one item in the object then an error
            // occured.
            const { errors } = res
            if (Object.keys(res).length === 1) {
                // TODO: Add custom notifications
                alert(errors[0].message)
            } else if (Object.keys(res).length > 1) {
                const { items } = res
                // Because the items array is possibly undefined we have first check
                // if it's there before dispatching it to the store.
                if (items) {
                    if (type === 'uuid') {
                        dispatch(addArtistDetails(items[0]))
                    } else {
                        dispatch(addMonthlyListenersAndIncome(items[0].value))
                        getListenersByCity(items[0].cityPlots)
                    }
                }
            }
        });
    }

    useEffect(() => {
        if (!Object.keys(artistDetails).length) {
            const uuidResponse = getArtistUUID('billie eillish')
            extractResponse(uuidResponse, 'uuid')
        }

        if (artistDetails.uuid) {
            const listenerResults = getOctoberMonthlyListeners(artistDetails.uuid)
            extractResponse(listenerResults, 'listeners')
        }
    }, [artistDetails])
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
                categories: cityNames
            }
        },
        series: [
            {
                name: "Eminem's Album Sales",
                data: listenersByCity
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