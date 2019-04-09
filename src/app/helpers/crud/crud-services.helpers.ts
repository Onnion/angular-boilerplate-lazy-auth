import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export class CrudServices {
    protected http: HttpClient;
    protected entity: string;

    public constructor() { }


    protected createOptionsUrl(options: any) {
        let url = '?';

        _.forEach(options, (value, key) => {
            url += `${key === 'pageSize' ? 'limit' : key}=${value}&`;
        });

        return url;
    }


    /**
     *
     * @param data (any)
     */
    public store(data): Observable<any> {
        return this.http.post(`${environment.AUTH_URL}/api/${this.entity}`, data);

    }


    /**
     *
     * @param id (number)
     */
    public get(id: any = false): Observable<any> {
        return this.http.get(`${environment.AUTH_URL}/api/${this.entity}${id ? `/${id}` : ''}`);
    }


    /**
     *
     * @param id (number)
     * @param status (number)
     */
    public delete(id: number): Observable<any> {
        return this.http.delete(`${environment.AUTH_URL}/api/${this.entity}/${id}`);
    }


    /**
     *
     * @param options (any)
     */
    public getData(options: any): Observable<any> {
        const optionsUrl = this.createOptionsUrl(options);
        return this.http.get(`${environment.AUTH_URL}/api/${this.entity}${optionsUrl}`);
    }



    /**
     *
     * @param _data (any)
     */
    public update(_data: any): Observable<any> {
        return this.http.put(`${environment.AUTH_URL}/api/${this.entity}/${_data.id}`, _data);
    }

}
