import { Form, Input, Button } from "antd";
import { FacebookOutlined, TwitterOutlined, GoogleOutlined } from "@ant-design/icons";
import { useLogin } from "../hook/useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isPending, handleLogin } = useLogin();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-red-500">
      <div className="w-[900px] h-[500px] flex rounded-lg overflow-hidden shadow-lg">

        <div className="flex-1 bg-black/50 flex flex-col justify-center p-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome back!</h1>
          <p className="font-bold leading-relaxed text-[18px]">Đăng nhập để mua sắm nhanh hơn</p>
          <p className="text-sm leading-relaxed"> 
            Lưu địa chỉ, theo dõi đơn hàng và nhận ưu đãi dành riêng cho bạn.
          </p>
        </div>

    
        <div className="flex-1 bg-black/60 flex flex-col justify-center p-10">
          <h2 className="text-white text-2xl font-bold mb-6">Đăng nhập</h2>
          <Form 
          layout="vertical" 
          className="w-full max-w-sm"
          name="form_login"
          onFinish={handleLogin}
          >
            
            <Form.Item label={<span className="text-white font-bold">
              Email</span>} name="email" 
              rules={[ { required: true, message: "Nhập email của bạn!" }, 
              { type: "email", message: "Invalid email" }, ]} 
              className="[&_.ant-form-item-explain-error]:text-white!" > 
              <Input placeholder="Nhập email của bạn" size="large" /> 
            </Form.Item> 
            <Form.Item label={<span className="text-white font-bold">
              Mật khẩu</span>} name="password" 
              rules={[ { required: true, message: "Nhập mật khẩu của bạn!" }, ]} 
              className="[&_.ant-form-item-explain-error]:text-white!" > 
              <Input.Password placeholder="Nhập mật khẩu của bạn!" size="large" /> 
            </Form.Item>
            <Link className="justify-end! text-white!" to={'/forget'}>Quên mật khẩu ?</Link>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-500"></div>
              <span className="px-2 text-gray-300">OR</span>
              <div className="flex-1 h-px bg-gray-500"></div>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <Button shape="circle" icon={<FacebookOutlined />} />
              <Button shape="circle" icon={<TwitterOutlined />} />
              <Button shape="circle" icon={<GoogleOutlined />} />
            </div>

           
            <Form.Item>
              <Button loading={isPending} 
              htmlType="submit" size="large" 
              className="w-full bg-red-500 text-white hover:text-[#fa7833]!" > 
              {isPending ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"} </Button>
            </Form.Item>
            
          </Form>

          <p className="text-gray-300 text-sm mt-2">
           Bạn chưa có tài khoản? {" "}
            <Link to={"/register"} className="text-green-400">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
