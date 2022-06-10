import { html, CSSResultGroup, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { BaseElement } from '../state/BaseElement';
import { fetchAllTickets, fetchUserTickets } from '../state/ticketsSlice';
import { getAllTicketsSelector } from '../state/ticketsSelector';
import { Ticket } from '../models/Ticket';
import { getUserSelector } from '../state/userSelector';
import '../components/TicketList'
import { buttonStyle } from '../app.styles';

@customElement('bs3-dashboard')
export class Bs3Dashboard extends BaseElement {

    static styles?: CSSResultGroup = [
        buttonStyle,
        css`
            .dashboard_wrapper {
                margin: 1rem 5rem;
            }
            .dashboard_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        `
    ];

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