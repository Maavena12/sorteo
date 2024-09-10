import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../equipo';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorteo-final-eliminatorias',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './sorteo-final-eliminatorias.component.html',
  styleUrl: './sorteo-final-eliminatorias.component.css'
})
export class SorteoFinalEliminatoriasComponent {
  equipos: string[] = []
  rondas: { partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, ganador?: string, estado: string, penales?: { equipo1: number; equipo2: number }; }[] }[] = [];
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
  juegos: number = 0;


  constructor(private route: ActivatedRoute, private router: Router) {  
    this.route.params.subscribe(params => {  
      this.equipos = JSON.parse(params['equipos']);
      this.seleccionarPartido = params['seleccionarPartido']
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

  // Método para iniciar el torneo  
  iniciarTorneo() {  
      this.rondas = [];  
      this.generarPartidos(this.equipos);  
  }  

  // Método para generar partidos iniciales
  generarPartidos(equipos: string[]) {
    const partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, estado: 'En Espera' }[] = [];
    
    for (let i = 0; i < equipos.length; i += 2) {
        if (equipos[i + 1]) {
          if (equipos.length !== 2){
            // Partido de ida
            partidos.push({ equipo1: equipos[i], equipo2: equipos[i + 1], goles1: 0, goles2: 0, estado: 'En Espera' });

            // Si 'idaVuelta' es true, agregar el partido de vuelta
            if (this.idaVuelta) {
              partidos.push({ equipo1: equipos[i + 1], equipo2: equipos[i], goles1: 0, goles2: 0, estado: 'En Espera' });
            }
          } else {
            // Partido de ida
            partidos.push({ equipo1: equipos[i], equipo2: equipos[i + 1], goles1: 0, goles2: 0, estado: 'En Espera' });
            this.final = true
          }
        }
    }

    this.rondas.push({ partidos });
  } 

  async completarPartido(rondaIndex: number, partidoIndex: number) {  
    const partido = this.rondas[rondaIndex].partidos[partidoIndex];

    // Validación de que los goles no son negativos
    if (partido.goles1 < 0 || partido.goles2 < 0) {
        alert("Los goles no pueden ser negativos.");
        return;
    }

    // Acumular los goles del equipo1
    this.acumularGoles(partido.equipo1, partido.goles1);
    // Acumular los goles del equipo2
    this.acumularGoles(partido.equipo2, partido.goles2);

    if (this.idaVuelta){
      if (this.final){
        const ganadorIdaVuelta = this.obtenerGolesAcumulados()
        // Determinar el ganador basado en los goles
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          await this.generarPenales(partido);
          // Si estamos en la final, guardar el equipo ganador  
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.estado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1;
            // Si estamos en la final, guardar el equipo ganador  
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.estado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            // Si estamos en la final, guardar el equipo ganador  
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
        // Determinar el ganador basado en los goles
        if(ganadorIdaVuelta[partido.equipo1] === ganadorIdaVuelta[partido.equipo2]){
          await this.generarPenales(partido);
          // Si estamos en la final, guardar el equipo ganador  
          if (this.final) { 
              this.toggleModal();
              this.equipoGanador = partido.ganador;  
          }  
          this.i = 0;
          partido.estado = 'Completado'
        }
        else if (ganadorIdaVuelta[partido.equipo1] > ganadorIdaVuelta[partido.equipo2]) {  
            partido.ganador = partido.equipo1;
            // Si estamos en la final, guardar el equipo ganador  
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0; 
            partido.estado = 'Completado'
        } else if (ganadorIdaVuelta[partido.equipo2] > ganadorIdaVuelta[partido.equipo1]) {  
            partido.ganador = partido.equipo2; 
            // Si estamos en la final, guardar el equipo ganador  
            if (this.final) { 
                this.toggleModal();
                this.equipoGanador = partido.ganador;  
            }   
            this.i = 0;
            partido.estado = 'Completado'
        }

        this.juegos++;

        // Si estamos en la final, guardar el equipo ganador  
        if (this.getTitleForTeams(this.getNumEquiposRestantes(rondaIndex)) === 'Final') { 
            this.toggleModal();
            this.equipoGanador = partido.ganador;  
        } 

        // Verificar si todos los partidos de la ronda han sido completados
        if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== undefined && p.goles2 !== undefined) && this.rondas[rondaIndex].partidos.length === this.juegos) {  
          this.juegos = 0;  
          this.generarSiguienteRonda(rondaIndex);  
        }
      } else {
        this.i++
        partido.estado = 'Completado'
        this.juegos++;
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

      this.juegos++;

      // Si estamos en la final, guardar el equipo ganador  
      if (this.final) { 
          this.toggleModal();
          this.equipoGanador = partido.ganador;  
      } 

      // Verificar si todos los partidos de la ronda han sido completados
      if (this.rondas[rondaIndex].partidos.every(p => p.goles1 !== undefined && p.goles2 !== undefined) && this.rondas[rondaIndex].partidos.length === this.juegos) { 
        this.juegos = 0;   
        this.generarSiguienteRonda(rondaIndex);
      } 
    } 
  } 

  generarSiguienteRonda(rondaIndex: number) {
    // Obtener ganadores válidos
    let ganadores: string[] = this.rondas[rondaIndex].partidos  
        .map(p => p.ganador)  
        .filter((g): g is string => g !== undefined && g !== 'Empate'); 

    // Verificar si hay un número impar de ganadores
    if (ganadores.length % 2 !== 0) {
        console.warn("Número impar de ganadores; se debe manejar adecuadamente.");
    }

    const partidos: { equipo1: string, equipo2: string, goles1: number, goles2: number, estado: 'En Espera' }[] = []; 
    
    //eliminar duplicados
    ganadores = this.eliminarDuplicados(ganadores);

    //eliminando la acumulación de goles
    this.reiniciarGoles()

    // Generación única de partidos, considerando ida y vuelta
    for (let i = 0; i < ganadores.length; i+=2) {  
      if (ganadores.length === 2) { 
        partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera' }); 
        this.final = true
      } else {
        if (ganadores[i + 1]) {
          // Solo se agrega un partido por emparejamiento
          partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera' });
          // Si estamos en la final, guardar el equipo ganador  
          if (ganadores.length === 2) { 
            partidos.push({ equipo1: ganadores[i], equipo2: ganadores[i + 1], goles1: 0, goles2: 0, estado: 'En Espera' });  
          } else {
            // Si es ida y vuelta, podemos agregar una estructura diferente si lo prefieres
            if (this.idaVuelta) {
              partidos.push({ equipo1: ganadores[i + 1], equipo2: ganadores[i], goles1: 0, goles2: 0, estado: 'En Espera' });
            }
          }
      }  
      }
    }

    // Almacenar partidos únicos en la ronda
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
    return this.equipos.length / Math.pow(2, rondaIndex);  
  } 

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  eliminarDuplicados(array: string[]) {
    return [...new Set(array)];
  }

  async generarPenales(partido: { equipo1: string, equipo2: string, penales?: { equipo1: number, equipo2: number } }) {  
    partido.penales = { equipo1: 0, equipo2: 0 }; // Inicializa los penales  
    alert(`Se generarán penales entre ${partido.equipo1} y ${partido.equipo2}.`);
    
        // Espera a que el usuario ingrese los resultados de los penales  
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
      } else {  
        return alert("Los penales también han terminado en empate.");  
      }  
      
      // Aquí puedes agregar lógica para avanzar al siguiente ronda si es necesario  
    }  
  }

  acumularGoles(equipo: string, goles: number) {
    if (!this.golesAcumulados[equipo]) {
        this.golesAcumulados[equipo] = 0; // Inicializamos si no existe
    }
    this.golesAcumulados[equipo] += goles; // Acumulamos los goles
  }

  // Método para verificar los goles acumulados
  obtenerGolesAcumulados() {
      return this.golesAcumulados;
  }

  // Método para reiniciar los goles
  reiniciarGoles() {
    this.golesAcumulados = {}; // Reiniciamos el objeto de goles acumulados
  }

  isCompletado(partido: any): boolean {
    return partido.estado === 'Completado';
  }
  
}
