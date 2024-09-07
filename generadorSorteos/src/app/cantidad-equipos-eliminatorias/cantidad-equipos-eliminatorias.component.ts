import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cantidad-equipos-eliminatorias',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './cantidad-equipos-eliminatorias.component.html',
  styleUrl: './cantidad-equipos-eliminatorias.component.css'
})
export class CantidadEquiposEliminatoriasComponent {
  cantidadEquipos: number = 2; 
  equipos: string[] = [];
  numbers: number[] = [2, 4, 8, 16, 32, 64];

  constructor(private router: Router) {}

  agregarEquipos() {
    this.equipos = Array(Number(this.cantidadEquipos)).fill('').map((_, i) => `Equipo ${i + 1}`);
  }

  redirectToNextPage() {
    const equiposString = JSON.stringify(this.equipos);
    this.router.navigate(['/configuracion-eliminatoria', equiposString]);  
  } 
}
