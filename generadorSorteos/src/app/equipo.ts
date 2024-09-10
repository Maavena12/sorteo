export class Equipo {
    nombre: string;
    puntos: number = 0;
    golesAFavor: number = 0;
    golesEnContra: number = 0;

    constructor(nombre: string) {
        this.nombre = nombre;
    }
}
