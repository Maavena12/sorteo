import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-sorteo',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './configuracion-sorteo.component.html',
  styleUrl: './configuracion-sorteo.component.css'
})
export class ConfiguracionSorteoComponent {
  equipos: string[] = [];  
  divisores: number[] = [];
  selectedDivisor: number | null = null;
  cantidadGrupos: string = '';
  seleccionarPartido: string = '';
  isModalActive = false;
  isDivisor = false;
  clasificados: number[] = []
  cantidadClasificados: number = 0
  numeroGrupos: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {  
      this.route.params.subscribe(params => {  
          this.equipos = JSON.parse(params['equipos']);  
      });
      this.divisores = this.calcularDivisores(this.equipos.length);
  }  

  calcularDivisores(num: number): number[] {
    const divisores: number[] = [];
    for (let i = 3; i <= num; i++) {
        if (num % i === 0) {
            divisores.push(i);
        }
    }
    return divisores;
  }

  onDivisorSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value; 
  
    const divisor = Number(value);
  
    if (!isNaN(divisor) && divisor > 0) {
      this.selectedDivisor = divisor;
  
      const cantidadEquipos = this.equipos.length;
      const cantidadDeGrupos = cantidadEquipos / divisor;
      this.cantidadGrupos = `(${cantidadDeGrupos}) grupo${cantidadDeGrupos > 1 ? 's' : ''} de ${divisor} equipos`;
      this.numeroGrupos = cantidadDeGrupos
      this.isDivisor = true
    } else {
      this.cantidadGrupos = '';
      this.isDivisor = false
    }

    this.clasificados =  this.potenciasDe2DentroDe(divisor)
  }

  pasarGrupo(event: Event): void{
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;

    const divisor = Number(value);

    this.cantidadClasificados = divisor
  }

  potenciasDe2DentroDe(n: number) {
    const potencias = [];

    if (this.numeroGrupos === 1){
      let i = 2;
      while (i <= n - 1) {
          potencias.push(i);
          i *= 2;
      }
      return potencias;
    } else {
      let i = 1;
      while (i <= n - 1) {
          potencias.push(i);
          i *= 2;
      }
      return potencias;
    }
  }

  sorteoFinal(){
    if (this.seleccionarPartido === ''){
      this.toggleModal()
    } else {
      const equiposString = JSON.stringify(this.equipos);
      const divisor = this.selectedDivisor
      const selected = this.seleccionarPartido
      const cantidad = this.cantidadClasificados;
      this.router.navigate(['/sorteo-final', equiposString, divisor, selected, cantidad]);
    } 
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
}
