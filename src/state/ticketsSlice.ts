import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../models/Ticket';

export const fetchAllTickets = createAsyncThunk('tickets/fetchAllTickets', async () => {
    const response = await fetch('http://localhost:3000/tickets');
    return response.json();
});

export const fetchUserTickets = createAsyncThunk('tickets/fetchUserTickets', async ({ userId }: any, dispatch) => {
    const response = await fetch(`http://localhost:3000/tickets?userId=${userId}`);
    return response.json();
});

export const fetchTicket = createAsyncThunk('tickets/fetchTicket', async ({ id }: any, dispatch) => {
    const response = await fetch(`http://localhost:3000/tickets/${id}`);
    return response.json();
});

export const createTicket = createAsyncThunk('tickets/createTicket', async (payload: any, dispatch) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    const response = await fetch(`http://localhost:3000/tickets/`, options);
    return response.json();
});

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (payload: any, dispatch) => {
    const { id } = payload;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    const response = await fetch(`http://localhost:3000/tickets/${id}`, options);
    return response.json();
});

export const initialState: Ticket[] = []
    
const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllTickets.pending, (state, action) => {}),
        builder.addCase(fetchAllTickets.fulfilled, (state, action) => {
            state = action.payload;
            return state;
        }),
        builder.addCase(fetchAllTickets.rejected, (state, action) => {}),
        builder.addCase(fetchUserTickets.pending, (state, action) => {}),
        builder.addCase(fetchUserTickets.fulfilled, (state, action) => {
            state = action.payload;
            return state;
        }),
        builder.addCase(fetchUserTickets.rejected, (state, action) => {}),
        builder.addCase(fetchTicket.pending, (state, action) => {}),
        builder.addCase(fetchTicket.fulfilled, (state, action) => {
            state[state.findIndex(ticket => ticket.id === action.payload)] = action.payload;
            return state;
        }),
        builder.addCase(fetchTicket.rejected, (state, action) => {}),
        builder.addCase(createTicket.pending, (state, action) => {}),
        builder.addCase(createTicket.fulfilled, (state, action) => {
            return [ ...state, ...action.payload ];
        }),
        builder.addCase(createTicket.rejected, (state, action) => {}),
        builder.addCase(updateTicket.pending, (state, action) => {}),
        builder.addCase(updateTicket.fulfilled, (state, action) => {
            state[state.findIndex(ticket => ticket.id === action.payload.id)] = action.payload;
            return state;
        }),
        builder.addCase(updateTicket.rejected, (state, action) => {})
    },
    reducers: {
        resetTickets: (state, action) => {
            state = initialState;
            return state;
        },
    }
});

export const { resetTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;