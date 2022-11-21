import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService} from "../../common/modal/dialog.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BaseComponent implements OnInit, OnChanges {

  isIframe = false


  constructor(private router: Router,
              private elementRef: ElementRef,
              private cdf: ChangeDetectorRef,
              private dialogService: DialogService,) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.dialogService.setContainer(this.elementRef.nativeElement.shadowRoot)
  }

  ngOnChanges() {
    this.cdf.detectChanges()
  }

  verifyIfWelcome() {
    return this.router.url.includes('welcome');
  }

}
