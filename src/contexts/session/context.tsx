import { createContext } from "react";
import { AuthUserObject } from "../../interfaces/AuthUser";

const AuthUserContext = createContext<AuthUserObject | null>(null);

export default AuthUserContext;
