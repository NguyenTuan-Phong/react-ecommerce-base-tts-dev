const ShoppingTrend = () => {
    return (
        <section className="w-full bg-orange-50/60">
            <div className="mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="flex items-center justify-center mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 shadow-sm px-10! py-5! text-sm font-semibold 
                    text-white">
                        XU HƯỚNG CÔNG NGHỆ 2025
                    </span>
                </div>

                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    <span className="text-gray-900">Đồ Công Nghệ </span>
                    <span className="text-orange-500">Đỉnh Cao</span>
                </h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto">
                    Khám phá những sản phẩm công nghệ đang làm điên đảo thế giới, được lựa chọn dựa trên dữ liệu
                    thực tế từ hành vi mua sắm và tìm kiếm của hàng triệu tech‑lover
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-orange-100 hover:shadow-md transition-all">
                        <div className="text-3xl font-extrabold text-orange-500">+450%</div>
                        <div className="mt-2 font-semibold text-gray-800">Tăng trưởng tìm kiếm</div>
                        <div className="mt-1 text-xs text-gray-500">So với cùng kỳ năm trước</div>
                    </div>
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-orange-100 hover:shadow-md transition-all">
                        <div className="text-3xl font-extrabold text-orange-500">2.5M+</div>
                        <div className="mt-2 font-semibold text-gray-800">Lượt xem review</div>
                        <div className="mt-1 text-xs text-gray-500">Trên các nền tảng social</div>
                    </div>
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-orange-100 hover:shadow-md transition-all">
                        <div className="text-3xl font-extrabold text-orange-500">95%</div>
                        <div className="mt-2 font-semibold text-gray-800">Khách hàng hài lòng</div>
                        <div className="mt-1 text-xs text-gray-500">Đánh giá 4+ sao</div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-10">
                <div className="mx-auto">
                    <div className="relative isolate rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_8px_30px_rgba(249,115,22,.35)] px-6 py-10 sm:px-10 sm:py-12">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold">
                                <span>🚀</span>
                                <span>Khám Phá Thêm Công Nghệ Đỉnh Cao</span>
                            </div>
                            <p className="text-white/90 text-sm sm:text-base">
                                Hơn <b>10,000+</b> sản phẩm công nghệ mới nhất đang chờ bạn khám phá
                            </p>
                            <button className="
                                bg-white hover:bg-orange-100 text-orange-600 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 
                                transform hover:scale-105 uppercase tracking-wide text-sm hover:cursor-pointer">
                                XEM TẤT CẢ XU HƯỚNG CÔNG NGHỆ &gt;
                            </button>
                        </div>

                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-6 w-[95%] rounded-3xl bg-orange-500/40 blur-xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ShoppingTrend