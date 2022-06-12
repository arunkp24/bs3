import { expect } from "@open-wc/testing";
import { IStore } from "../src/models/Store";
import { User } from "../src/models/User";
import { getUserIdSelector, getUserNameSelector, getUserSelector, getUserTypeSelector } from "../src/state/userSelector";

describe('userSelector', () => {
    const user: User = {
        "id": 1,
        "name": "Amberly Tunnicliffe",
        "username": "admin",
        "email": "atunnicliffe0@twitpic.com",
        "type": "admin"
    };
    it('should return user', () => {
        const results = getUserSelector({ user } as IStore);
        expect(results).to.equal(user);
    });
    it('should return user name', () => {
        const results = getUserNameSelector({ user } as IStore);
        expect(results).to.equal('Amberly Tunnicliffe');
    });
    it('should return user id', () => {
        const results = getUserIdSelector({ user } as IStore);
        expect(results).to.equal(1);
    });
    it('should return user type', () => {
        const results = getUserTypeSelector({ user } as IStore);
        expect(results).to.equal('admin');
    });
});