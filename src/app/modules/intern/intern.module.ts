import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { InternRoutes } from "./inter.routing";
import { MaterialModule } from "../../mat.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingModule } from "../shared/loading/loading.module";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { InternWrapperComponent, InternComponent } from "./components";

@NgModule({
  declarations: [
    InternWrapperComponent,
    InternComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule,
    RouterModule.forChild(InternRoutes),
    SweetAlert2Module.forRoot()
  ],
})
export class InternModule {}
