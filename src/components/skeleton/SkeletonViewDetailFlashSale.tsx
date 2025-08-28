import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

const SkeletonViewDetailFlashSale = () => {
  const navigate = useNavigate();

  return (
    <div className='h-full overflow-y-auto'>
      <div>
        <Button className='bg-[#fa7833] text-white' onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
      </div>
      <div className='text-center text-[22px] p-3'>
        <Skeleton.Input active className='w-3/4 mx-auto' />
      </div>
      <div className='bg-white flex flex-col gap-5'>
        <div className='flex gap-20'>
          <Skeleton.Input active className='w-1/3' />
          <Skeleton.Input active className='w-1/3' />
        </div>
        <div className='space-y-6'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 flex-wrap'>
            {[...Array(5)].map((_, index) => (
              <Card
                key={index}
                className='flex flex-col p-3 bg-white rounded-[8px] flex-shrink-0 h-85'
                style={{ borderRadius: 8, margin: 8 }}
              >
                <Skeleton.Image active className='h-40 w-full' />
                <div className='mt-3 space-y-2 flex flex-col flex-1'>
                  <Skeleton.Input active className='w-3/4' />
                  <Skeleton.Input active className='w-full' />
                  <div className='flex gap-5'>
                    <Skeleton.Button active className='w-1/2' />
                    <Skeleton.Avatar active />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonViewDetailFlashSale;
