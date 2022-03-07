import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './model/user';
import { ConfigService, ITableCol } from './service/config.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent implements OnInit {
    title = 'str-angular-http-client';
    // userList$: Observable<User[]> = this.userService.getAll();
    userList$: Observable<User[]> = this.userService.list$.pipe(
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

    ngOnInit(): void {
      this.userService.getAll();
    }

    onUpdate(user: User): void {
      this.userService.update(user);
    }

    onDelete(user: User): void {
      this.userService.remove(user);
    }

}
