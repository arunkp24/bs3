import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import ticketsSlice from './ticketsSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        tickets: ticketsSlice
    }
});