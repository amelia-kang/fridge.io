import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginOptions } from '../../interfaces/user-options';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserData } from '../../providers/user-data';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { format } from 'url';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage implements OnInit {

  login: UserLoginOptions = { email: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public userData: UserData,
    public alertController: AlertController,
    private afStore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  async onLogin(form: NgForm) {

    this.submitted = true;

    if (form.value) {
      this.userData.login(this.login.email);
    }

    try {
      // authenticate user and retrieve result
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password);
      console.log('Login success!');
      console.log(res.user.uid);

      // go to space page after logging in
      await this.router.navigate(['/app/tabs/space'], { state: { userid: res.user.uid } });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        this.presentAlert('User not found', 'Please sign up for an account first.');
      } else if (err.code === 'auth/wrong-password') {
        this.presentAlert('Incorrect password', 'Please try again.');
      } else {
        console.dir(err);
        this.presentAlert('Unsolved error', 'Please contact admin for help');
      }
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
