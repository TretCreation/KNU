import { Chart, registerables, ScatterDataPoint } from 'chart.js'
import React, { FC, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'

Chart.register(...registerables)

const MyScatterChart: React.FC<{ data: number[][] }> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d') as CanvasRenderingContext2D

      const datasets = data.map((line, typeIndex) => ({
        label: `Type ${typeIndex + 1}`,
        data: line.map((y, x): ScatterDataPoint => ({ x: x + 1, y })),
        connectLines: Array(10).fill(true), // Connect all points for each type
        fill: false
      }))

      const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'X Axis'
              }
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Y Axis'
              }
            }
          },
          maintainAspectRatio: false, // Disable aspect ratio to allow resizing
          responsive: true // Make the chart responsive
        }
      })

      return () => {
        myChart.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} style={{ width: '800px', height: '600px' }} />
}

export default MyScatterChart
