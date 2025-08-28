import { Link, useLocation } from 'react-router-dom';
import { useCallBackVNPAY } from '../hook/useCallBackVNPAY';
import { Spin } from 'antd';
import SVGSuccess from '../../../components/svg/Success';
import SVGFlase from '../../../components/svg/Flase';

const PaymentResult = () => {
    const location = useLocation();
    const rawUrl = location.search.substring(1);
    const { isPending, vnpayCallbackData } = useCallBackVNPAY(rawUrl);
    const data = vnpayCallbackData || {success: false, message: "Có lỗi xảy ra.Giao dịch của bạn tạm thời bị hoãn."}
    return (
        <div className="max-w-[1400px] mx-auto px-4 py-10 min-150 flex flex-col font-sans">
            <nav className="text-sm text-gray-600 mb-6 gap-3 flex">
                <Link to="/" className="hover:text-black font-semibold">TRANG CHỦ</Link>
                <span className="mx-2">/</span>
                <span className="font-bold text-black">KẾT QUẢ THANH TOÁN</span>
            </nav>

            <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-md shadow-inner">
                {isPending ? (
                    <div className="text-center">
                        <Spin size="large" />
                        <p className="mt-4 text-gray-500 font-medium">Đang xử lý thanh toán, vui lòng chờ...</p>
                    </div>
                ) : (
                    <div className="text-center p-6">
                        <div className="flex justify-center mb-6">
                            {data?.success ? (
                                <SVGSuccess className="w-28 h-28 text-green-500" />
                            ) : (
                                <SVGFlase className="w-28 h-28 text-red-500" />
                            )}
                        </div>

                        <h2 className={`text-2xl font-bold mb-4 ${data?.success ? 'text-green-600' : 'text-red-600'}`}>
                            {data?.message}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {data?.success
                                ? 'Cảm ơn bạn đã thanh toán. Giao dịch đã được xử lý thành công.'
                                : 'Rất tiếc, giao dịch không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.'}
                        </p>

                        <Link
                            to="/"
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
                        >
                            Quay về Trang chủ
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;