import {Injectable} from "@angular/core";
import {PaginationPersonReport} from "@interfaces/paginationPersonReport";
import {environment} from "@environments/environment";
import {HttpService} from "@pichincha/angular-sdk/http";
import {Filters} from "@interfaces/filters";


@Injectable()
export class UnassignedPersonReportService {

  private rootUrl = environment.apiUrlReport;

  constructor(private http: HttpService) {
  }

  /**
   * Get Unassigned Person Report by Filters
   * @param pageNo
   * @param pageSize
   * @param filters
   */
  public getUnassignedPersonSearchPaged(pageNo: number, pageSize: number, filters: Filters): Promise<PaginationPersonReport> {
    return this.http.post(`${this.rootUrl}personReport/unassignedPerson`, {
      pageNo: pageNo,
      pageSize: pageSize,
      ...filters
    })
  }

  /**
   *Get Unassigned Person Report document in Excel
   * @param filters
   */

  public getUnassignedReportPersonExcel( filters: Filters): any {
    return this.http.post(`${this.rootUrl}personReport/unassignedPersonExcel`, {
      ...filters
    })
  }
}
