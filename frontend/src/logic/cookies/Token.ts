const lk = localStorage;

export function saveToken(keyToken: string, token: string): string {
    const checkToken = lk.getItem(keyToken);
    if (checkToken) return ('Operation failed - keyToken already exists');
    else {
        lk.setItem(keyToken, token);
        return "seccess";
    }
    return ''

}
export function getToken(keyToken: string): string {
    const checkToken = lk.getItem(keyToken);
    if (checkToken) return checkToken;
    else {
        return "Operation failed - keyToken not exists";
    }
}

export function ubdateToken(data:{token:string},keyToken:string){
   if(data["token"] === "false"){
        lk.removeItem(keyToken)
   }

}