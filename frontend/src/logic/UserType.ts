export type UserType = {
    password: string,
    email: string
}
export type UserRegister = {
    id?: number
    name: string,
    password: string,
    email: string,
    address: string,
    phone_number: string,
    //פרטי כרטיס
    card_number: string,
    card_holder: string,
    exp_month: string,
    exp_year: string,
    cvv: string,
}


export function validTypeUserType(obj: UserType): boolean {
    if (obj.password.trim() === "" || obj.email.trim() === "") {
        return false;
    }
    return true;
}

export function validTypeUserRegister(obj: UserRegister): boolean {
    if (obj.name.trim() === "" ||
        obj.password.trim() === "" ||
        obj.email.trim() === "" ||
        obj.address.trim() === "" ||
        obj.phone_number.trim() === "" ||

        obj.card_number.trim() === "" ||
        obj.card_holder.trim() === "" ||
        obj.exp_month.trim() === "" ||
        obj.exp_year.trim() === "" ||
        obj.cvv.trim() === "") {
        return false;
    }
    return true;
}