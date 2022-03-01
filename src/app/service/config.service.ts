import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  editable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  tableCols: ITableCol[] = [
    {key: "id", text: "#", editable: false},
    {key: "last_name", text: "Családnév", editable: true},
    {key: "first_name", text: "Keresztnév", editable: true},
    {key: "email", text: "Email", editable: false},
    {key: "gender", text: "Gender", editable: true},
    // {key: "ip_address", text: "IP", editable: true}
  ];

  constructor() { 
  }
}
