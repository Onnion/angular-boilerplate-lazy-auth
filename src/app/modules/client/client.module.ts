import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ClientRoutes } from "./client.routing";
import { MaterialModule } from "../../mat.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingModule } from "../shared/loading/loading.module";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { ClientWrapperComponent, ClientComponent } from "./components";

@NgModule({
  declarations: [
    ClientWrapperComponent,
    ClientComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule,
    RouterModule.forChild(ClientRoutes),
    SweetAlert2Module.forRoot()
  ],
})
export class ClientModule {}
