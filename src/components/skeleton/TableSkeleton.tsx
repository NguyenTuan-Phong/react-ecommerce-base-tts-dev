const TableSkeleton = () => {
    const rows = Array.from({ length: 5 });

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">STT</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Avatar</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên tài khoản</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giá</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thời gian tạo</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((_, index) => (
                        <tr key={index} className="animate-pulse hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div className="h-4 w-6 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableSkeleton;