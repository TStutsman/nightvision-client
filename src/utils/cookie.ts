export function getCookie(key: string):string | void {
    const row = document.cookie.split(';').find(row => row.startsWith(`${key}=`));
    if(!row) return;
    
    // [ key, value ] <<= 'key=value'
    const [ _, cookie ]= row.split('=');
    return cookie;
}