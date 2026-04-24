import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/characters/pages/character-list/character-list')
                .then(m => m.CharacterListComponent),
    },
    {
        path: 'operacion',
        loadComponent: () => 
            import('./pages/operacion')
            .then(m => m.Operacion)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./features/characters/pages/character-detail/character-detail')
                .then(m => m.CharacterDetailComponent),
    },
    
    
];