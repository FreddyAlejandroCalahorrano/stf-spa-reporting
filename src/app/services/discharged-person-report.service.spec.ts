import {DischargedPersonReportService} from "@services/discharged-person-report.service"
import {from} from "rxjs";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;
let dischargedPersonReportService: DischargedPersonReportService;
let httpServiceMock: Mocked<any>

beforeEach(() => {
  httpServiceMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn()
  }
  dischargedPersonReportService = new DischargedPersonReportService(httpServiceMock);
})
it('should be created', () => {
  expect(DischargedPersonReportService).toBeTruthy();
});

it('should return discharged people search', (done: DoneCallback) => {
  const sendData : any = {
    "pageNo": 1,
    "pageSize": 30,
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
    "totalPages": 2,
    "totalElements": 11,
    "fileReportTo": {
      "fileName": null,
      "fileBase64": null,
      "mimeType": null
    },
    "personLeaveReportTos": [
      {
        "id": 8,
        "longName": "TOPO JUAN",
        "email": "jtopo@pichincha.com",
        "phoneNumber": "",
        "role": "Staff",
        "seniorityName": "Trainee",
        "profile": "Dev Front",
        "originProvider": "Externo",
        "provider": "TCS",
        "product": "CASH33",
        "celula": "CASH33",
        "poCelula": null,
        "assignmentStartDate": "2022-06-07",
        "assignmentEndDate": "2022-06-07",
        "tentativeAssignmentEndDate": "2022-06-30",
        "allocationPercentage": 30.0,
        "idTribu": 2,
        "leaderTribu": null,
        "tribu": "BUSINESS CAPABILITIES",
        "leaderTechnicalTribu": "Exposito Ester",
        "ultimatix": null,
        "chapter": "Chapter QA",
        "country": "Ecuador",
        "skills": "ANGULAR,APIGEEE",
        "observation": "nada",
        "reasonExit": "Reasignación"
      },
      {
        "id": 1,
        "longName": "CAJAMANRCA ANDRESHINOS",
        "email": "acajamarca@hotmail.com",
        "phoneNumber": null,
        "role": "Staff",
        "seniorityName": "Senior",
        "profile": "Dev Front",
        "originProvider": "Externo",
        "provider": "TCS",
        "product": "CDV",
        "celula": "CDV",
        "poCelula": null,
        "assignmentStartDate": "2021-11-11",
        "assignmentEndDate": "2022-05-11",
        "tentativeAssignmentEndDate": "2022-10-10",
        "allocationPercentage": 75.0,
        "idTribu": 2,
        "leaderTribu": null,
        "tribu": "BUSINESS CAPABILITIES",
        "leaderTechnicalTribu": "Exposito Ester",
        "ultimatix": "2070049",
        "chapter": "Chapter QA",
        "country": "Ecuador",
        "skills": "ANGULAR,SKILL2,BANCS,.Net Framework,REACT,VUE JS,APIGEEE,.NET CORE",
        "observation": "observacion",
        "reasonExit": null
      },
    ]
  }

  httpServiceMock.post.mockReturnValueOnce([expectPagination]);

  from(dischargedPersonReportService.getDischargedPersonSearchPaged(sendData.pageNo, sendData.pageSize, sendData.filters))
    .subscribe((providers) => {
      expect(providers).toEqual(expectPagination)
      done()
    })
});

