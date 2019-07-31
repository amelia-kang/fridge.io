import { Component } from '@angular/core';
import { UserInfo } from '../../interfaces/user-options';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  userInfo: UserInfo = { userId: '', email: '', firstName: '', lastName: '', country: '', boxId: '' };

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  onTab(nav: string) {
    this.router.navigate(['/app/tabs/', nav], { state: { userInfo: this.userInfo } });
  }


}
