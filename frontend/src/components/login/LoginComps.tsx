import { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import "./LoginComps.css";
import { useNavigate } from 'react-router';
import { saveToken, ubdateToken } from "../../logic/cookies/Token.ts";

export default function LoginComps() {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [password, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [token, setToken] = useState<string | null>(null);

    // שליחת פרטי התחברות
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/access/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data?.token) {
                localStorage.setItem("BuyersAccessToken", data.token);
                setToken(data.token);
            } else {
                alert("Login failed: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Server error, please try again");
        }
    }

    // שליפת המשתמש מהשרת
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

            if (res.status === 401 && data['token'] === "false") {
                ubdateToken(data, "BuyersAccessToken");
                return;
            }

            if (data.user) {
                saveToken("BuyersUser", JSON.stringify(data.user));
                setUser({
                    ...data.user,
                    orders: data.orders || [],
                    groups: data.groups || [],
                });
                navigate('/');
            }
        } catch (err) {
            console.log('Error fetching user data: ', err);
        }
    };

    // ברגע שיש token → מביאים משתמש
    useEffect(() => {
        if (token) getUserFromServer(token);
    }, [token]);

    // אם כבר יש token בשמירה מקומית
    useEffect(() => {
        const savedToken = localStorage.getItem("BuyersAccessToken");
        if (savedToken) setToken(savedToken);
    }, []);

    return (
        <div className='page'>
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
        </div>
    );
}