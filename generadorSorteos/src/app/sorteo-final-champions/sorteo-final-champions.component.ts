import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../equipo';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorteo-final-champions',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './sorteo-final-champions.component.html',
  styleUrl: './sorteo-final-champions.component.css'
})
export class SorteoFinalChampionsComponent {
  equipos: string[] = []
  octavos: string[] = []
  comparar: string[] = []
  rondas: { partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, ganador?: string, estado: string, simulado: string, penales?: { equipo1: number; equipo2: number }; }[] }[] = [];
  faCheck = faCheck
  actualizarFase: number = this.equipos.length;
  isModalActive = false;
  equipoGanador: string | undefined = undefined;
  seleccionarPartido: string = ''; 
  idaVuelta: boolean = false;
  golVisitante: boolean = false;
  i = 0;
  golesAcumulados: { [key: string]: number } = {};
  submitPenales!: () => void;
  final = false;
  equiposRestantes: number = 0
  enfrentamientoOctavos: boolean = true


  constructor(private route: ActivatedRoute, private router: Router) {  
    this.route.params.subscribe(params => {  
      this.equipos = JSON.parse(params['equipos']);
      this.seleccionarPartido = params['seleccionarPartido']
      this.comparar = JSON.parse(params['comparar'])
      this.octavos = JSON.parse(params['octavos'])
      this.submitPenales = () => {}; 
    }); 

    if (this.seleccionarPartido === 'si'){
      this.idaVuelta = true
    } else {
      this.idaVuelta = false
    }

    this.actualizarFase = this.equipos.length

    this.iniciarTorneo(); 
  
  } 

  iniciarTorneo() {  
      this.rondas = [];  
      this.generarPartidos(this.equipos);  
  }  

  generarPartidos(equipos: string[]) {
    const partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, estado: 'En Espera', simulado: 'En Espera' }[] = [];
    
    for (let i = 0; i < equipos.length; i += 2) {
        if (equipos[i + 1]) {
          if (equipos.length !== 2){
            partidos.push({ equipo1: equipos[i], equipo2: equipos[i + 1], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });

            if (this.idaVuelta) {
              partidos.push({ equipo1: equipos[i + 1], equipo2: equipos[i], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });
            }
          } else {
            partidos.push({ equipo1: equipos[i], equipo2: equipos[i + 1], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });
            this.final = true
          }
        }
    }

    this.rondas.push({ partidos });
  } 

  async completarPartido(rondaIndex: number, partidoIndex: number) {  
    const partido = this.rondas[rondaIndex].partidos[partidoIndex];

    if (partido.goles1 < 0 || partido.goles2 < 0) {
        alert("Los goles no pueden ser negativos.");
        return;
    }

    this.acumularGoles(partido.equipo1, partido.goles1);
    this.acumularGoles(partido.equipo2, partido.goles2);

    if (this.idaVuelta){
      if (this.final){
        const ganadorIdaVuelta = this.obtenerGolesAcumulados()
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          await this.generarPenales(partido); 
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.estado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1;  
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.estado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0;
            partido.estado = 'Completado'
        }
      }
      if (this.i === 1){
        const ganadorIdaVuelta = this.obtenerGolesAcumulados()
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          await this.generarPenales(partido);
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.estado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1; 
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.estado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0;
            partido.estado = 'Completado'
        }

        if (this.getTitleForTeams(this.getNumEquiposRestantes(rondaIndex)) === 'Final') { 
            this.toggleModal();
            this.equipoGanador = partido.ganador;  
        } 

        if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== undefined || p.goles2 !== undefined)) {  
            this.generarSiguienteRonda(rondaIndex);  
        }
      } else {
        this.i++
        partido.estado = 'Completado'
      }
    } else {
      // Determinar el ganador basado en los goles
      if (partido.goles1 > partido.goles2) {  
          partido.ganador = partido.equipo1;  
      } else if (partido.goles2 > partido.goles1) {  
          partido.ganador = partido.equipo2;  
      } else {
        await this.generarPenales(partido);
      }  
      partido.estado = 'Completado'

      if (this.final) { 
          this.toggleModal();
          this.equipoGanador = partido.ganador;  
      }  

      if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== undefined || p.goles2 !== undefined)) {  
          this.generarSiguienteRonda(rondaIndex);  
      } 
    } 
  } 

  generarSiguienteRonda(rondaIndex: number) {
    let ganadores: string[] = this.rondas[rondaIndex].partidos  
        .map(p => p.ganador)  
        .filter((g): g is string => g !== undefined && g !== 'Empate'); 

    if (ganadores.length % 2 !== 0) {
        console.warn("Número impar de ganadores; se debe manejar adecuadamente.");
    }


    const partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, estado: 'En Espera', simulado: 'En Espera' }[] = []; 
    
    ganadores = this.eliminarDuplicados(ganadores);
    if (this.enfrentamientoOctavos){
      ganadores = this.shuffle(ganadores.concat(this.octavos))
      this.enfrentamientoOctavos = false
    }
    this.equiposRestantes = ganadores.length

    this.reiniciarGoles()

    for (let i = 0; i < ganadores.length; i+=2) {  
      if (ganadores.length === 2) { 
        partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' }); 
        this.final = true
      } else {
        if (ganadores[i + 1]) {
          partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });
          if (ganadores.length === 2) { 
            partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });  
          } else {
            if (this.idaVuelta) {
              partidos.push({ equipo1: ganadores[i + 1], equipo2: ganadores[i], goles1: 0, goles2: 0, estado: 'En Espera', simulado: 'En Espera' });
            }
          }
      }  
      }
    }
    this.rondas.push({ partidos });
    this.actualizarFase = ganadores.length;
  }

  getTitleForTeams(numEquipos: number): string {  
    switch (numEquipos) {  
        case 2:  
            return 'Final';  
        case 4:  
            return 'Semifinal';  
        case 8:  
            return 'Cuartos de Final';  
        case 16: 
            return 'Octavos de Final';  
        case 32:  
            return '64avos de Final';  
        default:  
            return '';  
    }  
  }

  getNumEquiposRestantes(rondaIndex: number): number { 
    if (this.equiposRestantes === 0){
      return this.equipos.length
    } else {
      return this.equiposRestantes; 
    } 
  } 

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  eliminarDuplicados(array: string[]) {
    return [...new Set(array)];
  }

  async generarPenales(partido: { equipo1: string, equipo2: string, penales?: { equipo1: number, equipo2: number } }) { 
    partido.penales = { equipo1: 0, equipo2: 0 }; 
    alert(`Se generarán penales entre ${partido.equipo1} y ${partido.equipo2}.`);
    
        await new Promise<void>((resolve) => {  
          this.submitPenales = () => {  
              this.determinarGanadorPenales(partido);  
              resolve(); // Resuelve la promesa  
          };  
      }); 
  }  

  determinarGanadorPenales(partido: any) { 
    if (partido.penales) {  
      if (partido.penales.equipo1 > partido.penales.equipo2) {  
        return partido.ganador = partido.equipo1;  
      } else if (partido.penales.equipo2 > partido.penales.equipo1) {  
        return partido.ganador = partido.equipo2;  
      }
       
    }  
  }

  acumularGoles(equipo: string, goles: number) {
    if (!this.golesAcumulados[equipo]) {
        this.golesAcumulados[equipo] = 0; // Inicializamos si no existe
    }
    this.golesAcumulados[equipo] += goles; // Acumulamos los goles
  }

  obtenerGolesAcumulados() {
      return this.golesAcumulados;
  }

  reiniciarGoles() {
    this.golesAcumulados = {};
  }

  isCompletado(partido: any): boolean {
    return partido.estado === 'Completado';
  }

  isSimulado(partido: any): boolean {
    return partido.simulado === 'Completado';
  }

  simularPartido(rondaIndex: number, partidoIndex: number) {  
    const partido = this.rondas[rondaIndex].partidos[partidoIndex];
    let EquipoL = this.generarNumeroAleatorio()
    let EquipoV = this.generarNumeroAleatorio()

    if (partido.goles1 < 0 || partido.goles2 < 0) {
        alert("Los goles no pueden ser negativos.");
        return;
    }

    this.acumularGoles(partido.equipo1, EquipoL);
    this.acumularGoles(partido.equipo2, EquipoV);

    if (this.idaVuelta){
      if (this.final){
        const ganadorIdaVuelta = this.obtenerGolesAcumulados()
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          EquipoL = this.generarNumeroAleatorio()
          EquipoV = this.generarNumeroAleatorio()
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.simulado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1;  
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.simulado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0;
            partido.simulado = 'Completado'
        }
      }
      if (this.i === 1){
        const ganadorIdaVuelta = this.obtenerGolesAcumulados()
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          EquipoL = this.generarNumeroAleatorio()
          EquipoV = this.generarNumeroAleatorio()
          partido.goles1 = EquipoL
          partido.goles2 = EquipoV
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.simulado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1; 
            partido.goles1 = EquipoL
            partido.goles2 = EquipoV
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.simulado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            partido.goles1 = EquipoL
            partido.goles2 = EquipoV
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0;
            partido.simulado = 'Completado'
        }

        if (this.getTitleForTeams(this.getNumEquiposRestantes(rondaIndex)) === 'Final') { 
            this.toggleModal();
            this.equipoGanador = partido.ganador;  
        }  


        if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== 0 || p.goles2 !== 0)) {
            this.generarSiguienteRonda(rondaIndex);  
        }
      } else {
        this.i++
        partido.simulado = 'Completado'
        partido.goles1 = EquipoL
        partido.goles2 = EquipoV
      }
    } else {
      // Determinar el ganador basado en los goles
      if (partido.goles1 > partido.goles2) {  
          partido.ganador = partido.equipo1;  
      } else if (partido.goles2 > partido.goles1) {  
          partido.ganador = partido.equipo2;  
      }
      partido.simulado = 'Completado'

      if (this.final) { 
          this.toggleModal();
          this.equipoGanador = partido.ganador;  
      }  

      if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== 0 || p.goles2 !== 0)) {  
          this.generarSiguienteRonda(rondaIndex);  
      } 
    } 
  } 

  generarNumeroAleatorio() {
    return Math.floor(Math.random() * 30) + 1;
  }

  shuffle(array: string[]) {
    const shuffledArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return shuffledArray;
  }
}
