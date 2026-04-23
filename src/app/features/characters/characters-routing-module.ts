import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterList } from './pages/character-list/character-list';
import { CharacterDetail } from './pages/character-detail/character-detail';

const routes: Routes = [
  { path: '', component: CharacterList },
  { path: '', component: CharacterDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule { }
