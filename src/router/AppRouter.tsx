import { useRoutes} from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { routerCustomer } from './RouterCustomer';
import { routerAdmin } from './RouterAdmin';

const AppRouter = () => {
    const role = useUserStore().user?.role;
    
    const router = role?.name === "ROLE_MANAGER" ? routerAdmin : routerCustomer;
    return (
        useRoutes(router)
    )
}

export default AppRouter;