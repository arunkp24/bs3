import { Commands, Context, Router } from '@vaadin/router';
import { AuthGuard } from './auth/auth-guard';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);
router.setRoutes([
    {
        path: '/',
        action: async (context: Context, commands: Commands) => {
            await import('./components/Header');
            await import('./screens/Home');
            return await new AuthGuard().redirectTo(commands, '/dashboard');
        },
        component: 'bs3-home'
    },
    {
        path: '/home', 
        redirect: '/'
    },
    {
        path: '/login', 
        action: async () => {
            await import('./screens/Login');
        },
        component: 'bs3-login'
    },
    {
        path: '/dashboard', 
        action: async (context: Context, commands: Commands) => {
            await import('./screens/Dashboard');
            return await new AuthGuard().pageEnabled(context, commands, '/');
        },
        component: 'bs3-dashboard'
    },
    {
        path: '/ticket', 
        action: async (context: Context, commands: Commands) => {
            await import('./components/TicketForm');
            return await new AuthGuard().pageEnabled(context, commands, '/');
        },
        children: [
            { path: '/', component: 'bs3-ticket-form' },
            { path: '/:id', component: 'bs3-ticket-form' }
        ]
    },
]);
