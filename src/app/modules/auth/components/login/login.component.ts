import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { FormBuilderValidators } from "src/app/helpers/validators";
import { ROLES_ACL } from "src/app/app.roles";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public btn_title: string;
  public form: FormGroup;
  public status = { loading: false };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private customValidators: FormBuilderValidators
  ) {}

  private controlStateLogin(state: string): void {
    if (state === "loading") {
      this.status.loading = true;
      this.btn_title = "Entrando";
    } else {
      this.status.loading = false;
      this.btn_title = "Entrar";
    }
  }

  public submit() {
    if (!this.status.loading && this.form.valid) {
      this.controlStateLogin("loading");
      const data = this.form.value;
      this.authService.loginUser(data.email, data.password).subscribe(
        res => {},
        error => {
          this.controlStateLogin("error");
        }
      );
    }
  }

  private initFormControls(): void {
    this.form = this.fb.group({
      email: [
        "danyllo.chupetinha@gmail.com",
        [Validators.required, this.customValidators.emailFormat]
      ],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([
        `/${ROLES_ACL[this.authService.getDataUser().role_id].path}`
      ]);
    }
    this.initFormControls();
    this.btn_title = "Entrar";
  }
}
