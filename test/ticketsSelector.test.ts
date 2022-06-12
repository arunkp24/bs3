import { expect } from '@open-wc/testing';
import { Ticket } from '../src/models/Ticket';
import { getAllTicketsSelector } from '../src/state/ticketsSelector';
import { IStore } from './../src/models/Store';

describe("ticketSelectors", () => {
    it('should get 0 tickets', () => {
        const tickets: Ticket[] = [];
        const results = getAllTicketsSelector({ tickets } as IStore)
        expect(results.length).to.equal(0);
    });
    it('should get 1 ticket', () => {
        const tickets: Ticket[] = [{
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
        const results = getAllTicketsSelector({ tickets } as IStore)
        expect(results.length).to.equal(1);
    });
});