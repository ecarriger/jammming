const generateRandomCharacter = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return chars[Math.floor(Math.random() * chars.length)];
};
export const generateRandomString = (strLengthToGen) => {
    if(typeof strLengthToGen !== 'number' || strLengthToGen < 0) {
        throw new Error('Non-negative number was not passed to function generateRandomString');
    } 
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
export const convertMsToTime = (milliseconds) => {
    const time = new Date(null);
    time.setHours(0, 0, 0, 0);
    time.setMilliseconds(milliseconds);

    //Format seconds
    let formattedTime = time.getSeconds().toString().padStart(2, '0');
    //Format minutes
    formattedTime = (time.getHours() ? time.getMinutes().toString().padStart(2, '0') : time.getMinutes()) + ':' + formattedTime;
    //Format hours
    if(time.getHours()) {
        formattedTime = time.getHours() + ':' + formattedTime;
    }

    return formattedTime;
};