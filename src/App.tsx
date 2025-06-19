import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
import "./App.css";
import LayoutFooter from "./components/layout/LayoutFooter";
import LayoutHeader from "./components/layout/LayoutHeader";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

 

  return (
    <>
      <ToastContainer
        style={{ zIndex: 9999 }}
        position="top-right"
        autoClose={5000}
        rtl={false}
      />
      <Layout className="layout" style={{ minHeight: "100vh", width: "100%" }}>
        <Header
          style={{
            width: "100%",
            zIndex: 1000,
            background: "#f0f2f5",
            padding: 0,
            height: "auto",
          }}>
          <LayoutHeader />
        </Header>
        <Content
          className="max-w-[1400px] mx-auto"
          style={{
            background: "#f0f2f5",
            width: "100%",
            minWidth: 500,
          }}>
          <AppRouter />
        </Content>

        <Footer
          style={{
            width: "100%",
            padding: 0,
          }}>
          <LayoutFooter />
        </Footer>
      </Layout>
    </>
  );
}

export default App;
