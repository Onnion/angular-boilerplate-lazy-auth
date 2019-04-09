import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../../services/auth/auth.service';
import {NotifyService} from '../../services/notify/notify.service';

@Injectable()
export class HandlerErrorHelpers {
    private auth: AuthService;


    constructor(private authService: AuthService, private notify: NotifyService) {
        this.auth = this.authService;
    }


    private handleFailed(error: HttpErrorResponse) {
        this.notify.show('error', 'Teste sua conexão com a internet');
    }


    private handle400(error: HttpErrorResponse) {
        this.notify.show('error', error.error.data.message);
    }


    private handle401(error: HttpErrorResponse) {
        const msg = this.auth.isLoggedIn() ? 'Faça o login novamente' : 'Usuário ou senha errados';
        this.notify.show('error', msg);
        this.auth.logout();
    }


    private handle404(error: HttpErrorResponse) {
        this.notify.show('error', 'Ocorreu um erro, favor entre contato com o administrador do sistema');
    }


    private handle422(error: HttpErrorResponse) {
        _.forEach(error.error.message, (message, key) => {
            this.notify.show('warning', message[0]);

        });
    }


    private handle429(error: HttpErrorResponse) {
        this.notify.show('error', 'Aguarde 1 minuto e recarregue a página');
    }


    private handle500(error: HttpErrorResponse) {
        this.notify.show('error', 'Serviço indisponível');

    }


    public handle(error: HttpErrorResponse) {
        switch (error.status) {
            case 0:
                this.handleFailed(error);
                return;

            case 400:
                this.handle400(error);
                return;

            case 401:
                this.handle401(error);
                return;

            case 404:
                this.handle404(error);
                return;

            case 422:
                this.handle422(error);
                return;

            case 429:
                this.handle429(error);
                return;

            case 500:
                this.handle500(error);
                return;
        }
    }


}
