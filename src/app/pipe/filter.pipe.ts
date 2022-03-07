import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, phrase: string | number | boolean): any[] | null {
    if (!Array.isArray(value) || !key || !phrase) {
      // console.log('null');
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    return value.filter(item => {

      if (typeof item[key] !== 'number') {
        // console.log('not number', ('' + item[key]).toLowerCase(), phrase, typeof item[key], typeof phrase, ('' + item[key]).toLowerCase().includes(phrase as string));
        return ('' + item[key]).toLowerCase().includes(phrase as string); // a TS miatt
      }
      console.log('number', item[key], phrase, typeof item[key], typeof phrase);
      return ('' + item[key]) === phrase;

    });
  }

}
