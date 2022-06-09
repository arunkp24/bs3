import { Ticket } from "./Bs3Ticket";
import { User } from "./Bs3User";

export interface IStore {
    user: User;
    tickets: Ticket[]
}