import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './model/user';
import { ConfigService, ITableCol } from './service/config.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent {
    title = 'str-angular-http-client';
    // userList$: Observable<User[]> = this.userService.getAll();
    userList$: Observable<User[]> = this.userService.getAll().pipe(
      map( users => users.filter( user => user.id > 20))
    );
    cols: ITableCol[] = this.config.tableCols;
    phrase: string = '';
    filterKey: string = 'last_name';
    filterKeys: string[] = Object.keys(new User());

    constructor(
      private userService: UserService,
      private config: ConfigService
    ) {
      // console.log(Object.entries(new User()));
    }

    onUpdate(user: User): void {
      this.userService.update(user).subscribe(
        updatedUser => console.log(updatedUser)
      );
    }

    onDelete(user: User): void {
      this.userService.remove(user).subscribe(
        () => console.log("deleted")
      );
    }

}
