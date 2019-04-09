import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AclService } from "ng2-acl";
import { Injectable } from "@angular/core";
import { getRedirect } from "./app.utils";
import { ROLES } from "./app.roles";

@Injectable()
export class AclRedirection {
  constructor(private router: Router) {}

  public redirectTo(type: string) {
    const redirect = getRedirect() ? getRedirect() : "login";

    if (type === "Unauthorized") {
      this.router.navigate([redirect]);
    }
  }
}

@Injectable()
export class AclResolver implements Resolve<any> {
  constructor(
    private aclService: AclService,
    private aclRedirection: AclRedirection
  ) {}

  private match(state, path: any): boolean {
    let match = false;
    if (typeof path === "object") {
      match = path.test(state.url);
    } else {
      match = state.url === path;
    }

    return match;
  }

  private matchUrl(state): any {
    let testRoute;

    if (this.match(state, /^\/dashboard?[\D]+$/)) {
      if (
        this.aclService.can(ROLES.root[0]) ||
        this.aclService.can(ROLES.administrative[0])
      ) {
        testRoute = of(true);
      }
    } else if (this.match(state, /^\/cliente?[\D]+$/)) {
      if (this.aclService.can(ROLES.client[0])) {
        testRoute = of(true);
      }
    }

    return testRoute;
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (this.matchUrl(state)) {
      return of(true);
    } else {
      this.aclRedirection.redirectTo("Unauthorized");
    }
  }
}
