import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import "./LoginComps.css";
import { ubdateToken } from "../../logic/cookies/Token.ts"

export default function LoginComps() {
    const contextUser = useContext(UserContext);

    const [password, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [result, setResult] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    //send login
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/access/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            setResult(data);

            if (data?.token) {
                localStorage.setItem("BuyersAccessToken", data.token);
                setToken(data.token);
            }
        } catch (err) {
            console.error("Login error function handleSubmit:", err);
            setResult({ error: "Server error, please try again" });
        }
    }

    //get user from Server
    const getUserFromServer = async (myToken: string) => {
        try {
            const res = await fetch(`http://localhost:3000/buyers/users/data`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": myToken,
                },
            });

            const data = await res.json();

            // טוקן חוזר לא תקין
            if (res.status === 401 && data['token'] === "false") {
                ubdateToken(data, "BuyersAccessToken");
            }
            
            if (data.user && contextUser) {
                console.log("user from server - show: ", data.user);

                // עדכון ה־ context עם USER
                contextUser.setUser({
                    ...data.user,
                    // orders: data.orders || [],
                    // groups: data.groups || [],
                });
            }

        } catch (err) {
            console.log('Error function getUserFromServer: ', err);
        }
    }

    // if new token..
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                await getUserFromServer(token);
            }
        }
        fetchUser();
    }, [token]);

    // if token in LocalStorage..
    useEffect(() => {
        // בדיקה אם כבר יש token 
        const savedToken = localStorage.getItem("BuyersAccessToken");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    return (
        <div>
            <h2>Welcome Back</h2>

            <div id='loginContext'>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type='submit'>Sign In</button>

                </form>
            </div>

            <div id='response'>
                {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            </div>

            {token && <p>Token saved: {token}</p>}
        </div>
    )
}