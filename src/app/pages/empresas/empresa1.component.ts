import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { STYLEMAP } from '../../config/config';

@Component({
  selector: 'app-empresa1',
  templateUrl: './empresa1.component.html',
  styles: [`agm-map {
    height: 600px;
  }`]
})
export class Empresa1Component implements OnInit {

  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa('','','','','', '');
  textoAccion: string = 'crear una Empresa';
  lat_update: number = 0;
  lng_update: number = 0;
  boton:string = 'CREAR';
  usuarios: Usuario[] = [];
  styleArray: any;

  constructor(public empresaService: EmpresaService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public usuarioService: UsuarioService) {

                this.styleArray = STYLEMAP;

                this.usuarioService.cargarUsuariosAll().subscribe((resp:any) =>{
                  this.usuarios = resp.usuarios;
                });
              
                activatedRoute.params.subscribe(params =>{
                  let id = params['id'];
                  if(id !== 'nuevo'){
                    this.cargarEmpresa(id);
                    this.textoAccion = 'editar los datos de la Empresa.';
                    this.boton = 'ACTUALIZAR';
                  }else{
                    this.setCurrentPosition();
                    this.empresa.usuario = '';
                  }
                });

               }

  ngOnInit() { 
  }

  cargarEmpresa(id: string){
    this.empresaService.cargarEmpresa(id)
        .subscribe(empresa => {
          this.empresa = empresa;
          this.empresa.usuario = empresa.usuario._id;
        });
  }

  placeMarker($event){
    this.lat_update = $event.coords.lat;
    this.lng_update = $event.coords.lng;   
  }

  setCurrentPosition(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition((position)=>{
        this.empresa.lat = position.coords.latitude;
        this.empresa.lng = position.coords.longitude;    
      });
    }

  }

  guardarEmpresa(empresa: Empresa){
    if(this.lat_update === 0 || this.lng_update === 0){
          if(this.boton === 'ACTUALIZAR'){
    
            this.empresaService.actualizarEmpresa(empresa)
            .subscribe((resp)=>{
              this.router.navigate(['/empresa/'+resp._id]);
            });
    
          }else{
    
            this.empresaService.crearEmpresa(empresa)
            .subscribe((resp)=>{
              this.router.navigate(['/empresa/'+resp._id]);
            });
    
          }
      
    }else{

      this.empresaService.actualizarUbicacion(empresa._id , this.lat_update, this.lng_update)
      .subscribe((resp)=>{
        this.router.navigate(['/empresa/'+resp._id]);        
      });

    }
    }

}
