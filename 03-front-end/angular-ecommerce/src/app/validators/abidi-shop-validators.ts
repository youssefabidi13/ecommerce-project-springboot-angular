import { FormControl, ValidationErrors } from "@angular/forms";

export class AbidiShopValidators {
    //white space validators
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        //check if string only contains whitespace

        if ((control.value != null) && (control.value.trim().length === 0)){

            //invalid , return error object 
            return {'notOnlyWhitespace':true};

        }else{
            //valid , return null
            return null;
        } 
    }
    static validateCreditCardNumber(control: FormControl): ValidationErrors {
      // remove any non-digit characters
      // const cleanedNumber = control.value.replace(/\D/g, '');
  
      // reverse the digits in the number
      const reversedNumber = control.value ? control.value.split('').reverse().join('') : '';
  
      let sum = 0;
      for (let i = 0; i < reversedNumber.length; i++) {
          let digit = parseInt(reversedNumber[i], 10);
  
          // double every second digit
          if (i % 2 === 1) {
              digit *= 2;
  
              // if the doubled digit is greater than 9, subtract 9
              if (digit > 9) {
                  digit -= 9;
              }
          }
  
          // add the digit to the sum
          sum += digit;
      }
  
      // if the sum is divisible by 10, the card number is valid
      if (sum % 10 !== 0) {
          return {'validateCreditCardNumber': true};
      } else {
          return null;
      }
  }
  
      
}
