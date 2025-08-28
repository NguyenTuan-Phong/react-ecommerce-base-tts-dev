import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
}   from 'chart.js';
import { useDashBoardTopSelling } from '../hook/useDashBoardProductTopSelling';
import SkeletonChartTopSelling from '../../../../components/skeleton/SkeletonChartTopSelling';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const limit = 8
    const {
        isLoadingDashBoardTopSelling,
        ResponseDataDashBoardTopSelling
    } = useDashBoardTopSelling(limit)

    const data = ResponseDataDashBoardTopSelling || []

    const BarChartData = {
        labels: data.map(items => items.productName),
        datasets: [
            {
            label: 'Số lượng',
            data: data.map(items => items.soldQuantity), 
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(19, 122, 240, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(34, 177, 46, 0.6)',
                'rgba(196, 34, 142, 0.6)',
                'rgba(17, 201, 176, 0.6)',
                'rgba(123, 34, 196, 0.6)',
                'rgba(255, 0, 0, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(0, 119, 255, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(34, 177, 46, 1)',
                'rgba(196, 34, 142, 1)',
                'rgba(17, 201, 176, 1)',
                'rgba(123, 34, 196, 1)',
                'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Top sản phẩm bán chạy',
            },
        },
    };

    return(
        <div className='max-w-[1400px] mx-auto'>
            {isLoadingDashBoardTopSelling ? (
                <SkeletonChartTopSelling />
            ) : (
                <Bar data={BarChartData} options={options} />
            )}
        </div>
    )
    
    
};
export default BarChart