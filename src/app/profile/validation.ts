
import * as yup from 'yup';


export const loginSchema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required()
    })
    .required();

enum StatusEnum {
    pending = 'Pending',
    approved = 'Approved',
    rejected = 'Rejected',
}
const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phone = /^([+]|[00]{2})([0-9]|[ -])*/;
const passOneUpperCaseCharacter = /(?=.*?[A-Z])/;
const passOneLowerCaseCharacter = /(?=.*?[a-z])/;
const passOneDigitCharacter = /(?=.*?[0-9])/;
const passOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;

export const newEmailSchema = yup
.object({
    password: yup.string().required().min(8),
    email: yup.string().required().email()
})
.required();

export const passwordResetSchema = yup
.object({
    currentPassword: yup.string().required(),
    password: yup.string().required().min(8)
    .matches(passOneUpperCaseCharacter, 'password must contain at least one upper case character')
    .matches(passOneLowerCaseCharacter, 'password must contain at least one lower case character')
    .matches(passOneDigitCharacter, 'password must contain at least one one number')
    .matches(passOneSpecialCharacter, 'password must contain at least one special character'),
    passwordConfirm: yup.string().required('Confirm Password is a required field')
    .oneOf([yup.ref('password'), ""], 'Passwords must match')
})
.required();

export const newNameSchema = yup
.object({
    firstName: yup.string().required().trim().min(2).max(50),
    lastName: yup.string().required().trim().min(2).max(50)
})
.required();