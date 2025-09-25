import { useState, useEffect, useContext } from 'react';
import { UserContext, useUser } from "../../context/UserContext";
import "./LoginComps.css";
import { useNavigate } from 'react-router';
import { saveToken, ubdateToken } from "../../logic/cookies/Token.ts";
// import { Link } from 'react-router';




export default function LoginComps() {
    // const contextUser = useContext(UserContext); // שימוש ב-context
    const { setUser } = useUser();
    const navigate = useNavigate()


    const [password, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [token, setToken] = useState<string | null>(null);

    //send login
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

            if (res.status === 401 && data['token'] === "false") {
                ubdateToken(data, "BuyersAccessToken");
                return;
            }
            console.log("data", data);
            if (data.user) {
                saveToken("BuyersUser", JSON.stringify(data.user));
                console.log("user from server - show: ", data.user);

                // עדכון ה־ context עם USER
                setUser({
                    ...data.user,
                    orders: data.orders || [],
                    groups: data.groups || [],
                });
                navigate("/products");
            }
        } catch (err) {
            console.log('Error fetching user data: ', err);
        }
    };

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
        const savedToken = localStorage.getItem("BuyersAccessToken");
        if (savedToken) setToken(savedToken);
    }, []);

    return (
        <div className='continer'>

            <div className='page'>
                <h2>Welcome Back</h2>
                
                <div id='loginContext'>
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <label>Email:</label>
                            <br />
                            <input className='input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        
                        <br />
                        <br />
                        
                        <div>
                            <label>Password:</label>
                            <br />
                            <input className='input'
                                type="password"
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        
                        <br />
                        
                        <button className="btn-green" type='submit'>Sign In</button>

                    </form>
                </div>

                {/* <div id='response'>
                {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            </div>

            {token && <p>Token saved: {token}</p>} */}
            </div>
        </div>
    )
}