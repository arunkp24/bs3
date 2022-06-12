import { expect } from "@open-wc/testing";
import store from "../src/state/store";
import sinon from 'sinon';
import { createTicket, fetchAllTickets, fetchTicket, fetchUserTickets, updateTicket } from "../src/state/ticketsSlice";
import { Ticket } from "../src/models/Ticket";

describe('ticketsSlice', () => {
    let sinonStub: any;
    let stubResponse: any;
    let ticketsList: Ticket[];
    beforeEach(() => {
        stubResponse = (body: any) => {
            const options = {
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const response = new Response(JSON.stringify(body), options);
            return Promise.resolve(response);
        }
        ticketsList = [
            {
                "id": 1,
                "short_description": "Excision vaginal lesion",
                "description": "Excision or destruction of lesion of vagina",
                "status": "active",
                "created_at": "12/8/2021",
                "userId": 2,
                "user": {
                    "id": 2,
                    "name": "Sharline Peirce",
                    "username": "speirce1",
                    "email": "speirce1@scribd.com",
                    "type": "consumer"
                },
                "resolved_by": {
                    "id": 6,
                    "name": "Titos Bayless",
                    "username": "titos",
                    "email": "tbayless5@theglobeandmail.com",
                    "type": "admin"
                }
            },
            {
                "id": 2,
                "short_description": "Soft tissue division NEC",
                "description": "Other division of soft tissue",
                "status": "active",
                "created_at": "8/2/2021",
                "userId": 1,
                "user": {
                    "id": 1,
                    "name": "Amberly Tunnicliffe",
                    "username": "admin",
                    "email": "atunnicliffe0@twitpic.com",
                    "type": "admin"
                },
                "resolved_by": null
            },
            {
                "id": 3,
                "short_description": "Polypectomy of rectum",
                "description": "[Endoscopic] polypectomy of rectum",
                "status": "active",
                "created_at": "6/21/2021",
                "userId": 8,
                "user": {
                    "id": 8,
                    "name": "Ebony Challens",
                    "username": "echallens7",
                    "email": "echallens7@indiatimes.com",
                    "type": "admin"
                },
                "resolved_by": null
            },
            {
                "id": 4,
                "short_description": "Thorac sm bowel interpos 1",
                "description": "Intrathoracic esophageal anastomosis with interposition of small bowel 1",
                "status": "resolved",
                "created_at": "3/11/2022",
                "userId": 1,
                "user": {
                    "id": 1,
                    "name": "Amberly Tunnicliffe",
                    "username": "admin",
                    "email": "atunnicliffe0@twitpic.com",
                    "type": "admin"
                },
                "resolved_by": null
            },
            {
                "id": 5,
                "short_description": "Opn/oth rep aortic valve",
                "description": "Open and other replacement of aortic valve",
                "status": "open",
                "created_at": "8/17/2021",
                "userId": 9,
                "user": {
                    "id": 9,
                    "name": "Moira Pighills",
                    "username": "mpighills8",
                    "email": "mpighills8@youku.com",
                    "type": "consumer"
                },
                "resolved_by": null
            },
            {
                "id": 6,
                "short_description": "Ext fat for grft/banking",
                "description": "Extraction of fat for graft or banking",
                "status": "open",
                "created_at": "8/10/2021",
                "userId": 10,
                "user": {
                    "id": 10,
                    "name": "Berna Lomath",
                    "username": "blomath9",
                    "email": "blomath9@mit.edu",
                    "type": "consumer"
                },
                "resolved_by": null
            },
            {
                "id": 7,
                "short_description": "Debrid opn fx-metac/car",
                "description": "Debridement of open fracture site, carpals and metacarpals",
                "status": "resolved",
                "created_at": "1/28/2022",
                "userId": 4,
                "user": {
                    "id": 4,
                    "name": "Kesley Cobello",
                    "username": "kcobello3",
                    "email": "kcobello3@nifty.com",
                    "type": "consumer"
                },
                "resolved_by": {
                    "id": 8,
                    "name": "Ebony Challens",
                    "username": "echallens7",
                    "email": "echallens7@indiatimes.com",
                    "type": "admin"
                }
            },
            {
                "id": 8,
                "short_description": "Bladder neck dilation",
                "description": "Dilation of bladder neck",
                "status": "active",
                "created_at": "1/24/2022",
                "userId": 8,
                "user": {
                    "id": 8,
                    "name": "Ebony Challens",
                    "username": "echallens7",
                    "email": "echallens7@indiatimes.com",
                    "type": "admin"
                },
                "resolved_by": null
            },
            {
                "id": 9,
                "short_description": "Rev jt repl upper extrem",
                "description": "Revision of joint replacement of upper extremity",
                "status": "resolved",
                "created_at": "6/14/2021",
                "userId": 10,
                "user": {
                    "id": 10,
                    "name": "Berna Lomath",
                    "username": "blomath9",
                    "email": "blomath9@mit.edu",
                    "type": "consumer"
                },
                "resolved_by": {
                    "id": 1,
                    "name": "Amberly Tunnicliffe",
                    "username": "admin",
                    "email": "atunnicliffe0@twitpic.com",
                    "type": "admin"
                }
            },
            {
                "id": 10,
                "short_description": "Other destru urethra les",
                "description": "Other local excision or destruction of lesion or tissue of urethra",
                "status": "open",
                "created_at": "3/15/2022",
                "userId": 4,
                "user": {
                    "id": 4,
                    "name": "Kesley Cobello",
                    "username": "kcobello3",
                    "email": "kcobello3@nifty.com",
                    "type": "consumer"
                },
                "resolved_by": null
            }
        ];
    });
    afterEach(() => {
        sinonStub.restore();
    });
    it('should be able to fetch all tickets', async () => {
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(ticketsList));
        const result = await store.dispatch(fetchAllTickets());
        const tickets = result.payload;

        expect(result.type).to.equal('tickets/fetchAllTickets/fulfilled');
        expect(tickets.length).to.equal(10);

        const state = store.getState().tickets;
        expect(state).to.eql(tickets);
    });
    it('should be able to fetch a ticket', async () => {
        const expectedTicket = {
            "id": 1,
            "short_description": "Excision vaginal lesion",
            "description": "Excision or destruction of lesion of vagina",
            "status": "active",
            "created_at": "12/8/2021",
            "userId": 2,
            "user": {
                "id": 2,
                "name": "Sharline Peirce",
                "username": "speirce1",
                "email": "speirce1@scribd.com",
                "type": "consumer"
            },
            "resolved_by": {
                "id": 6,
                "name": "Titos Bayless",
                "username": "titos",
                "email": "tbayless5@theglobeandmail.com",
                "type": "admin"
            }
        };

        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(expectedTicket));
        const result = await store.dispatch(fetchTicket({ id: '1' }));
        const ticket = result.payload;

        expect(result.type).to.equal('tickets/fetchTicket/fulfilled');
        expect(ticket).to.eql(expectedTicket);
    });
    it('should be able to fetch a user\'s ticket', async () => {
        const expectedTickets = [{
            "id": 1,
            "short_description": "Excision vaginal lesion",
            "description": "Excision or destruction of lesion of vagina",
            "status": "active",
            "created_at": "12/8/2021",
            "userId": 2,
            "user": {
                "id": 2,
                "name": "Sharline Peirce",
                "username": "speirce1",
                "email": "speirce1@scribd.com",
                "type": "consumer"
            },
            "resolved_by": {
                "id": 6,
                "name": "Titos Bayless",
                "username": "titos",
                "email": "tbayless5@theglobeandmail.com",
                "type": "admin"
            }
        }];

        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(expectedTickets));
        const result = await store.dispatch(fetchUserTickets({ userId: '1' }));
        const ticket = result.payload;

        expect(result.type).to.equal('tickets/fetchUserTickets/fulfilled');
        const state = store.getState().tickets;
        expect(state).to.eql(expectedTickets);
    });
    it('should be able to create a ticket', async () => {
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(ticketsList));
        await store.dispatch(fetchAllTickets());
        sinonStub.restore();
        
        const newTicket = [{
            "id": 11,
            "short_description": "Soft tissue division NEC",
            "description": "Other division of soft tissue",
            "status": "active",
            "created_at": "8/2/2021",
            "userId": 1,
            "user": {
                "id": 1,
                "name": "Amberly Tunnicliffe",
                "username": "admin",
                "email": "atunnicliffe0@twitpic.com",
                "type": "admin"
            },
            "resolved_by": null
        }];
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(newTicket));
        const result = await store.dispatch(createTicket(newTicket));

        expect(result.type).to.equal('tickets/createTicket/fulfilled');
        const state = store.getState().tickets;
        expect(state.length).to.eql(11);
    });
    it('should be able to update a ticket', async () => {
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(ticketsList));
        await store.dispatch(fetchAllTickets());
        sinonStub.restore();
        
        const updatedTicket = {
            "id": 1,
            "short_description": "Soft tissue division NEC",
            "description": "Other division of soft tissue",
            "status": "active",
            "created_at": "8/2/2021",
            "userId": 1,
            "user": {
                "id": 1,
                "name": "Amberly Tunnicliffe",
                "username": "admin",
                "email": "atunnicliffe0@twitpic.com",
                "type": "admin"
            },
            "resolved_by": null
        };
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(updatedTicket));
        const result = await store.dispatch(updateTicket(updatedTicket));

        expect(result.type).to.equal('tickets/updateTicket/fulfilled');
        const state = store.getState().tickets;
        expect(state[0].short_description).to.eql('Soft tissue division NEC');
    });
});