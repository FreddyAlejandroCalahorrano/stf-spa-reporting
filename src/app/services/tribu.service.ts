import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Tribu} from '../types/tribu';
import {environment} from "@environments/environment";

@Injectable()

export class TribuService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get all tribus created
   * @returns Promise<Tribu[]>
   * @method Get
   */

  public getTribu(): Promise<Tribu[]> {
    return this.http.get(this.rootUrl + 'tribu/')
   /* return of([
      {
        "id": 1,
        "tribuName": "EMPRESA",
        "tribuCreationDate": "2020-04-26",
        "tribuFinishDate": null,
        "description": "EMPRESA",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "tribuCreationDate": "2021-11-16",
        "tribuFinishDate": null,
        "description": "BUSINESS CAPABILITIES xd",
        "user": "frcalaho",
        "state": "ACTIVO"
      },
      {
        "id": 3,
        "tribuName": "TRIBU PRUEBA",
        "tribuCreationDate": "2022-05-05",
        "tribuFinishDate": null,
        "description": "Tribu prueba",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 4,
        "tribuName": "TRIBU PRUEBA 2",
        "tribuCreationDate": "2022-05-05",
        "tribuFinishDate": null,
        "description": "prueba 2",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 5,
        "tribuName": "TEST TRIBU 2",
        "tribuCreationDate": "2022-05-19",
        "tribuFinishDate": null,
        "description": "TEST TRIBU 2 TEST TRIBU 2",
        "user": "jariastu",
        "state": "ACTIVO"
      },
      {
        "id": 6,
        "tribuName": "OTRA TRIBU",
        "tribuCreationDate": "2022-05-26",
        "tribuFinishDate": null,
        "description": "OTRA TRIBU",
        "user": "luischi",
        "state": "ACTIVO"
      },
    ]).toPromise()*/
  }


}
