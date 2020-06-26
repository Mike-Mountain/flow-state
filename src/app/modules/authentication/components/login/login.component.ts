import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../store/session.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {createLoginForm} from "../../store/session.model";
import {NgmLoadingService} from "ng-mountain";
import {LayoutService} from "../../../layout/store/layout.service";
import {ContentTabsService} from "../../../shared/services/content-tabs/content-tabs.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private sessionService: SessionService,
              private formBuilder: FormBuilder,
              private loadingService: NgmLoadingService,
              private layoutService: LayoutService,
              private tabsService: ContentTabsService) {
  }

  ngOnInit(): void {
    this.loginForm = createLoginForm(this.formBuilder);
  }

  public login(): void {
    this.loadingService.setIsLoading(true);
    this.sessionService.login(this.loginForm.value).subscribe(() => {
      this.layoutService.updateBottomContentRow('0');
      this.tabsService.setActiveTabBottom();
      this.loadingService.setIsLoading(false);
    }, error => {
      console.log(error);
      this.loadingService.setIsLoading(false);
    });
  }
}
