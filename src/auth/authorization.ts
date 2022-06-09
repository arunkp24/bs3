
import store from "../state/store";
import { getUserSelector } from "../state/userSelector";

export class AuthorizationService {
  
    public isAuthorized(): boolean {
      const user = getUserSelector(store.getState());
      // return true;
      return Object.keys(user).length !== 0;
    } 
    
    isAdmin() {
      const user = getUserSelector(store.getState());
      // return true;
      return user.type === 'admin';
    }

    isConsumer() {
      const user = getUserSelector(store.getState());
      // return true;
      return user.type === 'consumer';
    }

  }