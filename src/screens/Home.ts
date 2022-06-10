import { LitElement, html, CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { blueColor, buttonStyle, whiteColor } from '../app.styles';

@customElement('bs3-home')
export class Bs3Home extends LitElement {

    static styles?: CSSResultGroup = [
        buttonStyle,
        css`
            .home_page_wrapper {
                margin: 2rem 5rem;
                background: ${whiteColor};
                padding: 3rem;
                text-align: center;
            }
            h1 {
                color: ${blueColor};
            }
            .btn {
                padding: 0.5rem 1rem;
                background-color: ${blueColor};
                border-color: ${blueColor};
                color: ${whiteColor};
                text-decoration: none;
                cursor: pointer;
            }
        `];

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