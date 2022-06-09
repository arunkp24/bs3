import { createSelector } from '@reduxjs/toolkit'
import { IStore } from '../models/Bs3Store';

const selectTickets = (state: IStore) => state.tickets;

export const getAllTicketsSelector = createSelector(selectTickets, tickets => tickets);
