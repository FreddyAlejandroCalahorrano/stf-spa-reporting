import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, merge, Observable} from "rxjs";
import {PaginationPersonReport} from "@interfaces/paginationPersonReport";
import {ProfileService} from "@services/profile.service";
import {ProvidersService} from "@services/providers.service";
import {debounceTime, switchMap, tap} from "rxjs/operators";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";
import {_base64ToArrayBuffer} from "../../common/utils/base64ToArray";
import {SeniorityService} from "@services/seniority.service";
import {UnassignedPersonReportService} from "@services/unassigned-person-report.service";
import {Filters} from "@interfaces/filters";

@Component({
  selector: 'app-unassigned-person-report',
  templateUrl: './unassigned-person-report.component.html',
  styleUrls: ['./unassigned-person-report.component.scss']
})
export class UnassignedPersonReportComponent implements OnInit {
  showSpinner: boolean = true

  profiles$: Promise<any[]>
  providers$: Promise<any[]>
  seniority$: Promise<any[]>

  // Filter
  filters: FormGroup

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 30

  //MessageBar
  showMessageBarUnassignedPerson: boolean = false

  dataReport$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 30})
  personReport$: Observable<PaginationPersonReport>

  columns: any[]

  constructor(
    private fb: FormBuilder,
    private _profileService: ProfileService,
    private _providerService: ProvidersService,
    private _unassignedpersonReport: UnassignedPersonReportService,
    private _seniorityService: SeniorityService,
  ) {
    this.providers$ = this._providerService.getProviders()
    this.profiles$ = this._profileService.getProfiles()
    this.seniority$ = this._seniorityService.getSeniority()
    this.setConfigFilters()

    this.personReport$ = this.dataReport$
      .pipe(
        debounceTime(500),
        switchMap(({size, page}) =>
          this._unassignedpersonReport.getUnassignedPersonSearchPaged(page, size, this.getFiltersValue())
        ),
        tap(() => this.showPagination = true),
      )
  }

  setConfigTableUnassignedPerson() {
    this.columns = [
      {caption: 'Nombre de la persona'},
      {caption: 'Correo'},
      {caption: 'Teléfono'},
      {caption: 'Perfil'},
      {caption: 'Proveedor'},
      {caption: 'Tipo'},
      {caption: 'Seniority'},
    ]
  }

  //#region Getters

  get profile() {
    return this.filters.get('profile') as FormControl
  }

  get filter(){
  return this.filters.get('filter') as FormControl
  }

  get provider() {
    return this.filters.get('provider') as FormGroup
  }

  get seniority() {
    return this.filters.get('seniority') as FormGroup
  }

  //#endregion

  onClickSearchUnassignedPerson(){
    this._unassignedpersonReport.getUnassignedReportPersonExcel(this.getFiltersValue())
      .then((dataUnassignedPerson: any) => {
        const arrBufferUnassignedPerson = _base64ToArrayBuffer(dataUnassignedPerson.fileReportTo.fileBase64);
        const blob = new Blob([arrBufferUnassignedPerson], {type: dataUnassignedPerson.fileReportTo.mimeType});
        const linkUnassignedPerson = document.createElement('a');
        linkUnassignedPerson.href = window.URL.createObjectURL(blob);
        linkUnassignedPerson.download =  dataUnassignedPerson.fileReportTo.fileName;
        linkUnassignedPerson.click();
      })
      .catch (() => {
        this.showMessageBarUnassignedPerson = true
      })
  }

  onClickMessageUnassignedPerson(event: any) {
    console.log(event)
    this.showMessageBarUnassignedPerson = false
  }

  setConfigFilters() {
    this.filters = this.fb.group({
      profile: [[]],
      provider: [[]],
      seniority: [[]],
      filter: []
    })
    this.registerEvents();
  }

  registerEvents() {
    const profile$ = this.profile.valueChanges
    const provider$ =  this.provider.valueChanges
    const seniority$ = this.seniority.valueChanges
    const filterInput$ = this.filter.valueChanges
    merge(profile$, provider$, seniority$, filterInput$)
      .subscribe(() => {
        this.search()
      })
  }

  ngOnInit(): void {
    this.setConfigTableUnassignedPerson()
  }

  search() {
    this.dataReport$.next({size: 5, page: 1})
    this.currentPage = 1
  }

  getFiltersValue() {
    const {
      profile,
      provider,
      seniority,
      filter
    } = this.filters.getRawValue()

    let filters: Filters = {
      idProfiles: profile?.length > 0 ? profile : null,
      idProviders: provider?.length > 0 ? provider : null,
      idSenioritys: seniority?.length > 0 ? seniority : null,
      ...({filter})
    }
    return {...filters}
  }

  setupPagination(pagination: PaginationEvt) {
    this.dataReport$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }



}
