import { Commands, Context, Router } from '@vaadin/router';
import { AuthGuard } from './auth/auth-guard';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);
router.setRoutes([
    {
        path: '/',
        action: async () => {
            await import('./components/Home')
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
            await import('./components/Login')
        },
        component: 'bs3-login'
    },
    {
        path: '/dashboard', 
        component: 'bs3-dashboard',
        action: async (context: Context, commands: Commands) => {
            return await new AuthGuard().pageEnabled(context, commands, '/');
        }
    },
    {
        path: '/ticket', 
        children: [
            { path: '/', component: 'bs3-ticket-form' },
            { path: '/:id', component: 'bs3-ticket-form' }
        ]
    },
]);
