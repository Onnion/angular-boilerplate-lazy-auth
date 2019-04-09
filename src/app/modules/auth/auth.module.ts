import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthRoutes } from "./auth.routing";
import { MaterialModule } from "../../mat.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingModule } from "../shared/loading/loading.module";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { LoginWrapperComponent, LoginComponent } from "./components";
import { FormBuilderValidators } from "src/app/helpers/validators";

@NgModule({
  declarations: [
    LoginWrapperComponent,
    LoginComponent
  ],
  providers: [
    FormBuilderValidators
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes),
    SweetAlert2Module.forRoot()
  ],
})
export class AuthModule {}
