interface Props {
    data: {
        total: number;
        totalPrice: number;
    };
}
import { Form, Input, Select, Button, Radio, Space} from "antd"
import { useState } from "react"
import { cities } from '../../auth/data/vietnamProvinces'
const Pay = ({data}: Props) => {
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [form] = Form.useForm();
    const handleProvince = (value: string) => {
        setSelectedProvince(value);
        form.setFieldsValue({district: undefined});
    }
    return(
        <div>
        <div className="p-3 bg-[white] rounded-[8px] flex gap-4 flex-col mt-10">
            <div className="flex-1 flex gap-5">
                <div className="flex gap-3 items-center flex-2">
                    <div className="border w-3 h-4 border-y-[2px]"></div>
                    <h1 className="font-bold text-[20px]">ĐỊA CHỈ NHẬN HÀNG</h1>
                </div>
                <div className="flex gap-3 items-center flex-1">
                    <div className="border w-3 h-4 border-y-[2px]"></div>
                    <h1 className="font-bold text-[20px]">HÌNH THỨC THANH TOÁN</h1>
                </div>
            </div>
            <div className="flex-2 gap-5 flex flex-col">
                <Form
                form={form}
                className="flex gap-4"
                initialValues={{
                    methodPay: 'cod'
                }}
                >
                    <div className="flex-1 m-0">
                        <Form.Item className="m-0"
                            name="fullName"
                            rules={[
                                {
                                    required: true, message: "Vui lòng nhập Họ và tên!"
                                }
                            ]}
                        >
                            <Input className="h-12" placeholder="Họ và tên" />
                        </Form.Item>
                        <div className="flex gap-2">
                            <Form.Item className="flex-1 m-0"
                                name="email"
                                rules={[
                                    {
                                        required : true, message : "Vui lòng nhập Email!",
                                        type : "email"
                                    }
                                ]}
                            >
                                <Input className="h-12" placeholder="Email"/>
                            </Form.Item>
                            <Form.Item className="flex-1 m-0"
                                name="phone"
                                rules={[
                                    {
                                        required : true, message : "Vui lòng nhập số điện thoại!"
                                    }
                                ]}
                            >
                                <Input className="h-12" placeholder="Số điện thoại"/>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true, message : "Vui lòng chọn Tỉnh/Thành phố!"
                                }
                            ]}
                        >
                            <Select style={{height:'48px', margin: 0}} placeholder="Tỉnh/Thành phố" onChange={handleProvince}>
                                {cities.map((item) => (
                                    <Select.Option key={item.id} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="district"
                            // dependencies="city"
                            rules={[
                                {
                                    required: true, message : "Vui lòng chọn Quận/Huyện"
                                }
                            ]}
                        >
                            <Select style={{height:'48px', margin: 0}} placeholder="Quận/Huyện">
                                {selectedProvince && 
                                    cities.find(item => item.name === selectedProvince)?.districts?.map((i) => (
                                        <Select.Option key={i.id} value={i.name}>
                                            {i.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item className="m-0"
                            name="address"
                            rules={[
                                {
                                    required : true, message: "Vui lòng nhập địa chỉ của bạn"
                                }
                            ]}
                        >
                            <Input className="h-12" placeholder="Tòa nhà,Tên đường..."/>
                        </Form.Item>
                    </div>
                    <div className="flex-1">
                        <Form.Item
                            name="note"
                        >
                            <Input.TextArea rows={4} style={{minHeight: 191, maxHeight : 191}} placeholder="Nhập ghi chú cho chúng tôi" />
                        </Form.Item>

                        <div className="flex gap-2">
                            <Form.Item className="flex-1">
                                <Button style={{height : 48,background: '#757575',color: 'white'}} className="w-full hover:cursor-pointer">
                                    TẢI ĐƠN HÀNG
                                </Button>
                            </Form.Item>
                            <Form.Item className="flex-1">
                                <Button style={{height : 48,background: '#757575',color : 'white'}} className="h-12 w-full hover:cursor-pointer">
                                    TẢI FILE EXCEL
                                </Button>
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button style={{height :48,background: '#757575',color : 'white'}} className="h-12 w-full hover:cursor-pointer">
                                IN BÁO CÁO
                            </Button>
                        </Form.Item>
                    </div>
                    <div className="text-[16px] flex-1">
                        <Form.Item name="methodPay">
                            <Radio.Group className="flex flex-col gap-4">
                                <Radio value="cod">
                                    Thanh toán khi nhận hàng - COD.
                                </Radio>
                                <Radio value="bank">
                                    Thanh toán trước qua chuyển khoản.
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                        
                        <div className="ml-6 text-sm text-gray-600">
                            <p>Ngân hàng thương mại cổ phần Ngoại thương Việt Nam</p>
                            <p>VIETCOMBANK</p>
                            <p>Số tài khoản: 0541000297408</p>
                            <p>Chủ tài khoản: Hoàng Vĩnh Phúc</p>
                        </div>
                        
                        <div className="mt-5 p-4 bg-[#f5f5f5] ">
                            <Space style={{width:'100%', flex :1}}>
                                <Space.Compact style={{width:'100%'}}>
                                    <Input style={{flex:1 , width : 274}} className="h-12"
                                        placeholder="Mã voucher"
                                    />
                                    <Button style={{height:48, background : "#ee2e24", fontWeight : 'bold',color:'white'}}>
                                        Nhập mã voucher
                                    </Button>
                                </Space.Compact>
                            </Space>
                        </div>

                        <div className="my-[19px] text-end flex justify-end">
                            Tổng tiền hàng (
                                <p className="text-[red]">{data.total} đơn hàng</p>
                            ) : <p className="font-bold text-[red]"> { data.totalPrice.toLocaleString()} VNĐ</p> 
                        </div>

                        <Button htmlType="submit" style={{width:'100%',height : 50,background:"#29a07e",color: 'white', fontWeight : "bold"}}>
                            ĐẶT MUA NGAY
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        </div>
    )
}
export default Pay