import { Routes } from '@angular/router';
import { Operacion } from './pages/operacion';
import { HeroClass } from './hero/hero';
import { CharacterListComponent } from './features/characters/pages/character-list/character-list';
import { CharacterDetailComponent } from './features/characters/pages/character-detail/character-detail';

export const routes: Routes = [
    /**{
        path: '',
        loadComponent: () =>
            import('./features/characters/pages/character-list/character-list')
                .then(m => m.CharacterListComponent),
    },**/
    {
        path: '',
            component: CharacterListComponent
    },
    /**{
        path: ':id',
        loadComponent: () =>
            import('./features/characters/pages/character-detail/character-detail')
                .then(m => m.CharacterDetailComponent),
    },**/
    
    {
        path: 'operacion',
        component: Operacion
            
    },
    {
        path: 'hero',
        component: HeroClass
    },
    {
        path:':id',
            component: CharacterDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    },
    
    
    
    
];