import { Button, Form, Upload } from "antd"
import {
    CloseOutlined,
    UploadOutlined
} from "@ant-design/icons"
import { useSearchProductByImage } from "../hook/useSearchProductByImage"
import { toast } from "react-toastify"
import { getImageEmbedding } from "../../mobilenet/getImageEmbedding"
import { useState } from "react"
import ImageWithFallback from "../../img/ImageWithFallback"
import SVGImage from "../../svg/Image"
import { Link } from "react-router-dom"
interface SearchProp {
    setShowSeach: (value: boolean) => void
}

const SearchByImage = ({ setShowSeach }: SearchProp) => {
    const [isEmbedding, setIsEmbedding] = useState(false);
    const {
        isPendingSeachProductByImage,
        handleSeachProductByImage,
        ResponseSearchProductByImage
    } = useSearchProductByImage()

    const dataSearchProductByImage = ResponseSearchProductByImage?.data || []

    const handleSubmit = async (values: any) => {
        const imageFile = values.imageFile?.[0]?.originFileObj;
        
        if (!imageFile || !(imageFile instanceof File)) {
            toast.error("Ảnh không hợp lệ!");
            return;
        }
        
        setIsEmbedding(true);
        let embedding;
        try {
            embedding = await getImageEmbedding(imageFile);
        } catch (err) {
            toast.error("Lỗi khi sinh vector từ ảnh!");
            setIsEmbedding(false);
            return;
        }
        setIsEmbedding(false);
        const data = {
            embedding:embedding!
        }

        handleSeachProductByImage(data)
    }
    return(
        <div className="w-110 h-155 bg-[white] border border-gray-300 p-2 relative rounded-[5px] shadow-md ">
            <div className="absolute flex top-1 right-1 hover:border hover:border-gray-300 w-10 h-10 justify-center hover:cursor-pointer rounded-[5px]"
            onClick={() => setShowSeach(false)}
            >
                <CloseOutlined />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex gap-5 leading-normal items-end">
                    <b className="">TÌM KIẾM SẢN PHẨM BẰNG HÌNH ẢNH</b>
                    <SVGImage 
                        className={"w-8 h-8"}
                    />
                </div>
                
                <Form onFinish={handleSubmit}>
                    <div className="grid grid-cols-2">
                        <div>
                            <Form.Item
                                name="imageFile"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                rules={[{ required: true, message: "Vui lòng tải ảnh sản phẩm" }]}
                                >
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    className="h-10! w-50!"
                                    itemRender={(_,file) => (
                                    <div className="mt-3">
                                        <div className="p-2 border border-gray-300 w-29 h-29 rounded-[5px]">
                                            <img 
                                            src={file.url || URL.createObjectURL(file.originFileObj!)} 
                                            alt="" 
                                            className="w-25 h-25 border border-gray-300 rounded-[5px]"
                                            />
                                        </div>
                                    </div>
                                    )}
                                >
                                    <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                                </Upload>
                            </Form.Item>

                        </div>
                        <div className="flex justify-end items-end">
                            <Form.Item>
                                <Button
                                htmlType="submit"
                                className="p-5! h-10! w-35! bg-green-600! text-white! font-bold!"
                                loading={isPendingSeachProductByImage || isEmbedding}
                                >
                                    TÌM KIẾM
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                    
                </Form>
            </div>
            <div className="overflow-y-auto h-93 flex flex-col gap-1">
                {dataSearchProductByImage.map((items) => (
                    <Link to={`/products/${items.id}`}>
                        <div key={items.id} className="border border-gray-300 p-3 flex gap-5 rounded-[5px]">
                            <ImageWithFallback
                                src={items.imageUrl}
                                className="w-10 h-10 flex-shrink-0"
                                alt={items.name}
                            />
                            <div className="leading-normal text-black w-50">
                                <b className="text-[16px] font-bold line-clamp-2 text-black truncate">{items.name}</b>
                                <p>CODE: {items.code}</p>
                            </div>
                            <div className="leading-normal content-end text-end flex-1">
                                <b className="text-red-600">{items.price.toLocaleString()} VNĐ</b>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default SearchByImage