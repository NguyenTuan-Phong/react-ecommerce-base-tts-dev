import { Skeleton } from "antd";
const SkeletonCategory = () => {
    return (
        <div className="grid grid-cols-4 overflow-hidden whitespace-nowrap p-3 gap-3">
            {[...Array(4)].map((_,i) => (
                <div key={i} className="flex-1 bg-[white] rounded-[8px] p-3 flex flex-col gap-3">
                    <Skeleton.Node 
                        active
                        className="w-full!"
                    />
                    <div className="flex">
                        <div className="flex flex-col gap-2 w-full flex-1!">
                            <Skeleton.Input 
                                active
                                className="w-[30%]!"
                            />
                            <Skeleton.Input
                                active
                                className="w-[40%]!"
                            />
                        </div>
                        <Skeleton.Avatar 
                            active
                            className="content-end w-[50px]! "
                            size={50}
                        />
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default SkeletonCategory;
