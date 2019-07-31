import { Injectable } from '@angular/core';


interface User {
  email: string;
  uid: string;
  first_name: string;
  last_name: string;
  country: string;
  boxId: string;
}

@Injectable()
export class UserService {
  private user: User;
  constructor() {

  }

  setUser(user: User) {
    this.user = user;
  }

  getUID() {
    return this.user.uid;
  }
}
