import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "./navbar/navbar.module";
import { FooterModule } from "./footer/footer.module";
import { LoadingModule } from "./loading/loading.module";

@NgModule({
  imports: [CommonModule, NavbarModule, FooterModule, LoadingModule]
})
export class SharedModule {}
