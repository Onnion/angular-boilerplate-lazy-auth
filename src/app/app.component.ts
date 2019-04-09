import { Component, OnInit } from "@angular/core";
import { routerTransition } from "./helpers/animations/animations.helper";
import { AclService } from "ng2-acl";
import { ROLES } from "./app.roles";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  constructor(private aclService: AclService) {}

  ngOnInit() {
    this.aclService.setAbilities(ROLES);
  }
}
