import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import CardHeader from '@mui/material/CardHeader'
import Icon from '../styling/icon'


export default function LineGraph({uData, pData, xLabels}) {
    return (
        <div style={{backgroundColor:'white', boxShadow:'none'}}>
            <CardHeader
                title='Risk Through Time'
                subheader='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
                sx={{
                    textAlign: 'left',
                    color: 'rgb(117, 116, 123)'
                }}
                titleTypographyProps={{
                    sx:{
                        fontSize: 20
                    }
                }}
                subheaderTypographyProps={{
                    sx: {
                        color: theme => `${theme.palette.text.disabled} !important`,
                        textAlign: 'left',
                        fontSize: 15,
                    }
                }}
                action={
                    <div style={{ display: 'flex', gap: '8px', marginBottom: 5, marginRight: 5  }}>
                      <Icon icon={'mdi-download'} fontSize={20} />
                      <Icon icon={'mdi:share'} fontSize={20} />
                      <Icon icon={'mdi:info'} fontSize={20} />
                    </div>
                  }
            />
            <ChartContainer
                width={500}
                height={300}

                series={[
                    { data: pData, label: 'pv', type: 'line' },
                    { data: uData, label: 'uv', type: 'line' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                grid={{ horizontal: true }}
            >
                <LinePlot />
                <MarkPlot />
                <ChartsReferenceLine
                    x="Page C"
                    label="Max PV PAGE"
                    lineStyle={{ stroke: 'red' }}
                />
                <ChartsXAxis />
                <ChartsYAxis />
            </ChartContainer>
        </div>
    );
}
