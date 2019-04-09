import { Pipe, PipeTransform } from '@angular/core';
import { maskFormat } from '../utils/mask.utils';
import { masks } from '../helpers/consts/consts.helpers';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return maskFormat(value, masks.CPF);
  }

}
