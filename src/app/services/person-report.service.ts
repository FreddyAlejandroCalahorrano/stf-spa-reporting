import {PaginationPersonReport} from '../types/paginationPersonReport';
import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {environment} from "@environments/environment";
import {Filters} from "@interfaces/filters";

@Injectable()
export class PersonReportService {

  private rootUrl = environment.apiUrlReport;

  constructor(private http: HttpService) {
  }

  /**
   * Get Person Report by Filters
   * @param pageNo
   * @param pageSize
   * @param filters
   */
  public getPersonSearchPaged(pageNo: number, pageSize: number, filters: Filters): Promise<PaginationPersonReport> {
    return this.http.post(`${this.rootUrl}personReport/searchPaged`, {
      pageNo: pageNo,
      pageSize: pageSize,
      ...filters
    })
  }

  /**
   *Get Person Report document in Excel
   * @param filters
   */

  public getReportPersonExcel( filters: Filters): any {
    return this.http.post(`${this.rootUrl}personReport/searchPagedExcel`, {
      ...filters
    })
  }

}
