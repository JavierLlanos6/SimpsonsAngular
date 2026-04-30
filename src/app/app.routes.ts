import { Routes } from '@angular/router';
import { Operacion } from './pages/operacion';
import { HeroClass } from './hero/hero';
import { CharacterListComponent } from './features/characters/pages/character-list/character-list';
import { CharacterDetailComponent } from './features/characters/pages/character-detail/character-detail';
import { PruebaCrudClass } from './prueba/prueba';
import { PruebaDetailComponent } from './prueba-detail/pruebaDetail';
import { TablaComponent } from './tablas/tabla.component';

export const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent
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
    path: 'crud',
    component: PruebaCrudClass
  },
  {
    path: 'crud/:id', 
    component: PruebaDetailComponent
  },
  {
    path: 'tabla',
    component: TablaComponent
  },
  {
    path: ':id', 
    component: CharacterDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];