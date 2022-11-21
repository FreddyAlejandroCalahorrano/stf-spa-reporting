import { PersonReport } from "./personReport";

export interface DischargedPaginationPersonReport{
  personLeaveReportTos: PersonReport[]
  totalPages: number
  totalElements: number
}
