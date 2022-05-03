import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts'


type Props = {
    chartData: {
        height: number,
        width: number,
        options: Record<string, any>,
        series: any
    }
}

export default function CityListenersChart({ chartData }: Props) {
    return (
        <Card sx={{
            border: '1px solid',
            borderColor: 'rgba(144, 202, 249, 0.46)',
            ':hover': {
                boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
            },
        }}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} alignItems="center" spacing={1}>
                        <Typography variant="subtitle2">Listeners in Different cities</Typography>
                        <Typography variant="h5">City with the most streams: Mexico</Typography>
                    </Grid>
                </Grid>
                <Chart options={chartData.options} height={chartData.height} series={chartData.series} type='bar' width={chartData.width} />
            </CardContent>
        </Card>
    )
}