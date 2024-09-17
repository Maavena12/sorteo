import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../equipo';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorteo-final-personalizado',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './sorteo-final-personalizado.component.html',
  styleUrl: './sorteo-final-personalizado.component.css'
})
export class SorteoFinalPersonalizadoComponent {
  equipos: string[] = [];  
  divisor: number = 0  ;
  seleccionarPartido: string = '';
  idaVuelta: boolean = false;
  opcion: string[] = []
  grupos: number = 0;
  cantidad: number = 0;
  gruposGenerados: string[][] = [];
  jornadas: string[][] = [];
  jornadaActiva: number = 0
  puntos: { [key: string]: number } = {};
  equiposPorGrupo: Equipo[][] = [];
  golesEquipo1: number = 0;
  golesEquipo2: number = 0;
  goles: { [key: string]: { equipo1: number; equipo2: number } } = {};
  resultados: any[][] = [];
  golesTemporales: { [key: string]: { equipo1: number; equipo2: number } } = {};
  faCheck = faCheck;
  cantidadClasificados: number = 0
  jornadasMezcladas: string[][] = []
  isModalActive = false;
  i = 0;
  equipoGanador: string = ''
  cantidadJornada: string[] = []

  constructor(private route: ActivatedRoute, private router: Router) {  
    this.route.params.subscribe(params => {  
        this.equipos = JSON.parse(params['equipos']);  
        this.divisor = params['divisor']; 
        this.seleccionarPartido = params['seleccionarPartido']
        this.cantidadClasificados = params['cantidadClasificados']
        this.opcion = params['opción']
    });  

    this.grupos = this.equipos.length / this.divisor;

    this.cantidad = this.equipos.length / this.grupos;

    if (this.seleccionarPartido === 'si'){
      this.idaVuelta = true
    } else {
      this.idaVuelta = false
    }

    this.dividirEquiposEnGrupos();

    this.generarJornadas();

    this.inicializarEquipos()

    this.initializeResultados();

    this.jornadasMezcladas = this.jornadas.map(this.mezclarPartidosGrupos);

    console.log(this.cantidadClasificados)

  }
  
  dividirEquiposEnGrupos() {
    const equiposMezclados = this.mezclarArray(this.equipos);

    const cantidadPorGrupo = this.cantidad;

    this.gruposGenerados = [];
    for (let i = 0; i < this.grupos; i++) {
      this.gruposGenerados.push(equiposMezclados.slice(i * cantidadPorGrupo, (i + 1) * cantidadPorGrupo));
    }

    return this.gruposGenerados
  }

