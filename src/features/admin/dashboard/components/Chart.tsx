import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { LineChartData } from './LineChartData.tsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu theo tháng',
      },
    },
    scales: {
      y: {
       
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'năm 2025',
        },
      },
    },
  };

  return <Line options={options} data={LineChartData} />;
};  