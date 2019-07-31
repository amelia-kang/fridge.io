import { Component, OnInit } from '@angular/core';
import { ItemOptions } from '../../interfaces/item-options';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';



@Component({
  selector: 'add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  newItem: ItemOptions = { name: '', id: '', date_expiry: null, type: '', storage: '' };
  toast: any;

  // Because routing with param passing is not working, we have to add a bit of hardcodind here...
  boxId = 'QtH2W8HRgqaw5xhtMYKi';
  userId = 'zEg0AjORhUdKyIUKUYII7UdGDEA2';

  constructor(
    public router: Router,
    public afStore: AngularFirestore,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav.extras.state;
    this.userId = state.userId;
    this.boxId = state.boxId;
    console.log(state);
    console.log(this.boxId);
    console.log(this.userId);

  }

  async onSubmit() {
    try {

      if (this.newItem.name === '' || this.newItem.type === '' || this.newItem.storage === '' || this.newItem.date_expiry === null) {
        this.showToast('Please fill in all the blanks.', 'warning');
        return false;
      }

      // auto generate a new item when a user submits
      const res = await this.afStore.collection('boxes').doc(this.boxId).collection(this.userId).add({});
      let firestamp = Number(Date.parse(this.newItem.date_expiry));
      this.newItem.date_expiry = firebase.firestore.Timestamp.fromMillis(firestamp);

      await this.afStore.doc(`boxes/${this.boxId}/${this.userId}/${res.id}`).set({
        name: this.newItem.name,
        id: res.id,
        storage: this.newItem.storage,
        type: this.newItem.type,
        date_expiry: this.newItem.date_expiry,
      });

      await this.showToast('Item added:)', 'success');

      this.router.navigateByUrl('/app/tabs/space');

    } catch (err) {
      this.showToast('Sorry, something is wrong, please contact admin.', 'warning');
      console.log(err);
      console.dir(err);
    }
  }

  async showToast(message: string, colour: string) {
    this.toast = await this.toastController.create({
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Yeah',
      animated: true,
      message: message,
      color: colour,
      duration: 2500
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  async hideToast() {
    this.toast = this.toastController.dismiss();
  }
}
