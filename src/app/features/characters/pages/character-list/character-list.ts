import { Component, OnInit } from '@angular/core';
import { Characters } from '../../services/characters';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-list.html',
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];

  constructor(private charactersService: Characters) { }
  loading = true;

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.loading = false;
    });
  }
}
