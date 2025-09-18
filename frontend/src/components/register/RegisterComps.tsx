import { useNavigate } from "react-router";
import { useContext } from "react";
import "./RegisterComps.css";
import { validTypeUserRegister, type UserRegisterR } from "../../logic/UserType";
import { saveToken } from "../../logic/cookies/Token";
import { UserContext } from "../../context/UserContext"; // 👈 ייבוא הקונטקסט

export default function RegisterComps() {
    const navigate = useNavigate();
    const contextUser = useContext(UserContext); // 👈 שימוש בקונטקסט

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newUser: UserRegisterR = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            password: formData.get("password") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            phone_number: formData.get("phone_number") as string,
        };

        if (validTypeUserRegister(newUser)) {
            try {
                const res = await fetch("http://localhost:3000/access/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                });

                const data = await res.json();

                if (res.ok) {
                    // שמירת טוקן
                    saveToken("BuyersAccessToken", data.token);

                    // 👇 עדכון הקונטקסט עם המשתמש שחזר מהשרת
                    if (data.user && contextUser) {
                        contextUser.setUser({
                            ...data.user,
                            orders: data.orders || [],
                            groups: data.groups || [],
                        });
                    }

                    // מעבר לדף מוצרים
                    window.location.href = "/products";
                } else {
                    window.alert(":( :( Registration failed: " + (data?.message || "try again"));
                }
            } catch (err) {
                console.error("Error function createUser:", err);
                window.alert(" Server error, please try again later");
            }
        } else {
            window.alert(" Invalid data");
        }
    };

    return (
        <section className="page">
            <h1>{`Register on the site :)`}</h1>
            <br />
            <form onSubmit={createUser}>
                {/* כל השדות כמו שהיו */}
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="you@example.com" required className="input-btn" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="••••••••" required className="input-btn" />

                <label htmlFor="first_name">First name</label>
                <input type="text" name="first_name" placeholder="For example Michael" required className="input-btn" />

                <label htmlFor="last_name">Last name</label>
                <input type="text" name="last_name" placeholder="For example 'Levin'" required className="input-btn" />

                <label htmlFor="phone_number">Phone number</label>
                <input type="tel" name="phone_number" placeholder="050-1234567" required className="input-btn" />

                <label htmlFor="address">Address:</label>
                <input type="text" name="address" placeholder="רחוב/עיר" className="input-btn" />

                <br />
                <button className="btn-green" type="submit">הירשם</button>
            </form>
        </section>
    );
}
