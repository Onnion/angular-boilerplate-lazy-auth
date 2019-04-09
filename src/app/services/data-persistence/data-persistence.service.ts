import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/clients/clients.model';
import * as uuid from 'uuid/v1';

@Injectable({
  providedIn: 'root'
})
export class DataPersistenceService {


  constructor() { }


  /**
   *
   * @param entity {string}
   * @param data {any}
   */
  public create(entity: string, data: Client): void {

    const $entity = localStorage.getItem(entity);
    let $$entity = [];

    if ($entity) {
      $$entity = [...JSON.parse($entity), {...data, id: uuid()}];
    } else {
      $$entity = [{...data, id: uuid()}];
    }

    localStorage.setItem(entity, JSON.stringify($$entity));
  }


  public read(entity: string): Client[] {
    return JSON.parse(localStorage.getItem(entity));

  }


  public get(entity: string, id: string = null): Client {
    let result = JSON.parse(localStorage.getItem(entity));

    if (id) {
      result = result.filter((client: Client) => {
        return client.id === id;
      });
    }

    return result[0];

  }


  public update(entity: string, data: Client): void {
    const clients = this.read(entity);
    const index = clients.findIndex((client) => client.id === data.id);

    clients[index] = data;

    localStorage.setItem(entity, JSON.stringify(clients));


  }


  public delete(entity: string, data: Client): void {
    const clients = this.read(entity);
    const $clients = clients.filter((client) => client.id !== data.id);

    localStorage.setItem(entity, JSON.stringify($clients));

  }

}
