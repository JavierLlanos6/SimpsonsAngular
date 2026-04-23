import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videojuegos',
  imports: [FormsModule],
  templateUrl: './videojuegos.html',
  styleUrl: './videojuegos.css',
})
export class Videojuegos {
  videojuegos: string[] = [];
  nuevoJuego: string = "";
  addJuego() {
    if (this.nuevoJuego && this.nuevoJuego.trim()) {
      this.videojuegos.push(this.nuevoJuego.trim())
      this.nuevoJuego = "";
    }
  }
}
