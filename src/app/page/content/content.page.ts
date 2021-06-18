import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  public data: Array<any> = [];
  public apiURL = 'http://localhost:3000/';

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {

    // Obtém dados do usuário logado


      // Obtem todos os documentos da API
      this.http.get(
        this.apiURL
        + `projetos`)
        .subscribe(
          (res: any) => {

            // Prepara dados para a view (HTML)
            this.data = res;
          }
        );
  }
open(url){
  window.open(url);
  return false;
}
}


