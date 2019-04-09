import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { AclService } from "ng2-acl";
import { ROLES_ACL } from "src/app/app.roles";
import * as moment from "moment";
import * as _ from "lodash";
import { NotifyService } from "../notify/notify.service";
import { setRedirect, getObjectCookie, getDataUser, getCookie } from "src/app/app.utils";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private aclService: AclService,
    private notify: NotifyService
  ) {}

  /**
   *
   * @param username (string)
   * @param password (string)
   */
  public loginUser(username: string, password: string): any {
    const grant_type: string = environment.GRANT_TYPE;
    const client_id: number = environment.CLIENT_ID;
    const client_secret: string = environment.CLIENT_SECRET;

    return new Observable(observer => {
      const loginData = {
        username,
        password,
        grant_type,
        client_id,
        client_secret
      };

      this.http
        .post(`${environment.AUTH_URL}/oauth/token`, loginData)
        .subscribe(
          res => {
            const token: string = JSON.stringify({
              token: res,
              timeLogin: new Date().getTime()
            });
            this.createTokenData(token);
            this.getUserAuthenticated().subscribe(
              $user => {
                const user = JSON.stringify($user);
                this.createUserData(user);

                this.router.navigate([
                  `/${ROLES_ACL[this.getDataUser().role_id].path}`
                ]);
                this.notify.show("success", "Usuário logado com sucesso");
                observer.next(this.getDataUser());
              },
              (error: any) => {
                observer.error(error.error);
              }
            );
          },
          error => {
            observer.error(error.error);
          }
        );
    });
  }

  /**
   *
   */
  public getUserAuthenticated(): Observable<any> {
    return this.http.get(`${environment.AUTH_URL}/api/users/authenticated`);
  }

  /**
   *
   * @param user (string)
   */
  private createUserData(user: string): void {
    this.eraseCookie("auth_user_data");

    document.cookie = `auth_user_data=${user};Max-Age=21600`;

    const user_request = JSON.parse(user);
    const userRole = ROLES_ACL[user_request.role_id].role;

    this.aclService.attachRole(userRole);
    setRedirect(ROLES_ACL[user_request.role_id]);
  }

  /**
   *
   * @param token (string)
   */
  private createTokenData(token: string): void {
    this.eraseCookie("auth_token");

    const objToken: any = JSON.parse(token);
    const expires: number = _.isObject(objToken)
      ? objToken.token.expires_in
      : 21600;

    document.cookie = `auth_token=${token};Max-Age=${expires}`;
  }

  /**
   *
   */
  getToken(): any {
    const jsonData: any = getObjectCookie("auth_token");

    if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {
      this.eraseCookie("auth_token");
      this.router.navigate(["/login"]);
    } else {
      return jsonData.token.access_token;
    }
  }

  getDataUser(): any {
    const user = getDataUser();

    if (_.isEmpty(user) && !_.isObject(user)) {
      this.logout();
    } else {
      return user;
    }
  }

  public isLoggedIn(): boolean {
    moment.locale("pt-br");

    const tokenString: string = getCookie("auth_token") || "{}";
    const userString: string = getCookie("auth_user_data") || "{}";

    const token: any = JSON.parse(tokenString);
    const user: any = JSON.parse(userString);

    let result: boolean;

    try {
      if (
        token &&
        token.token &&
        token.token.access_token &&
        (user && user.id)
      ) {
        const timeExpire = moment(parseInt(token.timeLogin, 10)).add(
          parseInt(token.token.expires_in, 10),
          "seconds"
        );
        const isTokenExpired = timeExpire.isBefore(moment());

        result = token.token.access_token != null && !isTokenExpired;
      }
    } catch (error) {
      result = false;
    }

    return result;
  }

  /**
   *
   */
  logout(): void {
    this.eraseCookie("auth_token");
    this.eraseCookie("auth_user_data");
    this.router.navigate(["/login"]);
    this.aclService.flushRoles();
  }

  /**
   *
   */
  private eraseCookie(...name): void {
    name.forEach(e => {
      document.cookie = e + "=123;max-age=0;";
    });
  }
}
