import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regAlphabetic = /^[a-z|A-Z| |ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]*$/;
const regAlphanumber = /^[0-9|a-z|A-Z|ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]*$/;
const regDecimal = /^[0-9|,|.|+|-]*$/;
const regEmail =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regOnlyNumber = /^[0-9]*$/;
const regOnlyText = /^[a-z|A-Z|ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]*$/;
const regPassword = /^[a-z|A-Z|ñ|Ñ|0-9|.|!|¡|@|_|-|#|$|&|%]*$/;

export const MSG_ERROR_DEFAULT = 'Campo no cumple validación';

type Result = ValidationErrors | null;

export function required({ value }: AbstractControl): Result {
  return value
    ? null
    : {
        required: {
          message: 'Campo es requerido'
        }
      };
}

export function textonly({ value }: AbstractControl): Result {
  return value && !regOnlyText.test(value)
    ? {
        textonly: {
          message: 'Campo de solo caracteres (sin espacio)'
        }
      }
    : null;
}

export function alphabetic({ value }: AbstractControl): Result {
  return value && !regAlphabetic.test(value)
    ? {
        alphabetic: {
          message: 'Campo de solo caracteres'
        }
      }
    : null;
}

export function alphanumber({ value }: AbstractControl): Result {
  return value && !regAlphanumber.test(value)
    ? {
        alphanumber: {
          message: 'Campo de solo caracteres y números'
        }
      }
    : null;
}

export function onlyNumber({ value }: AbstractControl): Result {
  return value && !regOnlyNumber.test(value)
    ? {
        onlyNumber: {
          message: 'Campo debe ser númerico'
        }
      }
    : null;
}

export function decimal({ value }: AbstractControl): Result {
  return value && !regDecimal.test(value)
    ? {
        decimal: {
          message: 'Campo debe ser número decimal'
        }
      }
    : null;
}

export function email({ value }: AbstractControl): Result {
  return value && !regEmail.test(value)
    ? {
        email: {
          message: 'Campo debe ser correo electrónico'
        }
      }
    : null;
}

export function password({ value }: AbstractControl): Result {
  return value && !regPassword.test(value)
    ? {
        password: {
          message: 'Campo no permitido para password'
        }
      }
    : null;
}

export function reqlength(length: number): ValidatorFn {
  return function ({ value }: AbstractControl): Result {
    return !!value && value.length !== length
      ? {
          reqlength: {
            message: `Campo debe tener ${length} caracter(es)`
          }
        }
      : null;
  };
}

export function minlength(length: number): ValidatorFn {
  return function ({ value }: AbstractControl): Result {
    return !!value && value.length < length
      ? {
          minlength: {
            message: `Campo requiere mínimo ${length} caracteres`
          }
        }
      : null;
  };
}

export function maxlength(length: number): ValidatorFn {
  return function ({ value }: AbstractControl): Result {
    return !!value && value.length > length
      ? {
          maxlength: {
            message: `Campo permite máximo ${length} caracteres`
          }
        }
      : null;
  };
}
