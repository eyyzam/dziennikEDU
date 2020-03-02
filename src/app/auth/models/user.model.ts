import { Roles } from "./roles.model";

export class User {
  constructor(
    public uid: string,
    public email: string,
    public displayName: string,
    public photoURL: string,
    public emailVerified: boolean,
    public roles?: Roles
  ) {}
}
