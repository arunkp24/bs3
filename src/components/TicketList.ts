import { html, CSSResultGroup, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ticket } from '../models/Bs3Ticket';
import { ticketListStyles } from './TicketList.style';
import './TicketItem';

@customElement('bs3-ticket-list')
export class Bs3TicketList extends LitElement {

    static styles?: CSSResultGroup = ticketListStyles;

    @property({type: Array})
    tickets: Ticket[] = [];

    render() {
        return html`
            <div class="list_wrapper">
                ${this.tickets.map(ticket => html`<bs3-ticket-item class="item" .ticket="${ticket}"></bs3-ticket-item>`)}
            </div>`;
    }
    
}