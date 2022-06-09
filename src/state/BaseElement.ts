import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import store from './store';
import { Store } from '@reduxjs/toolkit';

export class BaseElement extends LitElement {

    @property({type: Object})
    store: Store;

    constructor() {
        super();
        this.store = store;
    }

    dispatchAction(action: any) {
        this.store.dispatch(action);
    }

}