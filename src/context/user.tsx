import { createContext, Dispatch, SetStateAction } from 'react';

export type User = {
    loggedIn: boolean;
    name?: string;
}

type UserCtx = [User, Dispatch<SetStateAction<User>>];

const UserContext = createContext<UserCtx>([{
  loggedIn: false,
  name: ''
// eslint-disable-next-line @typescript-eslint/no-empty-function
}, () => {}]);

export default UserContext;