it('should return the excel file in base64', (done: DoneCallback) => {
  const sendData: any = {
    "filters": {
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

  const expectDataExel : any = {
    "totalPages": 1,
    "totalElements": 11,
    "fileReportTo": {
      "fileName": "Staff Desarrollo.xlsx",
      "fileBase64": "UEsDBBQACAgIAMqA3FQAAAAAAAAAAAAAAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbLVTy27CMBD8lcjXKjb0UFUVgUMfxxap9ANce5NY+CWvofD3XQc4lFKJCnHyY2ZnZlf2ZLZxtlpDQhN8w8Z8xCrwKmjju4Z9LF7qe1Zhll5LGzw0zAc2m04W2whYUanHhvU5xwchUPXgJPIQwRPShuRkpmPqRJRqKTsQt6PRnVDBZ/C5zkWDTSdP0MqVzdXj7r5IN0zGaI2SmVKJtddHovVekCewAwd7E/GGCKx63pDKrhtCkYkzHI4Ly5nq3mguyWj4V7TQtkaBDmrlqIRDUdWg65iImLKBfc65TPlVOhIURJ4TioKk+SXeh7GokOAsw0K8yPGoW4wJpMYeIDvLsZcJ9HtO9Jh+h9hY8YNwxRx5a09MoQQYkGtOgFbupPGn3L9CWn6GsLyef3EY9n/ZDyCKYRkfcojhe0+/AVBLBwh6lMpxOwEAABwEAABQSwMEFAAICAgAyoDcVAAAAAAAAAAAAAAAAAsAAABfcmVscy8ucmVsc62SwWrDMAyGX8Xo3jjtYIxRt5cy6G2M7gE0W0lMYsvY2pa9/cwuW0sKG+woJH3/B9J2P4dJvVEunqOBddOComjZ+dgbeD49rO5AFcHocOJIBiLDfrd9ogmlbpTBp6IqIhYDg0i617rYgQKWhhPF2uk4B5Ra5l4ntCP2pDdte6vzTwacM9XRGchHtwZ1wtyTGJgn/c55fGEem4qtjY9EvwnlrvOWDmxfA0VZyL6YAL3ssvl2cWwfM9dNTOm/ZWgWio7cKtUEyuKpXDO6WTCynOlvStePogMJOhT8ol4I6bMf2H0CUEsHCKeMer3jAAAASQIAAFBLAwQUAAgICADKgNxUAAAAAAAAAAAAAAAAEAAAAGRvY1Byb3BzL2FwcC54bWxNjsEKwjAQRO9+Rci93epBRNKUggie7EE/IKTbNtBsQrJKP9+c1OPMMI+nus2v4o0pu0Ct3NeNFEg2jI7mVj4f1+okO71TQwoREzvMohwot3JhjmeAbBf0JtdlprJMIXnDJaYZwjQ5i5dgXx6J4dA0R8CNkUYcq/gFSq36GFdnDRcH3UdTkGK43xT89wp+DvoDUEsHCOF8d9iRAAAAtwAAAFBLAwQUAAgICADKgNxUAAAAAAAAAAAAAAAAEQAAAGRvY1Byb3BzL2NvcmUueG1sbZBdS8MwFIb/Ssh9mzSDMkPbIcpAUBxYUbwLybEtNh8k0c5/b1pnBeddkvc5DydvtTvqEX2AD4M1NS5yihEYadVguho/tvtsi1GIwigxWgM1Nhbvmko6Lq2Hg7cOfBwgoKQxgUtX4z5GxwkJsgctQp4Ik8JX67WI6eo74oR8Ex0QRmlJNEShRBRkFmZuNeKTUslV6d79uAiUJDCCBhMDKfKC/LIRvA7/DizJSh7DsFLTNOXTZuHSRgV5vrt9WJbPBjN/XQJuqpOaSw8igkJJwOOnS438JE+bq+t2jxtGGctombFtywpOS15cvFTkz/ws/D5b31ymQnpAh/ubmVufK3JWc/MFUEsHCIIXofAFAQAAsAEAAFBLAwQUAAgICADKgNxUAAAAAAAAAAAAAAAAFAAAAHhsL3NoYXJlZFN0cmluZ3MueG1shVdNc+I4EL3vr1CxtTcTbPMVtggTYTvBDMGMDdmao7BFUGIkr2Qz2fk3e8xhTvsT+GMrJlC747aZFJfoSUL9+vXrZvjhdZeiPZWKCX7TsK7MBqI8FgnjTzeN1fKued34MPplqFSOYlHw/KZhd+0GKjj7s6DO+4pldRtI38PVTWOb59nvrZaKt3RH1JXIKNfIRsgdyfW/8qmlMklJoraU5ru0ZZtmr7UjjDdGQ8VGw3y0lGxdDFv5aNg6Lrwvzg7fEipRQtEleHl4izmLRfWmRYDiw1tapKSMzMVuLenx9poNCymSIs5F/cGUoEyzKDg8Sw7f1HFLSBVLNLkMbHGElBRcvqTp4W0jOAAWVG5YWvHGPaWJkGXgjsZbcnyAzqmkSiByfG1dpEKxdUrR5nxIkZQl5AI30QtLU1VeDdaKyj2JtawoAH87XkcUe+J6w+EfXsZXac60XtgrIGpLspyCCCPKmZAs/6sMPIic7QWKvsdQBseryJ97UYQcvMBjf+YvfS8qbWr9cMJ7zTQ9uUCeqniFg6NJuw2yGGjdTVd4Xga8uCAV2XrORSZuMxZvGdcpuIrFrrzFpXt0JwXPwXc55fePbNO2m2avafbrkLZZRvD8fjXDoYEX/r3neWWYE8hl27wC15yShT5h8E6pC57S8nJIL2jCcR8h4VP8gOehgxGeu6EXTfx5ABggMXkmOyJjcrsVubaatIpTzYbVtI6fSp4sU3/qeIo++rOZbYzx3ImMqznNdXbIjn4R8sUIPewsjceVh6bRmVC9x1siJwgBteK/qilD/S5k2Db7ptkZVJdDeVULSuuJ61p+IZKC+/HmiXCm8sPfAKJJQWQibp/qyDMH1/1et9O2AXlHqY5J/FItvm7T6lUjg6YFBOstZ8pwA+ejF6LoD82786vh0pgdWxeKNG9aa4H7YNwzUBidCvIsu93p9vrXdbL9XmGUJ2V8WlSx6ykivxKE0zWVsE+Q9+VLDPYHlt21unYtUyDNZ8SGoVWE6z0sdIWAUnTwDE+CMMTzAN2Fnut+BmpyVthFi3DljcHp7NQXUSYLugauoC0Vh26AJt5n1weC49r9JDizfdZ/F6XW67e7plVLlF0jKY0AScFubZkVTqalYgFjD/1HL9TOM/OmR/cJYM6pZFqT5LKZn2U4AN86JjwGrXPZrPYnq8LH7QoZRJ90Nt+TaQMK69ZxiFfT4KSBk9eCcHmih4tbIknxLOok3h90BtCvFoC7c2+qeMqPnlty258a7Cso55Dyomom81TGuNAlPSsYyEJKT+jl3J6F165uKscAYdI6VT5/ugcgcz3TFVUqhpcsQ3+8OucQ8HocXn7aX2taK938pLnCCeA9on5F/OPFgxFFGDRSn+cFp4aecsUmE4znhr/eIZfkJBNfqDT8TA+1z2SvJ1uy29HUGAPH6VUNKRPfmejoMJqtfBBgqnN/q3T3o1+r4iKvKiEqUf/jv6V/KY3+BVBLBwg0X401VAQAAFYNAABQSwMEFAAICAgAyoDcVAAAAAAAAAAAAAAAAA0AAAB4bC9zdHlsZXMueG1svVRNT8QgEL37Kwh37e76ETVtN9FkjWc18coW2hKBaYA1W3+9A7S71bjx4+ClDI/3HsMwNF9utSKvwjoJpqDzkxklwlTApWkK+vS4Or6ky/Iod75X4qEVwhMUGFfQ1vvuOstc1QrN3Al0wuBKDVYzj1PbZK6zgnEXRFpli9nsItNMGlrmZqNX2jtSwcb4gs5oVuY1mD2yoAkoc/dGXpnCzEJqSKtAgSXScLEVvKCXATNMi8S6ZUqurYx+TEvVJ3gRgJjpwNPSgA1glnZJ3y99vkngKmDrRPF2IyamcXBoLpXaneyMJqDMO+a9sGaFEzLEj30nCmrADDaR9w2bM/tyZ1n/c0X0R1Zz+/Eo81imbKL7qaMDJfkvLeOA1VmD5dh+Y33O6QiVuRK1R7mVTRtGD12oNXgPGgMuWQOGqbDBqBhHpJLYsngpLbbcV5zg/pn0V11M8b/NUiUObjEEWOJKKPUQWM/1rs5zrPO2Jukl3vPwCEno1zHEyxnCZJMmwX/qlrwntos/2ZJtvfM/pJ7v1adT9dleTVjXqf4mLg2vMUGh8T4CEJLdvdfhEBjt/3PlO1BLBwjquEgXsQEAABsFAABQSwMEFAAICAgAyoDcVAAAAAAAAAAAAAAAAA8AAAB4bC93b3JrYm9vay54bWyNkMFOwzAQRO98hbV3aqdFCKI4vaBKvSFRuG/tTWM1tqO1afl8nFQBjpzWo3k7O3Kz/fKDuBAnF4OGaqVAUDDRunDS8H7Y3T/Btr1rrpHPxxjPouAhaehzHmspk+nJY1rFkUJxusgec5F8kmlkQpt6ouwHuVbqUXp0AW4JNf8nI3adM/QSzaenkG8hTAPmUjb1bkzQ/jR7ZWExU/WsHjR0OCQC2TaT8+Homn7BSQo02V3ogEcNauLkH3DuvEwR0JOGt+ld/oZrZzXw3m5AzP6+yGpOWNbkcqj9BlBLBwhsNWXX2gAAAF0BAABQSwMEFAAICAgAyoDcVAAAAAAAAAAAAAAAABoAAAB4bC9fcmVscy93b3JrYm9vay54bWwucmVsc62RTWvDMAxA/4rRfXHSwRijbi9j0OvW/QBjK3FoIhlL++i/n7vD1kAHO/QkjPB7D7Tefs6TecciI5ODrmnBIAWOIw0OXvdPN/dgRD1FPzGhA2LYbtbPOHmtPySNWUxFkDhIqvnBWgkJZy8NZ6S66bnMXuuzDDb7cPAD2lXb3tlyzoAl0+yig7KLHZi9LwOqA0m+YHzRUsukqeC6Omb8j5b7fgz4yOFtRtILdruAg70cszqL0eOE16/4pv6lv/3Vf3A5SELUU3kd3bVLfgSnGLu49uYLUEsHCIYDO5HUAAAAMwIAAFBLAwQUAAgICADKgNxUAAAAAAAAAAAAAAAAGAAAAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbI2ZW1PiWBSF3+dXpPI+QkhCoAvoahVBUG7ReY8SlWohVkhr//wJ6KTPWiesmjfjt/e57PNxcjm977+3r857mu832a7vemdN10l3j9l6s3vuu/d3V3933O+Dv3ofWf5z/5KmhVPG7/Z996Uo3r41GvvHl3Sb7M+yt3RXkqcs3yZFeZk/N/ZveZqsj0nb10ar2Ww3tslm5w5668023R06dPL0qe/+8L7dey23Megdg//ZpB9742/n0PdDlv08XFyv+245xCJ5iNPX9LFIy+si/5UeshtW+tVxOIvcWadPya/XYpV9jNPN80tRzjQsp/pfl5dJkQx6efbh5CUpR/h4+OOHV3bUd/eus//87/ug2Wu8lx09fkWc2xEeRlzYES2MuLQjfIwY2hEBRlzZESFGjOyINkaM7YgII67tiA5GTOyILkZMaypGRb2pCaGq3taEUFlnNSFU13lNCBV2URNClV3WhFBpVzUhVNu4JoSKe1cTQtW9r7HtT3UbpeCV5a3K8tZXzjGaCn0OkEp8AZCKe6kyhwBZZgVHAGkpxgBpEa4BUvknarRTgLQqNwBpPW5N6JPnM4BU+DlAGtACIBV+CZDKt1LzjCGTansHkGp7DzCqN86vjPOVcb4yzlfGqcyhCX1awysFRwBpgce+Ms6EAa3+RI126ivjfGUc9Em1nQGkPucAqbYLgCTVEiB5swJIFYp9ZRxk0g/2/kT5wLigMi5QxgXKuEAZpzKHgTJOwZEJA4JjgLT61yYM2TiAVIQpQJrKTaCMg0yq0AwgeTMHSKu/CJRxkMl3W4B8nwXId1iAfG89sdhgXFgZFyrjQmVcqIxTmcNQGafgyIRt8mYcKuMgk+Y5Ach7XKiMC5Vx0CwbB5CNU+VbhMo4aJb3ONVsHCrjQmXciWbBuHZlXNscIf0mzgHSb+KirYxrK+OgWTYOIM1tZMKIjQNIUl0DpAFNANJUpjAVvqu2lXHQLKkxA0hqzFX5FpBJS7YESEu2AkhTidvKuLYy7sRowbioMi5SxkXKuEgZFynjImVcpIwzYcTPcdAnP8eZsMN3VYB8VwXIexxAKsKtCa27KmTyHqfKtzChtcdBs7zHqWbjSBkXKeNONAvGdSrjOsq4jjKuo4zrKONM2KE+rwBSnyOA/BxnQuuuCpkEJybsko5TgKTjDcyT9zgoHxsHzfKbA0B+cwDIxnWUcWpVYhNabw4A+V0VBhTWG9etjOsq47rKuK4yrquM6yrjuso4E3b5Ax/0yXscZPLXETXaqQmt5zgYLe9x0Cf9PmYAydW5GtBCwaUJvSb9elYqNYaJ8iYHkDe57v9QzmtWznlNJR1Stg6opR1S9g6oJR5SNg9b5g9zSNk9pCyfHPMUKT/UIeUdD6jX5K8lgNnPOVDrCx01zRYSpmVaySnH2DPvfUh58zvVMqpoHIF4MNCAXfTEQC+AsqmXMndIHYcso8QjwtZRhyd1xGTLRzXuKSVbQnpSSJNaT33UNO+JiPlUZQHYevSjZI+FVHOOcdjWsYUnhTzRMgr557TCa2kh5YEFUFtIeWRBHVtCSjxCzIdVY8DW0yAl+ywkzMoS0qTWEyFQ6waNLVs+AuXXEFnNBU3J0tHE1suvbDoGatsI1Do/O9Hyp40N47D4LXlOb5P8ebPbOw9ZUWTbvts8i0LXecqyIs0PV77rvKTJurp4TZ+KY5Tr5J+n0Me/i+ztK/dwiF2dtA/+BVBLBwibXOO6CgUAAJwfAABQSwECFAAUAAgICADKgNxUepTKcTsBAAAcBAAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQIUABQACAgIAMqA3FSnjHq94wAAAEkCAAALAAAAAAAAAAAAAAAAAHwBAABfcmVscy8ucmVsc1BLAQIUABQACAgIAMqA3FThfHfYkQAAALcAAAAQAAAAAAAAAAAAAAAAAJgCAABkb2NQcm9wcy9hcHAueG1sUEsBAhQAFAAICAgAyoDcVIIXofAFAQAAsAEAABEAAAAAAAAAAAAAAAAAZwMAAGRvY1Byb3BzL2NvcmUueG1sUEsBAhQAFAAICAgAyoDcVDRfjTVUBAAAVg0AABQAAAAAAAAAAAAAAAAAqwQAAHhsL3NoYXJlZFN0cmluZ3MueG1sUEsBAhQAFAAICAgAyoDcVOq4SBexAQAAGwUAAA0AAAAAAAAAAAAAAAAAQQkAAHhsL3N0eWxlcy54bWxQSwECFAAUAAgICADKgNxUbDVl19oAAABdAQAADwAAAAAAAAAAAAAAAAAtCwAAeGwvd29ya2Jvb2sueG1sUEsBAhQAFAAICAgAyoDcVIYDO5HUAAAAMwIAABoAAAAAAAAAAAAAAAAARAwAAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzUEsBAhQAFAAICAgAyoDcVJtc47oKBQAAnB8AABgAAAAAAAAAAAAAAAAAYA0AAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbFBLBQYAAAAACQAJAD8CAACwEgAAAAA=",
      "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    "personLeaveReportTos": null
  }

  httpServiceMock.post.mockReturnValueOnce([expectDataExel]);

  from(dischargedPersonReportService.getDischargedReportPersonExcel(sendData.filters))
    .subscribe((providers) => {
      expect(providers).toEqual(expectDataExel)
      done()
    })
})
