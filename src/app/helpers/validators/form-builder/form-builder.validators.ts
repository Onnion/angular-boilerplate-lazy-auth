import { validEmail, validName } from '../regex/regex.validator';
import { validCpf } from '../cpf/cpf.validator';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormBuilderValidators {


  constructor () { }


  public emailFormat(control: FormControl): {[key: string]: boolean} {
    return validEmail(control.value) ? null : {'emailFormat': true};
  }


  public nameFormat(control: FormControl): {[key: string]: boolean} {
    return validName(control.value) ? null : {'nameFormat': true};
  }


  public cpfFormat(control: FormControl): {[key: string]: boolean} {
    return validCpf(control.value) ? null : {'cpfFormat': true};
  }


  public ageFormat(control: FormControl): {[key: string]: boolean} {
    return (control.value.length <= 3 && control.value <= 125) ? null : {'ageFormat': true};
  }
}
