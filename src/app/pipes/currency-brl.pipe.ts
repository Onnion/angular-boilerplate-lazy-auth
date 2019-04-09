import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class CurrencyBrlPipe implements PipeTransform {

  transform(price: any, args?: any): string {
    return parseFloat(price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

}
