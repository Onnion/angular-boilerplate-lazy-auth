import { Routes } from "@angular/router";
import { InternComponent, InternWrapperComponent } from "./components";

export const InternRoutes: Routes = [
  {
    path: "",
    component: InternWrapperComponent,
    children: [
      {
        path: "",
        component: InternComponent
      }
    ]
  }
];
