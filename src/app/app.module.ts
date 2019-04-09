import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { MaterialModule } from "./mat.module";
import { MAT_DATE_LOCALE } from "@angular/material";
import { NotifierModule } from "angular-notifier";
import { notifierDefaultOptions } from "./helpers/consts/consts.helpers";
import { TokenInterceptor } from "./helpers/interceptor/interceptor.helper";
import { RouterModule } from "@angular/router";
import { FormBuilderValidators } from "./validators";
import { AclService } from "ng2-acl";
import { HandlerErrorHelpers } from "./helpers/handler-error/handler-error.helper";
import { AclRedirection, AclResolver } from "./app.resolve";
import { SharedModule } from "./modules/shared/shared.module";
import { AuthLayoutComponent } from "./modules/auth/layouts/auth.layout.component";
import { InternLayoutComponent } from "./modules/intern/layouts/intern.layout.component";
import { ClientLayoutComponent } from "./modules/client/layouts/client.layout.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ],
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    InternLayoutComponent,
    ClientLayoutComponent
  ],
  providers: [
    FormBuilderValidators,
    AclService,
    AclResolver,
    AclRedirection,
    HandlerErrorHelpers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: "pt-br" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
