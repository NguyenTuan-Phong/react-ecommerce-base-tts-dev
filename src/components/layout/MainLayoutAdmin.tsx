import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../../store/useUserStore";
import LayoutAdmin from "./LayoutAdmin";


const { Header, Sider, Content } = Layout;

const MainLayoutAdmin = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || user.role?.name !== "ROLE_MANAGER") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Sider collapsible>
        <div className="logo text-white text-xl font-bold p-4">Admin</div>
        <LayoutAdmin />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </Header>

        <Content style={{ margin: "24px", background: "#fff", padding: "24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
