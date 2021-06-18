import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  public user: any;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public alert: AlertController,
  ) { }

  ngOnInit() { }

  delete() {

    // Obtém dados do usuário logado
    this.auth.onAuthStateChanged(
      (userData) => {

        // Obtém dados documeto
        this.afs.firestore.doc(`profile/${userData.uid}`).get()
          .then(
            (uData) => {
              this.user = uData.data();

              // Salva em um novo documento do Firebase Firestore
              this.afs.collection('profile-filed').add(this.user)
                .then(
                  () => {

                    // Feedback
                    this.presentAlert(userData.uid);
                  }
                )
                .catch(

                  // Exibe erro se não salvar
                  (error) => {
                    alert('Erro ao salvar contato.' + error);
                  }
                );
            }
          )
          .catch(
            (error) => {
              console.error(`Erro: ${error}`);
            }
          )
      });
  } 

  // Feedback
  // Exibe feedback
  async presentAlert(uid: string) {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Seus dados foram removidos com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Remover cadastro
          this.afs.doc(`profile/${uid}`).delete();

          // Faz logout
          this.auth.signOut()
          .then(
            () => {
              this.router.navigate(['/home']);
            }
          );
        }
      }]
    });

    await alert.present();
  }

}
