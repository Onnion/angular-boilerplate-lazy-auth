import { Routes } from "@angular/router";
import { LoginWrapperComponent, LoginComponent } from "./components/";

export const AuthRoutes: Routes = [
  {
    path: "",
    component: LoginWrapperComponent,
    children: [
      {
        path: "",
        component: LoginComponent
      }
    ]
  }
];
