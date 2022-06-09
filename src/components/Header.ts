import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { headerStyles } from './Header.style';
import { getUserNameSelector } from '../state/userSelector';
import { Bs3Base } from '../Bs3Base';
import { resetTickets } from '../state/ticketsSlice';
import { resetUser } from '../state/userSlice';
import { Router } from '@vaadin/router';

@customElement('bs3-header')
export class Bs3Header extends Bs3Base {

    static styles?: CSSResultGroup = headerStyles;

    @property()
    userName: string = '';

    connectedCallback(): void {
        super.connectedCallback();
        this.store.subscribe(() => {
            this.userName = getUserNameSelector(this.store.getState()) as string;
        });
    }

    logout() {
        this.dispatchAction(resetUser(this.store.getState()));
        this.dispatchAction(resetTickets(this.store.getState()));
        Router.go('/')
    }

    render() {
        let loginLogout;
        if (!this.userName) {
            loginLogout = html`<div><a class="btn" href="/login">Login</a></div>`;
        } else {
            loginLogout = html`<div><a class="btn" @click="${this.logout}">Logout</a></div>`
        }
        return html`
            <header>
                <nav class="nav">
                    <div><a class="title" href="/home">BS3</a></div>
                    <div>Hello ${this.userName ? this.userName : 'Stranger'}!</div>
                    ${loginLogout}
                </nav>
            </header>
        `;
    }
}