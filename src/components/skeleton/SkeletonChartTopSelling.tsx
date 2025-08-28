const SkeletonChartTopSelling = () => {
  const bars = [80, 60, 40, 40, 20, 10];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-center text-gray-500 font-medium mb-4">
        Tỷ lệ doanh số theo sản phẩm (Loading...)
      </h2>
      <div className="flex items-end justify-between h-64 border-t border-l border-gray-200 relative overflow-hidden">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 mx-2 animate-pulse bg-gray-300 rounded-t"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
        <div className="w-1/6 text-center">box</div>
        <div className="w-1/6 text-center">Bản chữ K</div>
        <div className="w-1/6 text-center">Sách Lập Trình Java</div>
        <div className="w-1/6 text-center">LAVIE</div>
        <div className="w-1/6 text-center">Áo Hoodie Na1 Form Rộng</div>
        <div className="w-1/6 text-center">Hello</div>
      </div>
    </div>
  );
}

export default SkeletonChartTopSelling;