  mezclarArray(array: any[]) {
    const arrMezclado = array.slice();
    for (let i = arrMezclado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrMezclado[i], arrMezclado[j]] = [arrMezclado[j], arrMezclado[i]];
    }
    return arrMezclado;
  }

  generarJornadas() {
    this.jornadas = [];

    this.gruposGenerados.forEach(grupo => {
      const partidosPorGrupo: string[] = this.generarPartidos(grupo);

      this.jornadas.push(partidosPorGrupo);
    });
  }

  generarPartidos(grupo: string[]): string[] {
    const partidos: string[] = [];
    const numEquipos = grupo.length;

    for (let i = 0; i < numEquipos; i++) {
      for (let j = i + 1; j < numEquipos; j++) {
        partidos.push(`${grupo[i]} vs ${grupo[j]}`);

        if (this.idaVuelta) {
          partidos.push(`${grupo[j]} vs ${grupo[i]}`);
        }
      }
    }
    return partidos;
  }

  inicializarEquipos() {
    this.gruposGenerados.forEach(grupo => {
        const equipos = grupo.map(nombre => new Equipo(nombre));
        this.equiposPorGrupo.push(equipos);
    });
  }

  private initializeResultados() {
    this.resultados = this.jornadas.map(grupo => grupo.map(() => ({ golesEquipo1: 0, golesEquipo2: 0, estado: 'En Espera' })));
  }

  onResultadosChange(grupoIndex: number, partidoIndex: number) {
    const resultado = this.resultados[grupoIndex][partidoIndex];

    if (!this.golesTemporales[`${grupoIndex}-${partidoIndex}`]) {
        this.golesTemporales[`${grupoIndex}-${partidoIndex}`] = { equipo1: 0, equipo2: 0 };
    }

    this.golesTemporales[`${grupoIndex}-${partidoIndex}`].equipo1 = resultado.golesEquipo1;
    this.golesTemporales[`${grupoIndex}-${partidoIndex}`].equipo2 = resultado.golesEquipo2;

  }

  completarPartido(grupoIndex: number, partidoIndex: number) {
    if (this.golesTemporales[`${grupoIndex}-${partidoIndex}`] === undefined){
      

      const equipo1Nombre = this.jornadas[grupoIndex][partidoIndex].split(' vs ')[0].trim();
      const equipo2Nombre = this.jornadas[grupoIndex][partidoIndex].split(' vs ')[1].trim();
  
      const equipo1 = this.equiposPorGrupo[grupoIndex].find(e => e.nombre === equipo1Nombre);
      const equipo2 = this.equiposPorGrupo[grupoIndex].find(e => e.nombre === equipo2Nombre);
  
      if (equipo1 && equipo2) {
          equipo1.golesAFavor += 0; 
          equipo1.golesEnContra += 0; 
  
          equipo2.golesAFavor += 0; 
          equipo2.golesEnContra += 0; 
  
          equipo1.puntos += 1;
          equipo2.puntos += 1;
  
          this.resultados[grupoIndex][partidoIndex].estado = 'Completado';
  
          this.updateClasificacion(grupoIndex);
  
          this.gruposGenerados.forEach(grupo => {
            this.cantidadJornada = this.jornadas.flat();
          });
  
          if (this.i < this.cantidadJornada.length - 1){
            this.i++
          } else {
            const equiposSeleccionados = this.obtenerEquiposPorGrupo(this.cantidadClasificados, grupoIndex);
            const array: string[] = equiposSeleccionados.map(equipo => equipo.nombre)
            let final: string[] = []
            let semi: string[] = []
            if (Number(this.cantidadClasificados) === 3){
              final.push(array[0])
              semi.push(array[1])
              semi.push(array[2])
            } else if (Number(this.cantidadClasificados) === 4){
              for(let i = 0; i < array.length; i++){
                final.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 5){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 6){
              final.push(array[0])
              final.push(array[1])
              for (let i = 2; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 7){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 8){
              for(let i = 0; i < array.length; i++){
                final.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 9){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 10){
              final.push(array[0])
              final.push(array[1])
              for (let i = 2; i < array.length; i++){
                semi.push(array[i])
              }
            }
            this.i = 0
            if (Number(this.cantidadClasificados) === 4 || Number(this.cantidadClasificados) === 8){
              this.router.navigate(['/sorteo-final-eliminatoria', JSON.stringify(array), this.seleccionarPartido]);
            } else {
              this.router.navigate(['/eliminatoria-personalizada', JSON.stringify(semi), this.seleccionarPartido, JSON.stringify(final)]);
            }
          }
      }
    } else {
      const golesTemp = this.golesTemporales[`${grupoIndex}-${partidoIndex}`];

      const equipo1Nombre = this.jornadas[grupoIndex][partidoIndex].split(' vs ')[0].trim();
      const equipo2Nombre = this.jornadas[grupoIndex][partidoIndex].split(' vs ')[1].trim();
  
      const equipo1 = this.equiposPorGrupo[grupoIndex].find(e => e.nombre === equipo1Nombre);
      const equipo2 = this.equiposPorGrupo[grupoIndex].find(e => e.nombre === equipo2Nombre);
  
      if (equipo1 && equipo2) {
          equipo1.golesAFavor += golesTemp.equipo1; 
          equipo1.golesEnContra += golesTemp.equipo2; 
  
          equipo2.golesAFavor += golesTemp.equipo2; 
          equipo2.golesEnContra += golesTemp.equipo1; 
  
          if (golesTemp.equipo1 > golesTemp.equipo2) {
              equipo1.puntos += 3;
          } else if (golesTemp.equipo1 < golesTemp.equipo2) {
              equipo2.puntos += 3;
          } else {
              equipo1.puntos += 1;
              equipo2.puntos += 1;
          }
  
          this.resultados[grupoIndex][partidoIndex].estado = 'Completado';
  
          this.updateClasificacion(grupoIndex);
  
          this.gruposGenerados.forEach(grupo => {
            this.cantidadJornada = this.jornadas.flat();
          });
  
          if (this.i < this.cantidadJornada.length - 1){
            this.i++
          } else {
            const equiposSeleccionados = this.obtenerEquiposPorGrupo(this.cantidadClasificados, grupoIndex);
            const array: string[] = equiposSeleccionados.map(equipo => equipo.nombre)
            let final: string[] = []
            let semi: string[] = []
            if (Number(this.cantidadClasificados) === 3){
              final.push(array[0])
              semi.push(array[1])
              semi.push(array[2])
            } else if (Number(this.cantidadClasificados) === 4){
              for(let i = 0; i < array.length; i++){
                final.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 5){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 6){
              final.push(array[0])
              final.push(array[1])
              for (let i = 2; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 7){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 8){
              for(let i = 0; i < array.length; i++){
                final.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 9){
              final.push(array[0])
              for (let i = 1; i < array.length; i++){
                semi.push(array[i])
              }
            } else if (Number(this.cantidadClasificados) === 10){
              final.push(array[0])
              final.push(array[1])
              for (let i = 2; i < array.length; i++){
                semi.push(array[i])
              }
            }
            this.i = 0
            if (Number(this.cantidadClasificados) === 4 || Number(this.cantidadClasificados) === 8){
              this.router.navigate(['/sorteo-final-eliminatoria', JSON.stringify(array), this.seleccionarPartido]);
            } else {
              this.router.navigate(['/eliminatoria-personalizada', JSON.stringify(semi), this.seleccionarPartido, JSON.stringify(final)]);
            }
          }
      }
    }

    delete this.golesTemporales[`${grupoIndex}-${partidoIndex}`];
  }

  private updateClasificacion(grupoIndex: number) {
      this.equiposPorGrupo[grupoIndex].sort((a, b) => {
          if (b.puntos === a.puntos) {
              return b.golesAFavor - a.golesAFavor;
          }
          return b.puntos - a.puntos;
      });
  }

  mezclarPartidosGrupos(arr: string[]): string[] {  
    for (let i = arr.length - 1; i > 0; i--) {  
      const j = Math.floor(Math.random() * (i + 1));  
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }  
    return arr;  
  } 

  getNombrePrimerEquipo(): string {  
    let primerEquipo = null;  

    for (const grupo of this.equiposPorGrupo) {  
        for (const equipo of grupo) {  
            if (!primerEquipo || equipo.puntos > primerEquipo.puntos) {  
                primerEquipo = equipo;  
            }  
        }  
    }  

    return primerEquipo ? primerEquipo.nombre : 'No hay equipos';
  } 

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  obtenerEquiposPorGrupo(cantidad: number, grupoIndex: number): any[] {

    let array: any[] = []

    this.equiposPorGrupo[grupoIndex].sort((a, b) => {
      if (b.puntos === a.puntos) {
          return b.golesAFavor - a.golesAFavor;
      }
      return b.puntos - a.puntos;
    });
  
    this.equiposPorGrupo.forEach(grupo => {
      const equiposDelGrupo = grupo.slice(0, cantidad);
      array = array.concat(equiposDelGrupo)
    });
  
    return array;
  }

  isCompletado(partido: any): boolean {
    return partido.estado === 'Completado';
  }

  getClass(index: number): string {
    const cantidadClasificados = Number(this.cantidadClasificados);
    
    if (index < cantidadClasificados) {
        if (cantidadClasificados === 2 || cantidadClasificados === 4 || cantidadClasificados === 8) {
            return 'green';
        } else if (cantidadClasificados === 3 || 
                   cantidadClasificados === 5 || 
                   cantidadClasificados === 6 || 
                   cantidadClasificados === 7) {
            if (index === 0) {
                return 'green';
            } else if (cantidadClasificados === 3 && index === 1 || index === 2) {
                return 'light-blue';
            } else if (cantidadClasificados === 5 && index >= 1 && index <= 4) {
                return 'light-blue';
            } else if(cantidadClasificados === 6 && index === 1){
              return 'green';
            } else if (cantidadClasificados === 6 && index >= 2) {
                return 'light-blue';
            } else if (cantidadClasificados === 7 && index >= 1) {
                return 'light-blue';
            }
        } else if (cantidadClasificados === 9) {
            if (index === 0) {
                return 'green';
            } else {
                return 'light-blue';
            }
        } else if (cantidadClasificados === 10) {
            if (index < 2) {
                return 'green';
            } else {
                return 'light-blue';
            }
        }
    }
    
    return '';
  }
}
