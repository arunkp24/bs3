import { Router } from '@vaadin/router';
import { html, CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Bs3Base } from '../Bs3Base';
import { Ticket } from '../models/Bs3Ticket';
import { User } from '../models/Bs3User';
import { getAllTicketsSelector } from '../state/ticketsSelector';
import { createTicket, updateTicket } from '../state/ticketsSlice';
import { getUserSelector } from '../state/userSelector';
import { ticketFormStyles } from './TicketForm.style';

@customElement('bs3-ticket-form')
export class Bs3TicketForm extends Bs3Base {

    static styles?: CSSResultGroup = ticketFormStyles;

    @query('#short_desc') private short_desc: HTMLInputElement | undefined;
    @query('#desc') private desc: HTMLInputElement | undefined;
    @query('#status') private status: HTMLSelectElement | undefined;

    @property()
    ticket: Ticket = {};

    @property()
    tickets: Ticket[] = [];

    @property()
    user: User = {};

    connectedCallback() {
        super.connectedCallback();
        const ticketId = location.pathname.split('/').pop();
        if (!isNaN(Number(ticketId))) {
            this.tickets = getAllTicketsSelector(this.store.getState());
            this.ticket = this.tickets.find(ticket => ticket.id == ticketId) as Ticket;    
        }
        this.user = getUserSelector(this.store.getState());
    }

    _isAdmin() {
        return this.user.type === 'admin';
    }

    _updateTicket() {
        const payload = {
            id: this.ticket.id,
            short_description: this.short_desc?.value,
            description: this.desc?.value,
            status: this._isAdmin() ? this.status?.value : 'open',
        };
        this.dispatchAction(updateTicket(payload));
        Router.go('/dashboard');
    }

    _createTicket() {
        const payload: Ticket = {
            short_description: this.short_desc?.value,
            description: this.desc?.value,
            status: this._isAdmin() ? this.status?.value : 'open',
            created_at: "9/06/2022",
            userId: this.user.id,
            user: this.user,
            resolved_by: null
        }
        this.dispatchAction(createTicket(payload));
        Router.go('/dashboard');
    }

    _renderStatus() {
        let statusHTML = html``;
        if (this._isAdmin()) {
            statusHTML = html`
            <div>
                <label for="status">Status</label>
                <select id="status" name="status" .value="${this.ticket.status ? this.ticket.status : 'open'}">
                    <option value="open">Open</option>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
            `;
        }
        return statusHTML;
    }

    render() {
        let btn;
        if (Object.keys(this.ticket).length > 0) {
            btn = html`<button @click="${this._updateTicket}">Update</button>`
        } else {
            btn = html`<button @click="${this._createTicket}">Submit</button>`
        }
        return html`
        <div class="login_wrapper">
            <div>
                <label for="short_desc">Short Description</label>
                <input id="short_desc" type="textbox" name="short_desc" .value="${this.ticket?.short_description ? this.ticket?.short_description : ''}" required autocomplete="off">
            </div>
            <div>
                <label for="desc">Description</label>
                <textarea id="desc" name="desc">${this.ticket.description}</textarea>
            </div>
            ${this._renderStatus()}
            <div>
                ${btn}
            </div>
        </div>
        `;
    }
    
}