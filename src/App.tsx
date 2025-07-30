import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
import "./App.css";
import LayoutFooter from "./components/layout/LayoutFooter";
import LayoutHeader from "./components/layout/LayoutHeader";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "./store/useUserStore";
import  ScrollToTop from './ScrollToTop';
import MobileBottomNav from "./features/homepages/components/MobileBottomNav";

function App() {
  const role = useUserStore((state) => state.user?.role.name)

  return (
    <>
    
      <ToastContainer
        style={{ zIndex: 9999 }}
        position="top-right"
        autoClose={5000}
        rtl={false}
        limit={3}
      />
      {!(role === "ROLE_MANAGER") && <MobileBottomNav />}
      <Layout className="min-h-screen w-full bg-[#f0f2f5] overflow-hidden" >
        <Header
          style={{
            width: "100%",
            zIndex: 1000,
            background: "#f0f2f5",
            padding: 0,
            height: "auto",
            position:'sticky'
          }}>
          <LayoutHeader />
        </Header>
        {role === "ROLE_MANAGER" ? (
          <Content
            style={{
              background: "#f0f2f5",
              width: "100%",
              padding: 0,
              minHeight: "calc(100vh -70px)"
            }}>
            <AppRouter />
          </Content>
        ) : (
          <Content
            className="max-w-[1400px] mx-auto px-4"
            style={{
              background: "#f0f2f5",
              width: "100%",
            }}>
               <ScrollToTop />
            <AppRouter />
          </Content>
        )}
        
        {!(role === "ROLE_MANAGER") &&
          <Footer
            style={{
              width: "100%",
              padding: 0,
            }}>
            <LayoutFooter />
          </Footer>
           
        }
        
      </Layout>
    </>
  );
}

export default App;