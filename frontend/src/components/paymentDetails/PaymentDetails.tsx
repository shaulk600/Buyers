// import "./PaymentDetails.css";

// export default function PaymentDetails() {
//     return (
//         <div>
//             <hr />


//             <h2>Payment details </h2>
//             <div className="card-payment-box">

//                 <label htmlFor="card_number">מספר כרטיס:</label>
//                 <input
//                     type="text"
//                     name="card_number"
//                     placeholder="1234 5678 9012 3456"
//                     required
//                     className="input-btn"
//                     maxLength={19}
//                 />

//                 <label htmlFor="card_holder">Cardholder Name</label>
//                 <input
//                     type="text"
//                     name="card_holder"
//                     placeholder="כפי שמופיע על הכרטיס"
//                     required
//                     className="input-btn"
//                 />
//                 <div className="exp-cvv-row">

//                     <div>
//                         <label htmlFor="exp_month">month</label>
//                         <input
//                             type="text"
//                             name="exp_month"
//                             placeholder="MM"
//                             required
//                             className="input-btn"
//                             maxLength={2} //הגבלה של שני תווים
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="exp_year">year</label>
//                         <input
//                             type="text"
//                             name="exp_year"
//                             placeholder="YY"
//                             required className="input-btn"
//                             maxLength={2}
//                         />
//                     </div>
//                 </div>

//                 <label htmlFor="cvv">CVV:</label>
//                 <input
//                     type="password"
//                     name="cvv"
//                     placeholder="3 ספרות בגב הכרטיס"
//                     required className="input-btn"
//                     maxLength={4}
//                 />

//             </div>
//             {/* style */}
//             <div className="card-icons">
//                 <img src="/visa.png" alt="Visa" />
//                 <img src="/mastercard.png" alt="MasterCard" />
//                 <img src="/amex.png" alt="Amex" />
//             </div>
//             <br />
//             <button type="submit">הירשם</button>
//         </div>
//     )
// }
// // את האייקונים של ויזה/מאסטרקארד/אמריקן אקספרס תוכל לשים בתיקיית public/ (לדוגמה: public/visa.png, public/mastercard.png, public/amex.png).