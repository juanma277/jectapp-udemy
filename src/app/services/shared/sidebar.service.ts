import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    { titulo: 'Principal', icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dasboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Rxjs', url: '/Rxjs'}            
      ]  
    }
  ];

  constructor() { }

}
