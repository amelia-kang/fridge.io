import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {

  userId = 'zEg0AjORhUdKyIUKUYII7UdGDEA2';
  userInfo: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private afStore: AngularFirestore
  ) {
    this.afStore.collection('users').doc(this.userId).get()
      .toPromise()
      .then(function (doc) {
        this.userInfo = doc.data();
        console.log(doc.data());
      });
    console.log(this.userInfo);
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.userInfo.name = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}
