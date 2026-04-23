import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CharactersService } from '../../services/characters';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-character-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  loading = true;

  constructor(
    private service: CharactersService,
    private cdr: ChangeDetectorRef // no borrar para que muestre la lista
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.service.getCharacters().subscribe({
      next: (data) => {
        console.log('DATA:', data);

        this.characters = data.results;
        this.loading = false;

        this.cdr.detectChanges(); // forzar el render y no se quede trancado en cargando...
      },
      error: (err) => {
        console.log('ERROR:', err);
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}