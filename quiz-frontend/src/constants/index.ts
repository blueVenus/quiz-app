import * as yup from "yup";
import { checkLuhn } from "../utils";

declare module "yup" {
  interface StringSchema {
    validateCardNumber(errorMessage?: string): StringSchema;
  }
}

/**
 * Added the Luhn Algorithm to validationSchema
 */
yup.addMethod(
  yup.StringSchema,
  "validateCardNumber",
  function (errorMessage): any {
    return this.test("validateCardNumber", errorMessage, function (value) {
      const { createError } = this;

      const isValid = checkLuhn(value);

      return isValid || createError({ message: errorMessage });
    });
  }
);

/**
 * validationSchema
 */
export const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .validateCardNumber("Please enter the correct format")
    .matches(/^\d{4} \d{4} \d{4} \d{3,4}$/, "Please enter the correct format")
    .required("Card Number is required"),
  expirationDate: yup
    .string()
    .trim()
    .matches(/^\d{2}([/])\d{2}$/, "Invalid expiration Format")
    .required("Expiration Date is required"),
  cvv: yup
    .string()
    .trim()
    .matches(/^\d{3,4}$/, "Invalid cvv Format")
    .required("CVV is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  billingCode: yup
    .string()
    .trim()
    .matches(/(^\d{5}$)|(^\d{9}$)/, "Invalid code Format")
    .required("Billing Code is required"),
});

export const cardNumberMask = [
  /\d/, /\d/, /\d/, /\d/, " ",
  /\d/, /\d/, /\d/, /\d/, " ",
  /\d/, /\d/, /\d/, /\d/, " ",
  /\d/, /\d/, /\d/, /\d/,
];
export const dateMask = [/\d/, /\d/, '/', /\d/, /\d/,];

export const cvvMask = [/\d/, /\d/, /\d/, /\d/];

export const billingCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const firstNameMask = [/\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/];

export const lastNameMask = [/\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/, /\D/];
