import { createContext } from "react";
import { AuthUserObject } from "../../interfaces";

const AuthUserContext = createContext<AuthUserObject | null>(null);

export default AuthUserContext;
