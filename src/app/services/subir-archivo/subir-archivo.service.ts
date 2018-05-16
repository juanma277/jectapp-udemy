import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id:string){

    return new Promise((resolve, reject)=>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

    formData.append('imagen', archivo, archivo.name);

    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          resolve(JSON.parse(xhr.response));
        }else{
          console.log('Error en carga de imagen');
          reject(xhr.response);
        }
      }
    };

    let url = URL_SERVICIOS + '/upload/'+ tipo +'/'+id;
    xhr.open('PUT', url, true);
    xhr.send(formData);

    });
  }


  subirArchivoEmpresa( archivo: File, tipo: string, id:string, img:number){

    return new Promise((resolve, reject)=>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

    formData.append('imagen', archivo, archivo.name);

    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          resolve(JSON.parse(xhr.response));
        }else{
          console.log('Error en carga de imagen');
          reject(xhr.response);
        }
      }
    };

    let url = URL_SERVICIOS + '/upload/'+ tipo +'/'+id;
    url += '?img=' + img;
    xhr.open('PUT', url, true);
    xhr.send(formData);

    });
  }


  subirArchivoMarcador( archivo: File, tipo: string, id:string, img:number){

    return new Promise((resolve, reject)=>{

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

    formData.append('imagen', archivo, archivo.name);

    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          resolve(JSON.parse(xhr.response));
        }else{
          console.log('Error en carga de imagen');
          reject(xhr.response);
        }
      }
    };

    let url = URL_SERVICIOS + '/upload/'+ tipo +'/'+id;
    url += '?img=' + img;
    xhr.open('PUT', url, true);
    xhr.send(formData);

    });
  }

}
