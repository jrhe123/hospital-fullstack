import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data = {
  labels,
  datasets: [
    {
      label: 'TO General',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: '#bebebf',
    },
    {
      label: 'NY General',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: '#81B3AA',
    },
    {
      label: 'Sunnybrook',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: '#2C373E',
    },
    {
      label: 'SickKids',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: '#4B9BCC',
    },
  ],
}

export const BarChart = () => <Bar options={options} data={data} />
