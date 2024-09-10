import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipo } from '../equipo';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

// Definimos la estructura para la clasificación  
interface EquipoClasificacion {  
  nombre: string;  
  puntos: number;  
  goles: number;  
} 

interface ResultadoPartido {  
  rival: string;  
  golesCasa: number;  
  golesVisita: number;  
  estado: string;
  completado: boolean;
} 

@Component({
  selector: 'app-champions-league-format',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './champions-league-format.component.html',
  styleUrls: ['./champions-league-format.component.css']
})
export class ChampionsLeagueFormatComponent {
  equipos: string[] = [];  
  totalEquipos: number = 36;
  grupos: any
  golesCasa: number = 0;  
  golesVisita: number = 0;
  faCheck = faCheck
  clasificacion: EquipoClasificacion[] = []; 
  resultadosPartidos: ResultadoPartido[] = [];
  resultadosPartidosVisita: ResultadoPartido[] = [];
  resultadosCalculados: { [key: string]: { golesEquipo1: number; golesEquipo2: number } } = {};  
  partidosRestantes: { [key: number]: number } = {}; 
  jornadasCompletas: boolean = false;
  jugados: number = 0;
  simulado: boolean = false

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {  
      this.equipos = JSON.parse(params['equipos']);  
    });

    this.grupos = this.equiposConRivales()
    this.inicializarClasificacion();
    this.inicializarResultados(); 

    this.availableEquipos.forEach((_, index) => {  
      this.partidosRestantes[index] = 8; // Cada equipo tiene 8 partidos  
    }); 
  }

  // Generamos una lista de equipos (puedes personalizar sus nombres si es necesario)
  availableEquipos = Array.from({ length: this.totalEquipos }, (_, i) => `Equipo ${i + 1}`);

  // Función para obtener rivales aleatorios y dividirlos en casa y visita
  getRivales(equipo: string): { casa: string[], visita: string[] } {
    const rivales = this.availableEquipos.filter(e => e !== equipo); // Filtramos el equipo actual
    const shuffled = rivales.sort(() => 0.5 - Math.random()); // Mezclamos los rivales

    // Tomamos los primeros 8 rivales y los dividimos en casa y visita
    const casa = shuffled.slice(0, 4);
    const visita = shuffled.slice(4, 8);
    
    return { casa, visita };
  }

  // Generamos una lista con los equipos y sus rivales
  equiposConRivales(): Array<{ equipo: string, rivalesCasa: string[], rivalesVisita: string[] }> {
    return this.availableEquipos.slice(0, this.equipos.length).map(equipo => {
      const { casa, visita } = this.getRivales(equipo);
      return {
        equipo,
        rivalesCasa: casa,
        rivalesVisita: visita
      };
    });
  }

  completarPartido(nombreCasa: string, nombreVisita: string, golesCasa: number, golesVisita: number, index: number, nombre: string) { 
    // Encontrar los equipos involucrados  
    const equipoCasa = this.clasificacion.find(e => e.nombre === nombreCasa);  
    const equipoVisita = this.clasificacion.find(e => e.nombre === nombreVisita);  
  
    // Verificar que ambos equipos fueron encontrados  
    if (!equipoCasa || !equipoVisita) {  
      console.error('Uno de los equipos no se encontró en la clasificación.');  
      return; // Salir de la función si alguno de los equipos no se encuentra  
    }  
  
    // Sumar los goles  
    equipoCasa.goles += golesCasa;  
    equipoVisita.goles += golesVisita;  
  
    // Asignar puntos según el resultado  
    if (golesCasa > golesVisita) {  
      equipoCasa.puntos += 3; // Gana el equipo de casa  
    } else if (golesCasa < golesVisita) {  
      equipoVisita.puntos += 3; // Gana el equipo visitante  
    } else {  
      equipoCasa.puntos += 1; // Empate  
      equipoVisita.puntos += 1; // Empate  
    }  
  
    // Actualización de la tabla de clasificación  
    this.ordenarClasificacion(); 
    /*
    if(nombre === 'Casa'){
      this.resultadosPartidos[index].estado = 'Completado';
      this.resultadosPartidos[index].completado = true;
      this.jugados++
    } else {
      this.resultadosPartidosVisita[index].estado = 'Completado';
      this.resultadosPartidosVisita[index].completado = true;
      this.jugados++
    }*/
    this.jugados++

    if (this.jugados === this.equipos.length * 8){
      this.jornadasCompletas = true
    }

    if (this.jornadasCompletas){
      // Array para los primeros 8 equipos
      const primeros8Equipos = this.clasificacion.slice(0, 8).map(equipo => equipo.nombre);
      
      // Array para los equipos del 9 al 24
      const equipos9a24 = this.clasificacion.slice(8, 24).map(equipo => equipo.nombre);

      this.router.navigate(["/sorteo-final-champions", JSON.stringify(equipos9a24), JSON.stringify(primeros8Equipos), JSON.stringify(this.equipos), 'si'])
    }
  } 

  inicializarClasificacion() {  
    this.clasificacion = this.availableEquipos.map(equipo => ({  
      nombre: equipo,  
      puntos: 0,  
      goles: 0  
    }));  
  } 

  inicializarResultados() {  
    this.grupos[0].rivalesCasa.forEach((rival: any) => {  
      this.resultadosPartidos.push({ rival, golesCasa: 0, golesVisita: 0, estado: 'En Espera', completado: false });  
    }); 
    
    this.grupos[0].rivalesVisita.forEach((rival: any) => {  
      this.resultadosPartidosVisita.push({ rival, golesCasa: 0, golesVisita: 0, estado: 'En Espera', completado: false });  
    });
  } 

  ordenarClasificacion() {  
    this.clasificacion.sort((a, b) => {  
      // Ordenar primero por puntos (descendente), luego por goles (descendente)  
      if (b.puntos === a.puntos) {  
        return b.goles - a.goles; // Si los puntos son iguales, ordenar por goles  
      }  
      return b.puntos - a.puntos; // Ordenar por puntos  
    });  
  } 

  simularResultados() {  
    // Función para simular los partidos  
    const simularPartidos = (equipoIndex: number) => {  
      if (this.partidosRestantes[equipoIndex] === 0) return; // Si ya no tiene partidos, salir  

      const rivales = this.availableEquipos.map((_, rivalIndex) => rivalIndex).filter(rivalIndex =>   
        rivalIndex !== equipoIndex && // No puede jugar contra sí mismo  
        this.partidosRestantes[rivalIndex] > 0 // Solo puede jugar contra rivales que tienen partidos restantes  
      );    

      // Seleccionar rivales aleatorios y simular resultados  
      const rivalesSeleccionados = rivales.slice(0, this.partidosRestantes[equipoIndex]);   

      rivalesSeleccionados.forEach(rivalIndex => {  
        const resultado = this.generarResultado();  
        this.resultadosCalculados[`${equipoIndex}-${rivalIndex}`] = resultado;

        // Actualizar goles y puntos solo si los equipos están en la simulación  
        if (this.grupos[0].rivalesVisita.includes(this.availableEquipos[rivalIndex]) || this.grupos[0].rivalesCasa.includes(this.availableEquipos[rivalIndex])) { 
          this.clasificacion[equipoIndex].goles += resultado.golesEquipo1;  
          this.clasificacion[rivalIndex].goles += resultado.golesEquipo2;  

          if (resultado.golesEquipo1 > resultado.golesEquipo2) {  
            this.clasificacion[equipoIndex].puntos += 3; // Victoria  
          } else if (resultado.golesEquipo1 < resultado.golesEquipo2) {  
            this.clasificacion[rivalIndex].puntos += 3; // Victoria  
          } else {  
            this.clasificacion[equipoIndex].puntos += 1; // Empate  
            this.clasificacion[rivalIndex].puntos += 1; // Empate  
          }  

          this.partidosRestantes[equipoIndex]--;  
          this.partidosRestantes[rivalIndex]--;  
        }  
      });  
    };  

    // Simular resultados para todos los equipos  
    this.availableEquipos.forEach((_, index) => {  
      simularPartidos(index);  
    });  

    // Ordenar la clasificación por puntos (de mayor a menor)  
    this.clasificacion.sort((a, b) => b.puntos - a.puntos);  

    if (!this.jornadasCompletas){
      for (let i = 0; this.equipos.length > i; i++){
        const clasificacionEncontrada = this.clasificacion.find(n => n.nombre === this.equipos[i]);
  
        if (clasificacionEncontrada) {
            clasificacionEncontrada.goles = 0;
            clasificacionEncontrada.puntos = 0;
        }
      }
    } 

    // Ordenar la clasificación por puntos (de mayor a menor)  
    this.clasificacion.sort((a, b) => b.puntos - a.puntos); 

    this.simulado = true
  }  

  // Función para generar un resultado aleatorio  
  generarResultado() {  
    const golesEquipo1 = Math.floor(Math.random() * 5); // Goles del equipo 1 (0-4)  
    const golesEquipo2 = Math.floor(Math.random() * 5); // Goles del equipo 2 (0-4)  
    return { golesEquipo1, golesEquipo2 };  
  }  
}