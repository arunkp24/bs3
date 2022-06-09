import { createSelector } from '@reduxjs/toolkit'
import { IStore } from '../models/Bs3Store';

const selectUser = (state: IStore) => state.user;

export const getUserSelector = createSelector(selectUser, user => user);

export const getUserNameSelector = createSelector(selectUser, user => user.name);

export const getUserIdSelector = createSelector(selectUser, user => user.id);

export const getUserTypeSelector = createSelector(selectUser, user => user.type);