import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '../../services/characters';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true, // 🔥 CLAVE
  imports: [CommonModule], // 🔥 CLAVE
  templateUrl: './character-detail.html',
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private charactersService: Characters
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.charactersService.getCharacterById(id).subscribe((data) => {
      this.character = data;
    });
  }
}