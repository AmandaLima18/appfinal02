import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit() { }

  uploadFile(event) {

    console.log(event.target.files[0]);

    const task = this.storage.ref(event.target.files[0].name).put(event.target.files[0]);

  }

}
