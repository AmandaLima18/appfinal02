import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.auth.signOut()
      .then(
        () => {
          this.router.navigate(['/home']);
        }
      );
  }

}
