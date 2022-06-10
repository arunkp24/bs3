import { html, CSSResultGroup, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ticket } from '../models/Ticket';
import './TicketItem';

@customElement('bs3-ticket-list')
export class Bs3TicketList extends LitElement {

    static styles?: CSSResultGroup = css`
        .list_wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
        }
        .item {
            flex-basis: 30%;
        }
    `;

    @property({type: Array})
    tickets: Ticket[] = [];

    render() {
        return html`
            <div class="list_wrapper">
                ${this.tickets.map(ticket => html`<bs3-ticket-item class="item" .ticket="${ticket}"></bs3-ticket-item>`)}
            </div>`;
    }
    
}