import { Link } from "react-router-dom";
import { Form, Input, Radio, Button } from "antd";
// import { cities } from "../data/vietnamProvinces";
import { useRegister } from "../hook/useRegister";

const RegisterPage = () => {
  const { isPending, handleRegister } = useRegister();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-red-500">
      <div className="w-[1100px] flex rounded-lg overflow-hidden shadow-lg">
        {/* Bên trái: giới thiệu */}
        <div className="flex-1 bg-black/50 flex flex-col justify-center p-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Tạo tài khoản mới</h1>
          <p className="font-bold leading-relaxed text-[18px]">
            Đăng ký để mua sắm nhanh hơn
          </p>
          <p className="text-sm leading-relaxed">
            Lưu địa chỉ, theo dõi đơn hàng và nhận ưu đãi dành riêng cho bạn.
          </p>
        </div>

        {/* Bên phải: form đăng ký */}
        <div className="flex-1 bg-black/60 flex flex-col justify-center p-10">
          <h2 className="text-white text-2xl font-bold mb-6">
            Đăng ký tài khoản
          </h2>
          <Form
            layout="vertical"
            className="w-full max-w-md"
            onFinish={handleRegister}
            initialValues={{
              gender: "0",
              city: "Hà Nội",
            }}
          >
            <Form.Item
              label={<span className="text-white font-bold">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email đăng ký" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input placeholder="Nhập Email" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-bold">Tên</span>}
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input placeholder="Nhập tên" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-bold">Số điện thoại</span>}
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^(0)[0-9]{9}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input placeholder="Nhập số điện thoại" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-bold">Giới tính</span>}
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Radio.Group >
                <Radio value="0" className="text-white!">Nam</Radio>
                <Radio value="1" className="text-white!">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            {/* <Form.Item
              label={<span className="text-white font-bold">Ngày sinh</span>}
              required
            >
              <div className="flex gap-2">
                <Form.Item
                  name="birthDay"
                  rules={[{ required: true, message: "Chọn ngày" }]}
                  noStyle
                >
                  <Select placeholder="Ngày" size="large" style={{ width: 100 }}>
                    {[...Array(31)].map((_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="birthMonth"
                  rules={[{ required: true, message: "Chọn tháng" }]}
                  noStyle
                >
                  <Select
                    placeholder="Tháng"
                    size="large"
                    style={{ width: 100 }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="birthYear"
                  rules={[{ required: true, message: "Chọn năm" }]}
                  noStyle
                >
                  <Select
                    placeholder="Năm"
                    size="large"
                    style={{ width: 120 }}
                  >
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <Select.Option key={year} value={year}>
                          {year}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </Form.Item> */}

            <Form.Item
              label={<span className="text-white font-bold">Mật khẩu</span>}
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 8, message: "Mật khẩu ít nhất 8 ký tự" },
              ]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input.Password placeholder="Nhập mật khẩu" size="large" />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white font-bold">Nhập lại mật khẩu</span>
              }
              name="re_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input.Password placeholder="Nhập lại mật khẩu" size="large" />
            </Form.Item>

            {/* <Form.Item
              label={<span className="text-white font-bold">Tỉnh/TP</span>}
              name="city"
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Select placeholder="Chọn Tỉnh/TP" size="large">
                {cities.map((city) => (
                  <Select.Option key={city.id} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}

            {/* <Form.Item
              label={<span className="text-white font-bold">Địa chỉ</span>}
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              className="[&_.ant-form-item-explain-error]:text-white!"
            >
              <Input placeholder="Nhập địa chỉ" size="large" />
            </Form.Item> */}

            <Form.Item>
              <Button
                loading={isPending}
                htmlType="submit"
                size="large"
                className="w-full bg-red-500 text-white hover:text-[#fa7833]!"
              >
                {isPending ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
              </Button>
            </Form.Item>
          </Form>

          <p className="text-gray-300 text-sm mt-2">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-green-400">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
