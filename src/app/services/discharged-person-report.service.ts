import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {environment} from "@environments/environment";
import {DischargedPaginationPersonReport} from "@interfaces/paginationDischargedPersonReport";
import {Filters} from "@interfaces/filters";

@Injectable()
export class DischargedPersonReportService {

  private rootUrl = environment.apiUrlReport;

  constructor(private http: HttpService) {
  }

  /**
   * Get Discharged Person Report by Filters
   * @param pageNo
   * @param pageSize
   * @param filters
   */
  public getDischargedPersonSearchPaged(pageNo: number, pageSize: number, filters: Filters): Promise<DischargedPaginationPersonReport> {
    return this.http.post(`${this.rootUrl}personLeaveReport/searchPaged`, {
      pageNo: pageNo,
      pageSize: pageSize,
      ...filters
    })
  }

  /**
   *Get Discharged Person Report document in Excel
   * @param filters
   */

  public getDischargedReportPersonExcel( filters: Filters): any {
    return this.http.post(`${this.rootUrl}personLeaveReport/searchPagedExcel`, {
      ...filters
    })
  }


}
