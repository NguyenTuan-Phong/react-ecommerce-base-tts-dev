import { Link, useSearchParams } from 'react-router-dom';
import payment from '../../../assets/Robot/payment.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ImageWithFallback from '../../../components/img/ImageWithFallback';
import vnpay from '../../../assets/img/vnpay.png';
const Payment= () => {
    const [searchParams] = useSearchParams();
    const rawUrl = searchParams.get('url');
    const paymentUrl = rawUrl ? decodeURIComponent(rawUrl) : null;

    if (!paymentUrl) {
        return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '50vh', fontWeight: 'bold', color: 'red'
        }}>
            <p>Không tìm thấy đường dẫn thanh toán.</p>

        </div>
        );
    }

    return (
        <div className='max-w-[1400px] mt-5 mx-auto h-[500px] items-center content-center relative'>
            <section className='flex gap-4 pt-[20px]'>
                <Link style={{ color: 'black', fontWeight: 'bold' }} to={'/'}>
                    TRANG CHỦ
                </Link>
                <p>/</p>
                <p className='font-bold'>THANH TOÁN</p>
            </section>
            <div className='grid grid-cols-1 items-center justify-center h-full md:grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className='sm:hidden md:hidden lg:block'>
                    <ImageWithFallback
                        src={vnpay}
                        alt='Payment Illustration'
                        className='w-[350px] h-[350px] mx-auto'
                    />
                </div>
                <DotLottieReact
                    src={payment}
                    loop
                    autoplay
                    className='w-[400px] h-[400px] mx-auto'
                />
                <div className='sm:hidden md:hidden  lg:block text-center text-lg font-bold'>
                    <b>"Một giao dịch chưa hoàn tất </b><br />
                    <b>cho đến khi thanh toán được thực hiện."</b>
                </div>
            </div>
            
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 font-bold text-blue-600
                -translate-y-1/2 text-center cursor-pointer hover:text-blue-500 hover:underline'
                onClick={() => {
                    window.location.href = paymentUrl;
                }}
            >
                Đến cổng thanh toán
            </div>
        </div>
    );
};

export default Payment;
