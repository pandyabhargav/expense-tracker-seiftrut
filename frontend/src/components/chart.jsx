import React from 'react';
import Chart from 'react-apexcharts';

const Charts = ({ income, expense }) => {

  const barChartOptions = {
    chart: {
      id: 'income-expense-chart',
      toolbar: {
        show: false, 
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    colors: ['#00E396', '#FF4560'], 
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Income', 'Expenses'],
      labels: {
        style: {
          colors: ['#fff', '#fff'], 
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#fff'], 
        },
      },
    },
    grid: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const barChartSeries = [
    {
      name: 'Amount',
      data: [income, expense], 
    },
  ];

  return (
    <div className="charts-container flex flex-col items-center gap-5 mt-6 w-full">
      <div className="chart bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-lg text-white mb-4 text-center font-bold">Income vs Expenses</h2>
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default Charts;
