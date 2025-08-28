import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ScrollToTop from './ScrollToTop';
import './assets/css/TextAnimation.css';
import AlAssistant from './components/AI/AIAssistant';
import { initTheme } from './components/layout/themeUtils';
import MobileBottomNav from './features/homepages/components/MobileBottomNav';
import AppRouter from './router/AppRouter';
import useUserStore from './store/useUserStore';

function App() {
  const role = useUserStore((state) => state.user?.role.name);

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <>
      <ToastContainer
        style={{ zIndex: 9999 }}
        position='top-right'
        autoClose={5000}
        rtl={false}
        limit={3}
      />

      {!(role === 'ROLE_MANAGER') && <MobileBottomNav />}

      <ScrollToTop />

      <AppRouter />

      {!(role === 'ROLE_MANAGER') && (
        <div className='bottom-7 right-5 fixed z-50'>
          <AlAssistant />
        </div>
      )}
    </>
  );
}

export default App;