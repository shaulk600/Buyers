export type User = {
    name: string,
    password: string,
    email: string,
}
export type UserRegister = {
    id?: number
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    address: string,
    phone_number: string,
}

export function validTypeUser(obj: User):boolean {
    if (obj.name.trim() === "" ||
        obj.password.trim() === "" ||
        obj.email.trim() === "") {
        return false;
    }
    return true;
}

export function validTypeUserRegister(obj: UserRegister): boolean {
    if (obj.first_name.trim() === "" ||
        obj.last_name.trim() === "" ||
        obj.password.trim() === "" ||
        obj.email.trim() === "" ||
        obj.address.trim() === "" ||
        obj.phone_number.trim() === "") {
        return false;
    }
    return true;
}