import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignupOptions, UserInfo } from '../../interfaces/user-options';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserData } from '../../providers/user-data';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  signup: UserSignupOptions = { email: '', password: '', first_name: '', last_name: '', country: '', boxId: '' };
  userInfo: UserInfo = { userId: '', email: '', firstName: '', lastName: '', country: '', boxId: '' };
  toast: any;
  submitted = false;
  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public userData: UserData,
    public afStore: AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }



  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }
  async showToast(message: string, colour: string) {
    this.toast = await this.toastController.create({
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Yeah!',
      animated: true,
      message: message,
      color: colour,
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  async hideToast() {
    this.toast = this.toastController.dismiss();
  }



  async onSignup(form: NgForm) {

    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.email);
    }

    try {

      if (this.signup.first_name === '' || this.signup.last_name === '' || this.signup.country === '') {
        this.presentAlert('Blank Fields', 'Please fill up all the required fields.');
        return false;
      }

      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.signup.email, this.signup.password);
      // console.log(res);

      // auto generate a new box when a user signs up
      const boxRes = await this.afStore.collection('boxes').add({});
      // console.log(boxRes.id);

      await this.afStore.doc(`users/${res.user.uid}`).set({
        email: this.signup.email,
        first_name: this.signup.first_name,
        last_name: this.signup.last_name,
        country: this.signup.country,
        boxId: boxRes.id
      });

      // update userInfo to be passed later
      this.userInfo.userId = res.user.uid;
      this.userInfo.boxId = boxRes.id;
      this.userInfo.email = this.signup.email;
      this.userInfo.firstName = this.signup.first_name;
      this.userInfo.lastName = this.signup.last_name;
      this.userInfo.country = this.signup.country;


      this.presentAlert('Success', 'You are registered!');
      this.router.navigate(['/app/tabs'], { state: { userInfo: this.userInfo } });

    } catch (err) {
      this.presentAlert(err.code, err.message);
    }

  }
}
