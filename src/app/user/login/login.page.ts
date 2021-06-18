import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: any;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public alert: AlertController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (data) => {

          this.afs.firestore.doc(`profile/${data.user.uid}`).get()
            .then((uData) => {

              // Se tem perfil
              if (uData.exists) {
                this.feedback(
                  data.user.displayName,
                  'Você já pode acessar o conteúdo restrito.',
                  '/content'
                );
              } else {
                this.feedback(
                  data.user.displayName,
                  'Você precisa completar seu cadastro para acessar o conteúdo restrito.',
                  '/user/new'
                );
              }
            })
        }
      )
      .catch();
  }

  async feedback(userName: string, message: string, routerLink: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate([routerLink]);
        }
      }]
    });

    await alert.present();
  }

}
