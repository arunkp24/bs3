import { html, CSSResultGroup, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { getUserNameSelector } from '../state/userSelector';
import { BaseElement } from '../state/BaseElement';
import { resetTickets } from '../state/ticketsSlice';
import { resetUser } from '../state/userSlice';
import { blueColor, buttonStyle, whiteColor } from '../app.styles';

@customElement('bs3-header')
export class Bs3Header extends BaseElement {

    static styles?: CSSResultGroup = [
        buttonStyle, 
        css`
            header {
                background: ${blueColor};
            }
            .nav {
                position: sticky;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                top: 0;
                color: ${whiteColor};
                margin: 0 5rem;
            }
            .btn {
                background-color: ${whiteColor};
                border-color: ${whiteColor};
                color: ${blueColor};
            }
            .title {
                text-decoration: none;
                color: ${whiteColor};
                cursor: pointer;
            }
        `];

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
                    <div><a class="title" href="/">BS3</a></div>
                    <div>Hello ${this.userName ? this.userName : 'Stranger'}!</div>
                    ${loginLogout}
                </nav>
            </header>
        `;
    }
}