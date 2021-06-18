import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importa dependências do AuthGuard
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';

/* Redirecionamentos do AuthGuard */

// Usuário não logado? Vai para a página incial.
const toLogin = () => redirectUnauthorizedTo(['/home']);

// Usuário está logado? Vai para a página de conteúdo.
const isLogged = () => redirectLoggedInTo(['/content']);

const routes: Routes = [

  // Define 'home' como página inicial
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Página inicial
  // Só acessível se usuário ainda não logou
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },

  // Página de login
  // Só acessível se usuário ainda não logou
  {
    path: 'user/login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },

  // Página de logout
  // Só acessível se usuário está logado
  {
    path: 'user/logout',
    loadChildren: () => import('./user/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Página de cadastro
  // Só acessível se usuário está logado
  {
    path: 'user/new',
    loadChildren: () => import('./user/new/new.module').then( m => m.NewPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Página para editar perfil
  // Só acessível se usuário está logado
  {
    path: 'user/edit',
    loadChildren: () => import('./user/edit/edit.module').then( m => m.EditPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Página do perfil do usuário
  // Só acessível se usuário está logado
  {
    path: 'user/profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Página principal da aplicação
  // Só acessível se usuário está logado
  {
    path: 'content',
    loadChildren: () => import('./page/content/content.module').then( m => m.ContentPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Página de contatos
  // Acessível para todos
  {
    path: 'contacts',
    loadChildren: () => import('./page/contacts/contacts.module').then( m => m.ContactsPageModule)
  },

  // Página sobre
  // Acessível para todos
  {
    path: 'about',
    loadChildren: () => import('./page/about/about.module').then( m => m.AboutPageModule)
  },

  {
    path: 'new',
    loadChildren: () => import('./page/new/new.module').then( m => m.NewPageModule)
  },

  // Página de remoção do perfil
  // Só acessível se usuário está logado
  {
    path: 'user/delete',
    loadChildren: () => import('./user/delete/delete.module').then( m => m.DeletePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // Rota curinga (Erro 404)
  // DEVE SER SEMPRE A ÚLTIMA ROTA
  {
    path: '**',
    loadChildren: () => import('./page/e404/e404.module').then( m => m.E404PageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
