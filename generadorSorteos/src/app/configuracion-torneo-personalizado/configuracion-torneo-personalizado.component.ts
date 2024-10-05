import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-torneo-personalizado',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './configuracion-torneo-personalizado.component.html',
  styleUrl: './configuracion-torneo-personalizado.component.css'
})
export class ConfiguracionTorneoPersonalizadoComponent {
  equipos: string[] = [];  
  divisores: number[] = [];
  selectedDivisor: number | null = null;
  cantidadGrupos: string = '';
  seleccionarPartido: string = '';
  isModalActive = false;
  isDivisor = false;
  clasificados: number[] = []
  cantidadClasificados: number = 0
  opciones: string[] = [];
  opcionSelected: string = ''

  constructor(private route: ActivatedRoute, private router: Router) {  
      this.route.params.subscribe(params => {  
          this.equipos = JSON.parse(params['equipos']);  
      });
      this.divisores = this.calcularDivisores(this.equipos.length);
  }  

  calcularDivisores(num: number): number[] {
    const divisores: number[] = [];
    divisores.push(this.equipos.length)
    return divisores;
  }

  onDivisorSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value; 
  
    const divisor = Number(value);

    this.clasificados =  this.potenciasDe2DentroDe(divisor)
  
    if (!isNaN(divisor) && divisor > 0) {
      this.selectedDivisor = divisor;
  
      const cantidadEquipos = this.equipos.length;
      const cantidadDeGrupos = cantidadEquipos / divisor;
      this.cantidadGrupos = `(${cantidadDeGrupos}) grupo${cantidadDeGrupos > 1 ? 's' : ''} de ${divisor} equipos`;
      this.isDivisor = true
    } else {
      this.cantidadGrupos = '';
      this.isDivisor = false
    }
  }

  pasarGrupo(event: Event): void{
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    const divisor = Number(value);

    this.cantidadClasificados = divisor

    this.generarOpciones()

  }

  potenciasDe2DentroDe(n: number) {
    const potencias = [];
    let i = 2;
    while (i <= n) {
        potencias.push(i);
        i++;
    }
    return potencias;
  }

  sorteoFinal(){
    if (this.seleccionarPartido === ''){
      this.toggleModal()
    } else {
      const equiposString = JSON.stringify(this.equipos);
      const divisor = this.equipos.length
      const selected = this.seleccionarPartido
      const cantidad = this.cantidadClasificados;
      const opcion = JSON.stringify(this.opcionSelected)
      this.router.navigate(['/sorteo-final-personalizado', equiposString, divisor, selected, cantidad, opcion]);
    } 
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  generarOpciones() {
    this.opciones = []; // Reinicia el array de opciones

    if (this.cantidadClasificados === 2) {
      this.opciones.push('Final');
    } else if (this.cantidadClasificados === 3) {
      this.opciones.push('1° Lugar - Final Directa, Una Semi Final (2° Lugar - Semifinal, 3° Lugar - Semifinal)');
    } else if (this.cantidadClasificados === 4) {
      this.opciones.push('Dos Semi Finales');
    } else if (this.cantidadClasificados === 5) {
      this.opciones.push('1° Lugar - Final Directa, Dos Semi Finales (2° Lugar - Semifinal, 3° Lugar - Semifinal, 4° Lugar - Semifinal, 5° Lugar - Semifinal)');
    } else if (this.cantidadClasificados === 6) {
      this.opciones.push('1° Lugar vs 2° Lugar - Final Directa, Dos Semi Finales (3° Lugar - Semifinal, 4° Lugar - Semifinal, 5° Lugar - Semifinal, 6° Lugar - Semifinal)');
    } else if (this.cantidadClasificados === 7) {
      this.opciones.push('1° Lugar - Final Directa, Tres Semi Finales (2° Lugar - Semifinal, 3° Lugar - Semifinal, 4° Lugar - Semifinal, 5° Lugar - Semifinal, 6° Lugar - Semifinal, 7° Lugar - Semifinal)');
    } else if (this.cantidadClasificados === 8) {
      this.opciones.push('Cuartos de Final');
    } else if (this.cantidadClasificados === 9) {
      this.opciones.push('1° Lugar - Final Directa, Cuartos de Final (2° Lugar - Cuartos de Final, 3° Lugar - Cuartos de Final, 4° Lugar - Cuartos de Final, 5° Lugar - Cuartos de Final, 6° Lugar - Cuartos de Final, 7° Lugar - Cuartos de Final, 8° Lugar - Cuartos de Final, 9° Lugar - Cuartos de Final)');
    } else if (this.cantidadClasificados === 10) {
      this.opciones.push('1° Lugar vs 2° Lugar - Final Directa, Cuartos de Final (3° Lugar - Cuartos de Final, 4° Lugar - Cuartos de Final, 5° Lugar - Cuartos de Final, 6° Lugar - Cuartos de Final, 7° Lugar - Cuartos de Final, 8° Lugar - Cuartos de Final, 9° Lugar - Cuartos de Final, 10° Lugar - Cuartos de Final)');
    }
  }

  pasarOpcion(event: Event): void{
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    this.opcionSelected = value

  }
}
