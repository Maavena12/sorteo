import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cantidad-equipos',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './cantidad-equipos.component.html',
  styleUrl: './cantidad-equipos.component.css'
})
export class CantidadEquiposComponent {

  cantidadEquipos: number = 3; 
  equipos: string[] = [];

  constructor(private router: Router) {}

  agregarEquipos() {
    this.equipos = Array(this.cantidadEquipos).fill('').map((_, i) => `Equipo ${i + 1}`);
  }

  redirectToNextPage() {
    const equiposString = JSON.stringify(this.equipos);
    this.router.navigate(['/configuracion-sorteo', equiposString]);  
  } 
}
