import { createSelector } from '@reduxjs/toolkit'
import { IStore } from '../models/Store';

const selectTickets = (state: IStore) => state.tickets;

export const getAllTicketsSelector = createSelector(selectTickets, tickets => tickets);
