import toast, { Toaster } from 'react-hot-toast';

export const emailValidator = email => {
    // const re = /\S+@\S+\.\S+/;
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!email || email.length <= 0) {
        return 'Email field cannot be empty.';
    }
    if (!re.test(email)) {
        return 'Oops! We need a valid email address.';
    }

    return '';
};
export const TextValidator = (text, filedName) => {
    const rex = /^[a-zA-Z ]+$/;
    if (!text || text.length <= 0) {
        return `${filedName} cannot be empty.`;
    }
    if (text.length < 6) {
        return `${filedName} cannot be less then 6 characters.`;
    }
    if (!rex.test(text)) {
        return `${filedName}  field contains only characters `;
    }
    return '';
};

export const NumberValidator = CNIC => {
    if (!CNIC || CNIC.length <= 0) {
        return ' cannot be empty.';
    }
    if (isNaN(CNIC)) {
        return ' Should be in number format';
    }
    return '';
};

export const passwordValidator = text => {
    const letters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!text || text.length <= 0) {
        return 'Password cannot be empty.';
    }
    if (!text || text.length <= 6) {
        return 'Password cannot be less then 6 character.';
    }
    if (!letters.test(text)) {
        return 'Password must contain a special characters and a number ';
    }
    return '';
};

export const convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
};

export const UniqueByProperty = (arr, property) => {
    return [...new Set(arr.map(item => item[property]))];
};

export const errorAlert = message => {
    let stringMessage = message;
    if (typeof message !== 'string') {
        stringMessage = JSON.stringify(message);
    }

    toast(stringMessage, {
        style: {

            background: "#E91E63",
            color: "#fff"
        },
    });
};

export const successAlert = message => {
    let stringMessage = message;
    if (typeof message !== 'string') {
        stringMessage = JSON.stringify(message);
    }
    toast(stringMessage, {
        style: {
            background: "black",
            color: "#fff"
        },
    });
    //   showMessage({
    //     message: 'Success!',
    //     description: stringMessage,
    //     type: 'success',
    //   });
};
