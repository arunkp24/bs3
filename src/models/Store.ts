import { Ticket } from "./Ticket";
import { User } from "./User";

export interface IStore {
    user: User;
    tickets: Ticket[]
}