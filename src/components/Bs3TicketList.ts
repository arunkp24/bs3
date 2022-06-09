import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Bs3Base } from '../Bs3Base';
import { Ticket } from '../models/Bs3Ticket';
import { ticketListStyles } from './Bs3TicketList.style';

@customElement('bs3-ticket-list')
export class Bs3TicketList extends Bs3Base {

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