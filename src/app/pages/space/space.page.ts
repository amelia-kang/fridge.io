/* 
Space page as the main page in the app contains the item list for users.
Main functionalities:
- scrolling
- add-item button that navigates to add-item page
- delete an item by sliding the item to the left
- items are sorted in chronological order
- item name search function 
*/


import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { ItemOptions } from '../../interfaces/item-options';
import { AngularFirestore } from '@angular/fire/firestore';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NavExtrasService } from '../../nav-extra.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'space',
  templateUrl: './space.page.html',
  styleUrls: ['./space.page.scss'],
})

export class SpacePage implements OnInit {

  // Gets a reference to the list element
  boxId = 'QtH2W8HRgqaw5xhtMYKi';
  userId = 'zEg0AjORhUdKyIUKUYII7UdGDEA2';
  loadedGoalList: any = [];
  items: any = [];
  item: ItemOptions = { date_expiry: Date.now(), id: '', name: '', storage: '', type: '' };
  toast: any;
  segment = 'all';

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastController: ToastController,
    private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,

  ) { }


  async ngOnInit() {

    /*  Passing userId from login page or signin page to space.page.
        Still buggy -- parameters are not passed correctly for some reason.
    */
    // const navigation = await this.router.getCurrentNavigation();
    // const state = await navigation.extras.state;
    // this.userId = state.userId;
    // // if (state.boxId !== '') { this.boxId = state.boxId; }

    // console.log('user id: ', this.userId);
    // console.log('box id: ', state.boxId);

    // // display box -> item list
    // if (this.userId !== '' && this.boxId !== '') {
    //   await this.getBoxItems(this.boxId, this.userId);
    // } else {
    //   if (this.userId === '') {
    //     await this.showToast('userId not found! Directing back to /Login', 'warning', 'Okay');
    //     this.router.navigateByUrl('/login');
    //     return;
    //   } else if (this.boxId === '') {
    //     console.log('boxId not found!');
    //     await this.getBoxId(this.userId);
    //     await this.getBoxItems(this.boxId, this.userId);
    //   }
    // }

    this.getBoxItems(this.boxId, this.userId);
  }

  /* Get boxId from userId that is supposedly given from routing. */
  async getBoxId(uid: string) {

    // get boxId with uid from firebase
    this.boxId = await this.firestore.collection('users').doc(uid).get().toPromise().then(function (doc) {
      if (doc.exists) {
        console.log('boxId = ', doc.data().boxId);
        return doc.data().boxId;
      } else {
        console.log('No such document!');
        this.showToast('boxId not found!', 'warning', 'Okay');
        return;
      }
    });
  }

  /*   Load items from Firebase into this.items
    This function will detect change in db and auto-reload page for any update. Amazing! */
  async getBoxItems(boxId, userId) {
    this.items = [];
    await this.firestore.collection('boxes').doc(boxId).collection(userId).valueChanges()
      .subscribe(list => {
        this.items = list;

        // sort item list in terms of expiry dates
        this.items.sort(function (a, b) {
          let dateA = a.date_expiry.seconds, dateB = b.date_expiry.seconds;
          return dateA - dateB;
        });

        this.loadedGoalList = list;
      });
  }

  // initialize shownItems again
  initializeItems(): void {
    this.items = this.loadedGoalList;
  }

  // filter search function
  filterList(event) {
    this.initializeItems();
    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }
    this.items = this.items.filter(goal => {
      if (goal.name && searchTerm) {
        // console.log(goal.name);
        if (goal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  // Remove an item by sliding and clicking the button
  async removeItem(slidingItem: HTMLIonItemSlidingElement, docId: string) {
    const alert = await this.alertCtrl.create({
      message: 'Would you like to remove this item from your inventory?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // remove an item from the inventory
            // console.log(docId);
            this.firestore.collection('boxes').doc(this.boxId).collection(this.userId).doc(docId).delete()
              .then(function () {
                console.log('Document deleted!');
              }).catch(function (err) {
                console.log('Error removing document: ', err);
              });

            // close the sliding item and hide the option buttons
            slidingItem.close();
            // console.log('removed');
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }
  
  // Navigate to add-item page with userId and boxId passed 
  onAddNewItem() {
    console.log('clicked');
    this.router.navigate(['/app/tabs/space/add-item'], { state: { userId: this.userId, boxId: this.boxId } });
  }

  // Show gentle user alert
  async showToast(message: string, colour: string, closeButtonText: string) {
    this.toast = await this.toastController.create({
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: closeButtonText,
      animated: true,
      message: message,
      color: colour,
      duration: 3000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  async hideToast() {
    this.toast = this.toastController.dismiss();
  }


}
