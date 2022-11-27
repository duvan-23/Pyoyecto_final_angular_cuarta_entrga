import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombres'
})
export class NombresPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value+" "+args[0];
  }

}
