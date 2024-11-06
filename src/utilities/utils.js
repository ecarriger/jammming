const generateRandomCharacter = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return chars[Math.floor(Math.random() * chars.length)];
};
export const generateRandomString = (strLengthToGen) => {
    let genStr = '';

    while(genStr.length < strLengthToGen) {
        genStr += generateRandomCharacter();
    }

    return genStr;
};
export const checkTokenExpired = (expirationDate) => {
    const now = new Date();
    return now > expirationDate;
};