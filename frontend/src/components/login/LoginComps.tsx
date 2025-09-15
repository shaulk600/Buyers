import { useState, useEffect } from 'react'
import "./LoginComps.css";

export default function LoginComps() {
    const [name, setName] = useState<string>("");
    const [password, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [result, setResult] = useState(null);
    const [token, setToken] = useState(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/access/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password, name: name })
        })
        setResult(await res.json());
    }
    const sendToken = () => { //חייב להגיע אחרי ה fetch
        if (result) {
            const myToken: string = result['token'];
            localStorage.setItem('BuyersAccessToken', myToken);
        }
    }
    const isToken = () => {
        let myToken = null;
        myToken = localStorage.getItem('BuyersAccessToken');
        if (myToken) {
            return myToken;
        }
        return null;
    }

    useEffect(() => {

    }, [])


    return (
        <div className=''>
            <h2 className=''> Welcome Back </h2>

            <div id='loginContext'>

                <form onSubmit={handleSubmit} className="">

                    <div>
                        <label className=''> Name: </label>

                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="full name"
                                className=''
                            />
                        </div>

                    </div>

                    <br />

                    <div>
                        <label className=''> Password </label>
                        <div className='inputLogin'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                required
                                placeholder="••••••••"
                                className=''
                            />
                        </div>
                    </div>

                    <br />

                    <div>
                        <label className=''> Email </label>
                        <div className='inputLogin'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"

                                className=""
                            />
                        </div>

                    </div>
                    <button
                        type='submit'
                        className=''
                    >
                        Sign In
                    </button>

                </form>
            </div>
            <div>
                <div id='resonse'>{result}</div>
            </div>
        </div>
    )
}