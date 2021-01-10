import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selecteItem: string = 'Users';
  branchName: string = 'users';
  SbranchName: string = 'user';
  items: any[] = [];

  constructor(private search: SearchService, private notification: NzNotificationService) { }

  ngOnInit() {
  }

  getSelectedItem(val, branchName, SbranchName, value) {
    this.selecteItem = val;
    this.branchName = branchName;
    this.SbranchName = SbranchName;
    this.getSearchResult(value)
  }

  getSearchResult(val) {
    let value = val
    if (value) {
      if (value.length >= 3) {
        this.search.getSearchResult(this.SbranchName, this.branchName, value).subscribe(res => {
          if (res.status === 403) {
            this.notification.warning('Sorry', 'An Error occured while fetching search result , please try again ..')
          } else {
            this.items = res.items
            clearTimeout();
            if (this.items.length === 0) {
              this.notification.warning('Sorry', 'No result fetch your search, please try again ..!')
            }
          }
        })
      } else {
        this.items.length = 0;
      }
    }
  }
}
