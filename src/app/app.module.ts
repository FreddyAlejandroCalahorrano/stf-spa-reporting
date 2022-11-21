import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared.module';
import {routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ExternalAssetsModule,} from '@pichincha/angular-sdk/external-assets';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from 'src/environments/environment';
import {ExternalAssets} from "./config/external.assets";

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: !isIframe ? 'enabled' : 'disabled', // Don't perform initial navigation in iframes
    }),
    HttpModule.forRoot({api_url: environment.apiUrl}),
    ExternalAssetsModule.forRoot(ExternalAssets)
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
