import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('http://localhost:3000/users');
    return response.json();
});

export const loginUser = createAsyncThunk('users/login', async ({ username, userType}: any) => {
    const response = await fetch(`http://localhost:3000/users?username=${username}&type=${userType}`);
    return response.json();
});

export const initialState: User = {}
    
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {}),
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state = action.payload[0];
            return state;
        }),
        builder.addCase(fetchUsers.rejected, (state, action) => {}),
        builder.addCase(loginUser.pending, (state, action) => {}),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state = action.payload[0];
            return state;
        }),
        builder.addCase(loginUser.rejected, (state, action) => {})
    },
    reducers: {
        resetUser: (state, action) => {
            state = initialState;
            return state;
        }
    }
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;