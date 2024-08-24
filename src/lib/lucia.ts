import { Session, User } from "lucia";
export interface SessionData {
  user: User;
  session: Session;
}
