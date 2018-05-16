import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/imagenes';

    if(!img){
      return url + '/usuarios/XXX';
    }

    if(img.indexOf('https') >= 0){
      return img;
    }

    switch (tipo){
      case 'usuarios':
        url += '/usuarios/' + img;
      break;

      case 'vehiculos':
        url += '/vehiculos/' + img;
      break;

      case 'rutas':
        url += '/rutas/' + img;        
      break;

      case 'empresas':
        url += '/empresas/' + img;  
      break;
      
      case 'iconos':
        url += '/iconos/' + img;
      break;  

      case 'marcadores':
        url += '/marcador/' + img;
      break;  
      
      default:
        break;
    }

    return url;
  }

}
