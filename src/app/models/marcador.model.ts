export class Marcador {

    constructor(
        public _id: string,
        public nombre: string,
        public icono: string,
        public lat: number,
        public lng: number,
        public descripcion: string,
        public img1?: string,
        public img2?: string,
        public img3?: string,
        public img4?: string        
    ) { }
}
