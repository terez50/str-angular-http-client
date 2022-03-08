import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from './model/user';
import { ConfigService, ITableCol } from './service/config.service';
import { UserService } from './service/user.service';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent implements OnInit {
    title = 'str-angular-http-client';
    // userList$: Observable<User[]> = this.userService.getAll();
    userList$: Observable<User[]> = this.userService.list$.pipe(
      map( users => users.filter( user => user.id > 0)),
      tap( users => this.productsProperties.count = users.length )
    );
    cols: ITableCol[] = this.config.tableCols;
    phrase: string = '';
    filterKey: string = 'last_name';
    filterKeys: string[] = Object.keys(new User());

    // Paginator
    productsProperties: {count: number} = {count: 0};  // a termékek száma (hány van összesen)
    pageSize: number = 10;    // egyszerre megjelenítendő termékek (egy oldalon) (46:15)
    pageStart: number = 1;    // kezdőoldal (jelenleg mi van az oldallista elején a gombokon)
    currentPage: number = 1;  // ahol a kurzor áll (az a gomb, amihez tartozó adatokat látom)
    get paginator(): IPageBtn[] {  // IPageBtn: interfész; visszaad egy tömböt
      const pages: IPageBtn[] = [];
      for (let i = 0; i < this.productsProperties.count / this.pageSize && pages.length < 10; i++) {  // legeneráljuk a gombokat (pages)
        const page = this.pageStart + i; // hogy ne nullával kezdődjön a gombok szövege
        pages.push({page});
      }
      return pages;
    }
    get pageSliceStart(): number {  // a megjelenített oldalak vágását melyik terméknél kezdjem el
      const index = this.currentPage -1;  // merthogy a 0-ás 1-esként jelenik meg a gombon
      // return index === 0 ? 0 : (index * this.pageSize);
      return index * this.pageSize;
    }
    get pageSliceEnd(): number {  // meddig vágjon
      return this.pageSliceStart + this.pageSize;
    }

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

    onPaginate(ev: Event, btn: IPageBtn): void {
      ev.preventDefault();          // hogy ne frissüljön az oldal
      this.currentPage = btn.page;
      this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
      // console.log(btn); (28:10)
    }

    onStepPage(ev: Event, step: number): void {
      ev.preventDefault();
      this.currentPage += step;
      this.pageStart += step;
    }

}
