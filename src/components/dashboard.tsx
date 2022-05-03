import styled from '@emotion/styled'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import { getArtistUUID, getOctoberMonthlyListeners, monthlyListenersResponse, UUIDResponse } from '../network/network'
import { addApiCalls, addArtistDetails, addCityNames, addListenersByCity, addMonthlyListenersAndIncome, resetApiCalls } from '../redux/albumSalesReducer'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CityListenersChart } from './dashboard-components';
import { Typography } from '@mui/material';

type Props = {}



export default function Dashboard(props: Props) {
    const listenersByCity = useAppSelector((state) => state.albumSales.listeners)
    const cityNames = useAppSelector((state) => state.albumSales.cityNames)
    const artistDetails = useAppSelector((state) => state.albumSales.artistDetails)
    const apiCalls = useAppSelector((state) => state.albumSales.apiCalls)
    const totalIncome = useAppSelector((state) => state.albumSales.totalIncome)
    const totalListeners = useAppSelector((state) => state.albumSales.totalMonthlyListeners)
    const dispatch = useAppDispatch()

    const getListenersByCity = (data: Record<string, any>[]) => {
        const firstTwelveCities = data.slice(0, 11)
        let cityNames: string[] = []
        let listeners: number[] = []
        firstTwelveCities.map(city => {
            cityNames.push(city.cityName)
            listeners.push(city.value)
            return null
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
                        dispatch(resetApiCalls())
                    } else {
                        dispatch(addMonthlyListenersAndIncome(items[0].value))
                        dispatch(resetApiCalls())

                        getListenersByCity(items[0].cityPlots)
                    }
                }
            }
        });
    }

    useEffect(() => {
        dispatch(addApiCalls())
        if (!Object.keys(artistDetails).length && apiCalls < 3) {
            const uuidResponse = getArtistUUID('billie eillish')
            extractResponse(uuidResponse, 'uuid')
        }

        if (artistDetails.uuid && apiCalls < 3) {
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
                    show: false
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
                        fill: {
                            type: 'solid'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        grid: {
                            show: true
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
            }
        ]
    }
    return (
        <Container>
            <Link to='/'>
                <button className='btn me-3 btn-primary mb-4'>Move back Home</button>
            </Link>
            <Grid container spacing={3} direction='row'>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant='h4'>{totalListeners}</Typography>
                            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 'bold' }}>Total Listeners</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        {/* London and LA */}
                        <CardContent><Typography variant='h4'>{listenersByCity[0]}</Typography>
                            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 'bold' }}>Monthly Listeners By City</Typography></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent><Typography variant='h4'>{totalIncome}</Typography>
                            <Typography variant='body1' color='text.secondary' sx={{ fontWeight: 'bold' }}>Total Income</Typography></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <CityListenersChart chartData={{ height: chartData.height, width: chartData.width, options: chartData.options, series: chartData.series }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>Popular chart</CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    )
}

const Container = styled.div`
    background: #e3f2fd;
    height: 100vh;
    color: rgb(97, 97, 97);
`