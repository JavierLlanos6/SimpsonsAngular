import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'characters',
        loadChildren: () =>
            import('./features/characters/characters-module').then(
                (m) => m.CharactersModule
            ),
    },
    { path: '', redirectTo: 'characters', pathMatch: 'full' }
];
