import { LitElement, html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { homeStyles } from './Bs3Home.style';

@customElement('bs3-home')
export class Bs3Home extends LitElement {

    static styles?: CSSResultGroup = homeStyles;

    render() { 
        return html`
            <div class="home_page_wrapper">
                <p>Welcome to</p>
                <h1>Banking Service Support System</h1>
                <div><a class="btn" href="/login">Login</a></div>
            </div>
        `; 
    }
}