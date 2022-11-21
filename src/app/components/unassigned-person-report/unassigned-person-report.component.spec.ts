import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnassignedPersonReportComponent} from './unassigned-person-report.component';
import {HttpModule} from "@pichincha/angular-sdk/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomCommonModule} from "../../common/components/common.module";
import {ProvidersService} from "@services/providers.service";
import {CelulaService} from "@services/celula.service";
import {TribuService} from "@services/tribu.service";
import {ProfileService} from "@services/profile.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {UnassignedPersonReportService} from "@services/unassigned-person-report.service";
import {SeniorityService} from "@services/seniority.service";

describe('UnassignedPersonReportComponent', () => {
  let component: UnassignedPersonReportComponent;
  let fixture: ComponentFixture<UnassignedPersonReportComponent>;

  let mockCelulaService = {
    getCelulaByArrayTribu: jest.fn(),
  }
  let mockUnassignedPersonReportService = {
    getUnassignedPersonSearchPaged: jest.fn(),
    getUnassignedReportPersonExcel: jest.fn()
  }
  let mockTribuService = {
    getTribu: jest.fn().mockResolvedValue([]),
  }
  let mockProfileService = {
    getProfiles: jest.fn().mockResolvedValue([]),
  }

  let mockSeniorityService = {
    getSeniority: jest.fn().mockResolvedValue([]),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({api_url: ""}),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      declarations: [ UnassignedPersonReportComponent ],
      providers: [
        ProvidersService,
        {provide: CelulaService, useValue: mockCelulaService},
        {provide: UnassignedPersonReportService, useValue: mockUnassignedPersonReportService},
        {provide: TribuService, useValue: mockTribuService},
        {provide: ProfileService, useValue: mockProfileService},
        {provide: SeniorityService, useValue: mockSeniorityService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedPersonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check initial values form group filters', () => {
    expect(component.profile?.value).toEqual([]);
    expect(component.provider?.value).toEqual([]);
    expect(component.seniority?.value).toEqual([]);
    expect(component.filter?.value).toEqual(null);
  });



  it('should called method "next" from [dataReport$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataReport$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })

  it('should call the method "getReportPersonExcel"', () => {
    const data = {
      "fileReportTo": {
        "fileName": "Staff Desarrollo.xlsx",
        "fileBase64": "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",
        "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
    }
    const spy = mockUnassignedPersonReportService.getUnassignedReportPersonExcel
      .mockImplementation(() => Promise.resolve([data]))
    component.onClickSearchUnassignedPerson()
    expect(spy).toBeCalled()

  });

  it('should change the state of the variable "showMessageBarUnassignedPerson" to false', () => {
    const event = {
      "isTrusted": false
    }
    component.onClickMessageUnassignedPerson(event)
    expect(component.showMessageBarUnassignedPerson).toBeFalsy()
  });


});

