import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../../store/useUserStore";
import { initTheme } from "./themeUtils";
import MobileBottomNav from "../../features/homepages/components/MobileBottomNav";
import LayoutHeader from "./LayoutHeader";
import ScrollToTop from "../../ScrollToTop";
import LayoutFooter from "./LayoutFooter";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const role = useUserStore((state) => state.user?.role.name);

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <Layout className="min-h-screen w-full bg-[#f0f2f5] overflow-hidden">
      {!(role === "ROLE_MANAGER") && <MobileBottomNav />}

      <Header
        style={{
          width: "100%",
          zIndex: 1000,
          background: "#f0f2f5",
          padding: 0,
          height: "auto",
          position: "sticky",
        }}
      >
        <LayoutHeader />
      </Header>

      <Content className="max-w-[1600px] mx-auto w-full">
        <ScrollToTop />
        <Outlet />
      </Content>

      {!(role === "ROLE_MANAGER") && (
        <Footer style={{ width: "100%", padding: 0 }}>
          <LayoutFooter />
        </Footer>
      )}

    </Layout>
  );
};

export default MainLayout;
