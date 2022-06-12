import { expect } from "@open-wc/testing";
import store from "../src/state/store";
import { fetchUsers, loginUser } from "../src/state/userSlice";
import sinon from 'sinon';

describe('userSlice', () => {
    let sinonStub: any;
    let stubResponse: any;
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
    });
    afterEach(() => {
        sinonStub.restore();
    });
    it('should be able to fetch all user', async () => {
        const userList = [
            {
                "id": 1,
                "name": "Amberly Tunnicliffe",
                "username": "admin",
                "email": "atunnicliffe0@twitpic.com",
                "type": "admin"
            },
            {
                "id": 2,
                "name": "Sharline Peirce",
                "username": "consumer",
                "email": "speirce1@scribd.com",
                "type": "consumer"
            },
            {
                "id": 3,
                "name": "Florry Sowray",
                "username": "fsowray2",
                "email": "fsowray2@zdnet.com",
                "type": "consumer"
            },
            {
                "id": 4,
                "name": "Kesley Cobello",
                "username": "kcobello3",
                "email": "kcobello3@nifty.com",
                "type": "consumer"
            },
            {
                "id": 5,
                "name": "Ilka Longfellow",
                "username": "ilongfellow4",
                "email": "ilongfellow4@mozilla.com",
                "type": "consumer"
            },
            {
                "id": 6,
                "name": "Titos Bayless",
                "username": "titos",
                "email": "tbayless5@theglobeandmail.com",
                "type": "admin"
            },
            {
                "id": 7,
                "name": "Livy Sola",
                "username": "lsola6",
                "email": "lsola6@home.pl",
                "type": "admin"
            },
            {
                "id": 8,
                "name": "Ebony Challens",
                "username": "echallens7",
                "email": "echallens7@indiatimes.com",
                "type": "admin"
            },
            {
                "id": 9,
                "name": "Moira Pighills",
                "username": "mpighills8",
                "email": "mpighills8@youku.com",
                "type": "consumer"
            },
            {
                "id": 10,
                "name": "Berna Lomath",
                "username": "blomath9",
                "email": "blomath9@mit.edu",
                "type": "consumer"
            }
        ];
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(userList));
        const result = await store.dispatch(fetchUsers());
        const users = result.payload;

        expect(result.type).to.equal('users/fetchUsers/fulfilled');
        expect(users.length).to.equal(10);

        const state = store.getState().user;
        expect(state).to.eql(userList[0]);
    });
    it('should be able to login a user', async () => {
        const expectedUser = {
            "id": 1,
            "name": "Amberly Tunnicliffe",
            "username": "admin",
            "email": "atunnicliffe0@twitpic.com",
            "type": "admin"
        };
        sinonStub = sinon.stub(window, 'fetch').returns(stubResponse(expectedUser));
        const result = await store.dispatch(loginUser({username: 'admin', userType: 'admin'}));
        const user = result.payload;

        expect(result.type).to.equal('users/login/fulfilled');

        const state = store.getState().user;
        expect(state).to.eql(expectedUser);
    });
});