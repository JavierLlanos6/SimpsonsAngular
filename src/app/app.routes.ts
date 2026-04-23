import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'characters',
        loadComponent: () =>
            import('./features/characters/pages/character-list/character-list')
                .then(m => m.CharacterListComponent),
    },
    {
        path: 'characters/:id',
        loadComponent: () =>
            import('./features/characters/pages/character-detail/character-detail')
                .then(m => m.CharacterDetailComponent),
    },
    { path: '', redirectTo: 'characters', pathMatch: 'full' }
];