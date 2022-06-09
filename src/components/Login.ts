import { html, CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { User } from '../models/Bs3User';
import { loginUser } from '../state/userSlice';
import { getUserSelector } from '../state/userSelector';
import { Bs3Base } from '../Bs3Base';
import { Router } from '@vaadin/router';
import { loginStyles } from './Login.style';

@customElement('bs3-login')
export class Bs3Login extends Bs3Base {

    static styles?: CSSResultGroup = loginStyles;

    @query('#username') private username: HTMLInputElement | undefined;
    @query('#password') private password: HTMLInputElement | undefined;
    @query('#user_type') private userType: HTMLSelectElement | undefined;

    @property()
    loggedInUser: User = {}

    connectedCallback(): void {
        super.connectedCallback();
        this.store.subscribe(() => {
            this.loggedInUser = getUserSelector(this.store.getState());
            if (!this._isEmpty(this.loggedInUser) && location.pathname !== '/dashboard') {
                // Redirect to dashboard
                Router.go('/dashboard');
            }
        });
    }

    private _submit(e: Event) {
        e.preventDefault();
        if (this._checkForErrors()) {
            // Display errors here
        } else {
            const payload = {
                username: this.username?.value,
                userType: this.userType?.value
            };
            this.dispatchAction(loginUser(payload));    
        }
    }

    private _checkForErrors() {
        return !this.username?.value || !this.password?.value
    }

    private _isEmpty(param: Object) {
        return Object.keys(param).length === 0;
    }

    render() {
        return html`
            <div class="login_wrapper">
                <div>
                    <label for="userType">User Type</label>
                    <select id="user_type" name="userType">
                        <option value="admin">Admin</option>
                        <option value="consumer">Consumer</option>
                    </select>
                </div>
                <div>
                    <label for="username">Username</label>
                    <input id="username" type="textbox" placeholder="Username" name="username" required autocomplete="off">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Password" name="password">
                </div>
                <div>
                    <button @click="${this._submit}">Submit</button>
                </div>
            </div>
        `;
    }
}