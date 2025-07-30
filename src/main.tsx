import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ScrollToTop from './components/ScrollToTop';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
const queryClient = new QueryClient();
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <ConfigProvider locale={viVN}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
