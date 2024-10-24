import { createContext } from 'react';

interface User {
    username: string | null;
    password: string | null;
    email: string | null;
    route: string | null;
    refreshtoken: string | null;
    error: string | null;
}
const user :User ={
    username: null,
    password: null,
    email: null,
    route: null,
    refreshtoken: null,
    error: null,
};
export const formContext = createContext(user);