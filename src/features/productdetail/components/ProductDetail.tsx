import { Button, Card, Col, Row, Typography } from "antd";
import { useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast} from "react-toastify";

import {
  CreditCardOutlined,
  InboxOutlined,
  TruckOutlined,
  CheckSquareOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./ProductDetail.css";
// import { useCategories } from "../hook/useCategories";
import type { Product } from "../../../types";
import useUserStore from "../../../store/useUserStore";
import useCartStore from "../../../store/useCartStore";
// import { useCategoryStore, useProductStore } from "../../../store";
import { useProductById } from "../hook/useProductById";

const { Title } = Typography;

const ProductDetail: React.FC = () => {
  // Lấy id sản phẩm từ route
  const { id } = useParams<{ id: string }>();

  // Lấy danh sách sản phẩm
  // const setProduct = useProductStore((s) => s.setProducts);

  // Lấy danh sách categories để truyền cho ViewProductByType
  // const { data: categories } = useCategories();
  // const setCategories = useCategoryStore((cat) => cat.setCategories);

  const [number, setNumber] = useState(1);
  // const [recentProducts, setRecentProducts] = useState<Product[]>([]);

 

   const navigate = useNavigate();

    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const addToCart = useCartStore((state) => state.addToCart);
const { data: product, isLoading, error } = useProductById(id);

    
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Không tìm thấy sản phẩm!</div>;


if (!product) {
  console.warn("Không tìm thấy sản phẩm có id =", id);
  return <div>Không tìm thấy sản phẩm!</div>;
}
  if (!product) {
  console.error("Không tìm thấy sản phẩm với id:", id);
  return <div>Không tìm thấy sản phẩm!</div>;
}

  

  //Nút thêm giỏ hàng
    const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      code: product.code,
      price: product.price,
      quantity: product.quantity ?? 1,
      image: product.imageUrl,
    });

    toast.success('Thêm vào giỏ hàng thành công!');
  };



  return (
    <div className="max-w-[1400px] mx-auto">
      <section className="flex gap-4 py-[20px]">
        <Link style={{ color: "black", fontWeight: "bold" }} to={"/"}>
          TRANG CHỦ
        </Link>
        <p>/</p>
        <p className="font-bold">CHI TIẾT SẢN PHẨM</p>
      </section>
      <Row
        gutter={[48, 48]}
        align="middle"
        className="rounded-xl shadow p-4 relative overflow-hidden bg-white max-w-[1400px] m-0!">
        <Col xs={24} md={8} lg={8}>
          <Card
            style={{ padding: "10px", justifyContent: "center" }}
            cover={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ objectFit: "cover", height: 350, width: 300 }}
                />
              </div>
            }
          />
        </Col>
        <Col xs={24} md={9} lg={9}>
          <div>
            <Title level={3}>{product.name}</Title>
            <span style={{ color: "#8b8681" }}>Mã SP: {product.code}</span>
            <Title level={4}>
              {product.price.toLocaleString()} VNĐ

            </Title>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "20px",
                fontSize: "15px",
              }}>
              <p style={{ color: "#8b8681" }}>Số lượng</p>
              <Button
                onClick={() => setNumber((n) => Math.max(1, n - 1))}
                disabled={number === 1}>
                -
              </Button>
              <p>{number}</p>
              <Button onClick={() => setNumber((n) => n + 1)}>+</Button>
            </div>
          </div>
          <Row gutter={[32, 32]} align="middle" style={{ marginTop: "20px" }}>
            <Col xs={24} md={12} lg={10}>
              <Button
                style={{
                  fontWeight: "bold",
                  borderRadius: "10px",
                  backgroundColor: "#22a085",
                  color: "white",
                }}
                block
                onClick={() => handleAddToCart({ ...product, quantity: number })}>
                Thêm vào giỏ
              </Button>
            </Col>
            <Col xs={24} md={12} lg={10}>
              <Button
                style={{
                  fontWeight: "bold",
                  borderRadius: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
                type="primary"
                block
                //onClick={handleBuyNow}
                >
                Mua Ngay
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={7} lg={7}>
          <Card
            className="policy-card"
            title={
              <div className="policy-card-title">CHÍNH SÁCH MUA HÀNG</div>
            }>
            <div className="static-items">
              <div className="policy-list">
                <p className="item">
                  <i className="icon">
                    <CreditCardOutlined />
                  </i>
                  <span>Thanh toán thuận tiện</span>
                </p>
                <p className="item ">
                  <i className="icon">
                    <CheckSquareOutlined />
                  </i>
                  <span>Sản phẩm 100% chính hãng</span>
                </p>
                <p className="item ">
                  <i className="icon">
                    <InboxOutlined />
                  </i>
                  <span>Bảo hành nhanh chóng</span>
                </p>
                <p className="item ">
                  <i className="icon">
                    <TruckOutlined />
                  </i>
                  <span>Bảo hành nhanh chóng</span>
                </p>
              </div>
            </div>
          </Card>
          <Card
            className="policy-card"
            title={<div className="policy-card-title">HOTLINE HỖ TRỢ</div>}>
            <div className="static-items">
              <div>
                <a href="tel:094.359.2222" className="item ">
                  <i className="icon">
                    <PhoneOutlined />
                  </i>
                  <span>Hotline CSKH: 0349.296.461</span>
                </a>
                <a href="tel:094.359.2222" className="item">
                  <i className="icon">
                    <PhoneOutlined />
                  </i>
                  <span>Tư vấn khách hàng: 0349.296.461</span>
                </a>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Sản phẩm đã xem */}
      {/* {recentProducts.length > 0 && (
        <div className="mt-5 mb-5">
          <ViewProductByType
            products={recentProducts}
            categories={categories}
            title="Sản phẩm đã xem"
          />
        </div>
      )} */}

      {/* <section className="max-w-[1400px] mx-auto my-5">
        <Feedback />
      </section> */}
    </div>
  );
};

export default ProductDetail;