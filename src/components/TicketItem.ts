import { Router } from '@vaadin/router';
import { html, CSSResultGroup, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ticket } from '../models/Bs3Ticket';
import { ticketItemStyles } from './TicketItem.style';

@customElement('bs3-ticket-item')
export class Bs3TicketItem extends LitElement {

    static styles?: CSSResultGroup = ticketItemStyles;

    @property()
    ticket: Ticket = {}

    _getTicketStatus(status: string | undefined) {
        let statusColor;
        switch(status) {
            case 'open':
                statusColor = 'orange';
                break;
            case 'active':
                statusColor = 'green';
                break;
            case 'resolved':
                statusColor = 'red'
                break;
            default:
                statusColor = 'orange';
                break;
        }
        return statusColor;
    }

    _goToTicket() {
        Router.go(`/ticket/${this.ticket.id}`)
    }

    render() {
        const statusClass = this._getTicketStatus(this.ticket.status);
        return html`
            <div class="card" @click="${this._goToTicket}">
                <div class="card_body">${this.ticket.short_description}</div>
                <div class="card_footer">
                    <div class="owner">${this.ticket.user?.name}</div>
                    <div class="status ${statusClass}"></div>
                </div>
            </div>
        `;
    }
}