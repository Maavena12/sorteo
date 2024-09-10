import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion-liguilla',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './configuracion-liguilla.component.html',
  styleUrl: './configuracion-liguilla.component.css'
})
export class ConfiguracionLiguillaComponent {
  cantidadEquipos: number = 3;  // Valor por defecto
  equipos: string[] = [];

  constructor(private router: Router) {}

  agregarEquipos() {
    this.equipos = Array(this.cantidadEquipos).fill('').map((_, i) => `Equipo ${i + 1}`);
  }

  redirectToNextPage() {
    const equiposString = JSON.stringify(this.equipos);
    this.router.navigate(['/configuracion-sorteo-liguilla', equiposString]);  
  } 
}
