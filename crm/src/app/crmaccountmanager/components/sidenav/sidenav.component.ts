import { Component, OnInit, NgZone } from '@angular/core';
import { Accountnode } from '../../models/accountnode';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  errorMessage: string;
  accountNodes: Accountnode[] = [];

  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  constructor(zone: NgZone, private crmService: CrmaccountserviceService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => (this.mediaMatcher = mql))
    );
  }

  ngOnInit() {
    this.crmService.getAccountNodes().subscribe(
      data => {
        this.accountNodes = data;
      },
      error => (this.errorMessage = <any>error)
    );
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
