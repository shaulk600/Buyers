import { useNavigate } from "react-router";
import "./RegisterComps.css";
import { validTypeUserRegister, type UserRegister } from "../../logic/UserType";
import { saveToken } from "../../logic/cookies/Token";

export default function RegisterComps() {
    const navigate = useNavigate();

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const newUser: UserRegister = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            password: formData.get("password") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            phone_number: formData.get("phone_number") as string,

            // Payment details - לא לשמור כאן - סימולצייה בלבד - להעביר לחברת הסליקה
            card_number: formData.get("card_number") as string,
            card_holder: formData.get("card_holder") as string,
            exp_month: formData.get("exp_month") as string,
            exp_year: formData.get("exp_year") as string,
            cvv: formData.get("cvv") as string,
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
                    saveToken("buyersMyToken", data.token);
                    window.alert(" :):) Registration completed -- Goes to menu");
                    navigate("/home");
                } else {
                    window.alert(":( :( Registration failed: " + (data?.message || "try again"));
                }
            } catch (err) {
                console.error("Error function createUser:", err);
                window.alert("❌ Server error, please try again later");
            }
        } else {
            window.alert("❌ Invalid data");
        }
    };

    return (
        <section className="page">
            <h1>{`Register on the site :)`}</h1>
            <br />
            <form onSubmit={createUser}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="input-btn" />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="input-btn" />

                <label htmlFor="first_name">First name</label>
                <input type="text"
                    name="first_name"
                    placeholder="For example Michael"
                    required
                    className="input-btn" />

                <label htmlFor="last_name">Last name</label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="For example 'Levin'"
                    required
                    className="input-btn" />

                <label htmlFor="phone_number">Phone number</label>
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="050-1234567"
                    required
                    className="input-btn" />

                <br />
                <p>If you want home delivery :</p>

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    name="address"
                    placeholder="רחוב/עיר"
                    className="input-btn" />
                <hr />


                <h2>Payment details </h2>
                <div className="card-payment-box">

                    <label htmlFor="card_number">מספר כרטיס:</label>
                    <input
                        type="text"
                        name="card_number"
                        placeholder="1234 5678 9012 3456"
                        
                        className="input-btn"
                        maxLength={19}
                    />

                    <label htmlFor="card_holder">Cardholder Name</label>
                    <input
                        type="text"
                        name="card_holder"
                        placeholder="כפי שמופיע על הכרטיס"
                        
                        className="input-btn"
                    />
                    <div className="exp-cvv-row">

                        <div>
                            <label htmlFor="exp_month">month</label>
                            <input
                                type="text"
                                name="exp_month"
                                placeholder="MM"
                                
                                className="input-btn"
                                maxLength={2} //הגבלה של שני תווים
                            />
                        </div>
                        <div>
                            <label htmlFor="exp_year">year</label>
                            <input
                                type="text"
                                name="exp_year"
                                placeholder="YY"
                                
                                className="input-btn"
                                maxLength={2}
                            />
                        </div>
                    </div>

                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="password"
                        name="cvv"
                        placeholder="3 ספרות בגב הכרטיס"
                        
                        className="input-btn"
                        maxLength={4}
                    />

                </div>
                {/* style */}
                <div className="card-icons">
                    <img src="/visa.png" alt="Visa" />
                    <img src="/mastercard.png" alt="MasterCard" />
                    <img src="/amex.png" alt="Amex" />
                </div>

                <br />
                <button type="submit">הירשם</button>
            </form>
        </section>
    );
}