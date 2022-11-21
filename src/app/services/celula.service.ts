import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {environment} from "@environments/environment";

@Injectable()

export class CelulaService {
  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get List Celula by IdTribu
   * @param idTribu IdTribu
   */
  public getCelulaByTribu(idTribu: number) {
    return this.http.get(this.rootUrl + 'celula/celulasByTribu', {
      idTribu
    })
    /*return of([
      {
        "id": 3,
        "celulaCreationDate": "2021-04-26",
        "celulaFinishDate": null,
        "celulaNameSquad": "CDV",
        "celulaNameProduct": "CDV",
        "description": "CDV CADENA DE VALOR",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 7,
        "celulaCreationDate": "2022-05-05",
        "celulaFinishDate": null,
        "celulaNameSquad": "SQUAD3",
        "celulaNameProduct": "PRODUCTO3",
        "description": null,
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 2,
        "celulaCreationDate": "2021-11-09",
        "celulaFinishDate": null,
        "celulaNameSquad": "CASH TRANSFERENCIAS",
        "celulaNameProduct": "CASH TRANSFERENCIAS",
        "description": "CASH TRANSFERENCIAS",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 8,
        "celulaCreationDate": "2022-04-26",
        "celulaFinishDate": "2022-04-27",
        "celulaNameSquad": "CASH33",
        "celulaNameProduct": "CASH33",
        "description": "CASH NEGOCIOS33",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]).toPromise()*/
  }

  /**
   * Get List Celula by Array IdTribu
   * @param idsTribu IdsTribu
   */
  public getCelulaByArrayTribu(idsTribu: number[]) {
    return this.http.post(this.rootUrl + 'celula/celulasByidTribus', idsTribu)
  }


}
