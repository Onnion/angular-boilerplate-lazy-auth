import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AclResolver } from "./app.resolve";
import { AuthLayoutComponent } from "./modules/auth/layouts/auth.layout.component";
import { ClientLayoutComponent } from "./modules/client/layouts/client.layout.component";
import { InternLayoutComponent } from "./modules/intern/layouts/intern.layout.component";

const routes: Routes = [
  {
    path: "login",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/auth/auth.module#AuthModule"
      }
    ]
  },

  {
    path: "dashboard",
    component: InternLayoutComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver },
    children: [
      {
        path: "",
        loadChildren: "./modules/intern/intern.module#InternModule"
      }
    ]
  },

  {
    path: "cliente",
    component: ClientLayoutComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver },
    children: [
      {
        path: "",
        loadChildren: "./modules/client/client.module#ClientModule"
      }
    ]
  },

  { path: "**", redirectTo: "dashboard" },

  { path: "", redirectTo: "dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
