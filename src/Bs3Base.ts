import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import store from './state/store';
import { Store } from '@reduxjs/toolkit';

export class Bs3Base extends LitElement {

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