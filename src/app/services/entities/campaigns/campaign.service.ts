import {Injectable} from '@angular/core';
import {CrudServices} from '../../../helpers/crud/crud-services.helpers';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CampaignService extends CrudServices {
    protected http: HttpClient;
    protected entity: string;

    constructor(private httpClient: HttpClient) {
        super();
        this.entity = 'campaigns';
        this.http = httpClient;
    }

}
