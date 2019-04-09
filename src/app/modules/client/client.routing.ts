import { Routes } from "@angular/router";
import { ClientWrapperComponent, ClientComponent } from "./components";

export const ClientRoutes: Routes = [
  {
    path: "",
    component: ClientWrapperComponent,
    children: [
      {
        path: "",
        component: ClientComponent
      }
    ]
  }
];
