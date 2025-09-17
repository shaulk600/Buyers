export type UserType = {
    password: string,
    email: string
}
export type UserRegisterR = {
    id?: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    address: string,
    phone_number: string,
    //פרטי כרטיס
    // card_number: string,
    // card_holder: string,
    // exp_month: string,
    // exp_year: string,
    // cvv: string,
};

// UserRegister מבוסס על UserRegisterR אבל מוסיף/משנה שדות
export type UserRegister = Omit<UserRegisterR, "first_name" | "last_name"> & {
    name: string; // במקום first_name + last_name
};

export function validTypeUserType(obj: UserType): boolean {
    if (obj.password.trim() === "" || obj.email.trim() === "") {
        return false;
    }
    return true;
}

export function validTypeUserRegister(obj: UserRegisterR): boolean {
    if (obj.first_name.trim() === "" ||
        obj.last_name.trim() === "" ||
        obj.password.trim() === "" ||
        obj.email.trim() === "" ||
        obj.address.trim() === "" ||
        obj.phone_number.trim() === ""
        // ||
        // obj.card_number.trim() === "" ||
        // obj.card_holder.trim() === "" ||
        // obj.exp_month.trim() === "" ||
        // obj.exp_year.trim() === "" ||
        // obj.cvv.trim() === ""
    ) {
        return false;
    }
    return true;
}