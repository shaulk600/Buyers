
import { Routes, Route } from 'react-router';
import { createContext, useState } from "react";

import type { User } from '../logic/UserType';
import LoginPage from "../pages/login/LoginPage";

export const UserContext = createContext({} as User);

export default function RoutesPage() {

    const [user, setUser] = useState<User>({} as User);

    return (
        <div>

            <Routes>
                <UserContext.Provider value={user || null}>

                    {/* Home */}
                    <Route path="/" element={< LoginPage />} />

                    <Route path="/access/login" element={< LoginPage />} />
                </UserContext.Provider>
            </Routes>

        </div>
    )
}
