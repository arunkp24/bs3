import { User } from "./Bs3User";

export interface Ticket {
    id?: number;
    short_description?: string;
    description?: string;
    created_at?: string;
    status?: string;
    userId?: number;
    user?: User
    resolved_by?: User | null
}