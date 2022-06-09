import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Store } from '@reduxjs/toolkit';
import store from './store';

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