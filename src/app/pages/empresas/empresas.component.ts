import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public empresaService: EmpresaService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas(){
    this.cargando = true;
    this.empresaService.cargarEmpresas(this.desde)
        .subscribe((resp:any) => {
          this.totalRegistros = resp.total;
          this.empresas = resp.empresas;
          this.cargando = false;
        });
  }

  guardarEmpresa(empresa: Empresa){
    this.cargando = true;
    this.empresaService.actualizarEmpresa(empresa)
        .subscribe(()=> this.cargando = false);
  }

  borrarEmpresa(empresa: Empresa){
    
    swal({
      title: '¿Esta seguro?',
      text: 'Estas a punto de eliminar la Empresa: '+empresa.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.empresaService.borrarEmpresa(empresa._id)
            .subscribe(borrado =>{
              this.cargarEmpresas();
            });
      }
    });
  }

  buscarEmpresa(termino: string){

    if(termino.length <= 0){
      this.cargarEmpresas();
      return;
    }
    this.cargando = true;

    this.empresaService.buscarEmpresa(termino)
        .subscribe((empresas:any) => {
          this.empresas = empresas;
          this.cargando = false;
        });

  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarEmpresas();

  }

}
