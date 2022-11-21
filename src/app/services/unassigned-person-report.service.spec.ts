import {UnassignedPersonReportService} from "@services/unassigned-person-report.service";
import {from} from "rxjs";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

let unassignedPersonReportService: UnassignedPersonReportService;
let httpServiceMock: Mocked<any>

beforeEach(() => {
  httpServiceMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn()
  }
  unassignedPersonReportService = new UnassignedPersonReportService(httpServiceMock);
})

it('should be created', () => {
  expect(UnassignedPersonReportService).toBeTruthy();
});

it('should return people search', (done: DoneCallback) => {
  const sendData : any = {
    "pageNo": 1,
    "pageSize": 30,
    "filters" : {
      "idProfiles": null,
      "idProviders": null,
      "idSenioritys": null,
      "filter": null
    }

  }

  const expectPagination : any = {
    "totalPages":1,
    "totalElements":14,
    "fileReportTo":{
      "fileName":null,
      "fileBase64":null,
      "mimeType":null
    },
    "personReportTos":[
      {"id":1,
        "longName":"TOPO JUAN",
        "email":"jtopo@pichincha.com",
        "phoneNumber":"",
        "role":"Staff",
        "profile":"Dev Front",
        "seniorityName":"Trainee",
        "provider":"TCS",
        "originProvider":"Externo",
        "celula":"CASH33",
        "product":"CASH33",
        "poCelula":null,
        "assignmentStartDate":"2022-06-07",
        "tentativeAssignmentEndDate":"2022-06-30",
        "allocationPercentage":30.0,
        "idTribu":2,
        "tribu":"BUSINESS CAPABILITIES",
        "leaderTribu":null,
        "leaderTechnicalTribu":"Exposito Ester",
        "country":"Ecuador",
        "skills":"ANGULAR,APIGEEE",
        "observation":"nada",
        "ultimatix":null,
        "chapter":"Chapter QA"
      }
    ]
  }

  httpServiceMock.post.mockReturnValueOnce([expectPagination]);

  from(unassignedPersonReportService.getUnassignedPersonSearchPaged(sendData.pageNo, sendData.pageSize, sendData.filters))
    .subscribe((providers) => {
      expect(providers).toEqual(expectPagination)
      done()
    })
});

it('should return the excel file in base64', (done: DoneCallback) => {
  const sendData : any = {
    "filters" : {
      "idTribus": null,
      "idCelulas": null,
      "idProfiles": null,
      "idProviders": null,
      "assigned": 0,
      "assignmentRange": {
        "from": null,
        "to": null
      },
      "tentativeEndRange": {
        "from": null,
        "to": null
      },
      "filter": null
    }
  }

  const expectPagination : any = {
    "totalPages":1,
    "totalElements":14,
    "fileReportTo":{
      "fileName":"Staff Desarrollo.xlsx",
      "fileBase64":"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","mimeType":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    "personReportTos":null}

  httpServiceMock.post.mockReturnValueOnce([expectPagination]);

  from(unassignedPersonReportService.getUnassignedReportPersonExcel(sendData.filters))
    .subscribe((providers) => {
      expect(providers).toEqual(expectPagination)
      done()
    })
});
