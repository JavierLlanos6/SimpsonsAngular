import { Routes } from '@angular/router';
import { Operacion } from './pages/operacion';
import { HeroClass } from './hero/hero';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/characters/pages/character-list/character-list')
                .then(m => m.CharacterListComponent),
    },
    {
        path: 'operacion',
        component: Operacion
            
    },
    {
        path: 'hero',
        component: HeroClass
    },
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./features/characters/pages/character-detail/character-detail')
                .then(m => m.CharacterDetailComponent),
    },
    
    
    
];