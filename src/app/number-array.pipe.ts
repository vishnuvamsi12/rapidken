import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberArray'
})
export class NumberArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    const arr: number[] = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    return arr;
  }
}
