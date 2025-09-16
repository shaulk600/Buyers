import { useNavigate } from "react-router";
// import {  } from "react";
import "./RegisterComps.css";
import { validTypeUserRegister, type UserRegister } from "../../logic/UserType";
import { saveToken } from "../../logic/cookies/Token";

export default function RegisterComps() {
    const navigate = useNavigate();

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputFirstName = e.currentTarget.first_name.value;
        const inputLastName = e.currentTarget.last_name.value;
        const inputPassword = e.currentTarget.password.value;
        const inputEmail = e.currentTarget.email.value;
        const inputAddress = e.currentTarget.address.value;
        const inputPhoneNumber = e.currentTarget.phone_number.value;

        const newUser: UserRegister = {
            first_name: inputFirstName,
            last_name: inputLastName,
            password: inputPassword,
            email: inputEmail,
            address: inputAddress,
            phone_number: inputPhoneNumber
        };

        if (validTypeUserRegister(newUser)) {
            try {
                const res = await fetch("http://localhost:3000/access/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": ${accessToken} // זה עם הטוקן - להעתקה מכאן
                    },
                    body: JSON.stringify(newUser),
                });

                if (res.ok) {
                    const data = await res.json();
                    saveToken('buyersMyToken', data['token']);//res = {token: strToken}
                    window.alert(" Registration completed -- \n Goes to menu ");
                    navigate("/home");
                }
                else {
                    window.alert("Registration failed -- \n Re-registering");
                    navigate("/register");
                }
            } catch (err) {
                console.error("Error function createUser:", err);

            }
        }


    }

    return (
        <section className="page">
            <h1>הירשם</h1>
            <br />
            <form onSubmit={createUser}>
                
                <label htmlFor="first_name">הכנס את שם הראשון:</label>
                <br />
                <input
                    type="text"
                    name="first_name"
                    placeholder="לדוגמה: ישראל ישראלי"
                    required
                    className="input-btn"
                />
                <br />
                <label htmlFor="username">הכנס את שם המשתמש:</label>
                <br />
                <input className="input-btn" type="text" name="name" placeholder="לדוגמה: ישראל ישראלי" required />
                <br />
                <br />
                <span style={{ color: 'red' }}>*  </span>
                <label htmlFor="password">הכנס סיסמה:</label>
                <br />
                <input className="input-btn" type="password" name="password" placeholder="לדוגמה: 1234" required />
                <br />
                <br />
                <button type="submit">הירשם</button>
            </form>
        </section>
    )
}

