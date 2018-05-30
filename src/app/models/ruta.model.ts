export class Ruta {

    constructor (
        public nombre: string,
        public usuario:string,
        public lat_origen:number,
        public lng_origen:number,
        public lat_destino:number,
        public lng_destino: number,
        public empresa: string,
        public img?: string,
        public barrios?: string,        
        public _id?: string
    ) { }

}
