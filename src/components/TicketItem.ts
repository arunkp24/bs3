import { Router } from '@vaadin/router';
import { html, CSSResultGroup, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { borderColor, greenColor, orangeColor, redColor, whiteColor } from '../app.styles';
import { Ticket } from '../models/Ticket';

@customElement('bs3-ticket-item')
export class Bs3TicketItem extends LitElement {

    static styles?: CSSResultGroup = css`
        .card {
            background: ${whiteColor};
            cursor: pointer;
        }
        .card_body {
            padding: 2rem;
        }
        .card_footer {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem;
            border-top: 1px solid ${borderColor};
        }
        .status {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
        }
        .red {
            background-color: ${redColor};
        }
        .orange {
            background-color: ${orangeColor};
        }
        .green {
            background-color: ${greenColor};
        }
        .owner {
            font-size: 12px;
            font-style: italic;
        }
    `;

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