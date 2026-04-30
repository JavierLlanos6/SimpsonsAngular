import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-character-detail',
  imports: [CommonModule],
  templateUrl: './character-detail.html',
  styleUrls: ['./character-detail.css'],
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private service: CharactersService,
    private cdr: ChangeDetectorRef // lo mismo que el list
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading = true;

    this.service.getCharacterById(id).subscribe({
      next: (data) => {
        console.log('DETAILllll:', data);

        this.character = data;
        this.loading = false;

        this.cdr.detectChanges(); // no borrar explicado en list
      },
      error: (err) => {
        console.log('ERROR:', err);
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}