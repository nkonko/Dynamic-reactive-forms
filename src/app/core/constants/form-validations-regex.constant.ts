export const ValidatorsRegex = {
    email: new RegExp( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    phone: new RegExp(/^[0-9]{10}$/)
}