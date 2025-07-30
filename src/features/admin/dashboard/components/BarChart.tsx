import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChartData } from './BarChart_fakeData.tsx'; // You can rename this later

// Register bar chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Tỷ lệ doanh số theo sản phẩm',
      },
    },
  };

  return <Bar data={BarChartData} options={options} />;
};
