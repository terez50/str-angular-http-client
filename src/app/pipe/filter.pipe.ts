import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    value: User[] | null,
    key: string,
    phrase: string | number | boolean,
    props: {count: number}): User[] | null {
    if (!Array.isArray(value) || !key || !phrase) {
      // console.log('null');
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    const filtered = value.filter(item => {

      if (typeof item[key] !== 'number') {
        // console.log('not number', ('' + item[key]).toLowerCase(), phrase, typeof item[key], typeof phrase, ('' + item[key]).toLowerCase().includes(phrase as string));
        return ('' + item[key]).toLowerCase().includes(phrase as string); // a TS miatt
      }
      console.log('number', item[key], phrase, typeof item[key], typeof phrase);
      return ('' + item[key]) === phrase;

    });

    if (props?.count) {
      props.count = filtered.length; // itt állítom be a szűrt hosszat
    }

    return filtered;
  }

}
