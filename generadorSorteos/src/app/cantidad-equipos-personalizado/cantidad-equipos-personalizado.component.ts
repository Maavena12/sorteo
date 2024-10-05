import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cantidad-equipos-personalizado',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './cantidad-equipos-personalizado.component.html',
  styleUrl: './cantidad-equipos-personalizado.component.css'
})
export class CantidadEquiposPersonalizadoComponent {

  cantidadEquipos: number = 3; 
  equipos: string[] = [];

  constructor(private router: Router) {}

  agregarEquipos() {
    this.equipos = Array(this.cantidadEquipos).fill('').map((_, i) => `Equipo ${i + 1}`);
  }

  redirectToNextPage() {
    const equiposString = JSON.stringify(this.equipos);
    this.router.navigate(['/configuracion-sorteo-personalizado', equiposString]);  
  } 

}
