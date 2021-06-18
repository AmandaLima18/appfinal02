import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public item: any;
  public user: any;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

    // Obtém dados do usuário logado
    this.auth.onAuthStateChanged(
      (userData) => {

        // Obtém dados documeto
        this.afs.firestore.doc(`profile/${userData.uid}`).get()
          .then(
            (uData) => {
              this.user = uData.data();

              if (this.user.whatsapp) this.user.wsToggle = 'logo-whatsapp';
              else this.user.wsToggle = 'call';
            }
          )
          .catch(
            (error) => {
              console.error(`Erro: ${error}`);
            }
          )
      });
  }

  toProfile() {
    window.open('https://myaccount.google.com/');
    return false;
  }

}
