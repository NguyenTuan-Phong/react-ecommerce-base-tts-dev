import { Skeleton} from "antd";

const OrderCardSkeleton = () => {
    return (
        <div className="bg-[#e9e6e6] p-5">
            <div className="border-b border-dotted pb-5">

                <div className="flex gap-4 justify-end pb-4 border-b border-[#c0bfbf]">
                    <div className="flex gap-1 text-green-600 items-center">
                        <Skeleton.Input active size="small" style={{ width: 120 }} />
                    </div>
                    <div className="bg-[#a1a0a0] w-[1px] h-5" />
                    <Skeleton.Input active size="small" style={{ width: 80 }} />
                </div>

                <div className="flex pt-4 gap-4 items-start">
                    <Skeleton.Image style={{ width: 100, height: 100 }} active />
                    <div className="flex-1">
                        <Skeleton active paragraph={{ rows: 2 }} title={false} />
                    </div>
                    <div className="w-[200px] flex flex-col items-end gap-2">
                        <Skeleton.Input active size="small" style={{ width: 80 }} />
                        <Skeleton.Input active size="default" style={{ width: 100 }} />
                    </div>
                </div>
            </div>

            <div className="bg-[#d2d2d2] p-5 mt-5">
                <div className="flex justify-end gap-4 py-3">
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                    <Skeleton.Input active size="large" style={{ width: 120 }} />
                </div>
                <div className="flex justify-end pb-5">
                    <Skeleton.Button active style={{ width: 100, height: 40 }} />
                </div>
            </div>
        </div>
    );
};

export default OrderCardSkeleton;
