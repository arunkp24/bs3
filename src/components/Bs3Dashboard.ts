import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Bs3Base } from '../Bs3Base';
import { fetchAllTickets, fetchUserTickets } from './../state/ticketsSlice';
import { getAllTicketsSelector } from './../state/ticketsSelector';
import { Ticket } from '../models/Bs3Ticket';
import { dashboardStyles } from './Bs3Dashboard.style';
import { getUserSelector } from '../state/userSelector';
import { Router } from '@vaadin/router';

@customElement('bs3-dashboard')
export class Bs3Dashboard extends Bs3Base {

    static styles?: CSSResultGroup = dashboardStyles;

    @property()
    tickets: Ticket[] = [];

    connectedCallback() {
        super.connectedCallback();
        const loggedInUser = getUserSelector(this.store.getState());
        if (loggedInUser.type === "admin") {
            this.dispatchAction(fetchAllTickets());
        } else {
            const payload = {
                userId: loggedInUser.id
            };
            this.dispatchAction(fetchUserTickets(payload))
        }
        this.store.subscribe(() => {
            this.tickets = getAllTicketsSelector(this.store.getState());
        })        
    }

    _goToCreateTicket() {
        Router.go('/ticket');
    }

    render() { 
        return html`
            <div class="dashboard_wrapper">
                <div class="dashboard_header">
                    <div><h2>Dashboard - Tickets</h2></div>
                    <div><button class="btn" @click="${this._goToCreateTicket}">Create Ticket</button></div>
                </div>
                <bs3-ticket-list .tickets="${this.tickets}"></bs3-ticket-list>
            </div>
        `; 
    }
}