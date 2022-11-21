import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {BehaviorSubject, merge, Observable} from "rxjs";
import {TribuService} from "@services/tribu.service";
import {CelulaService} from "@services/celula.service";
import {ProfileService} from "@services/profile.service";
import {ProvidersService} from "@services/providers.service";
import {debounceTime, switchMap, tap} from "rxjs/operators";
import {validateDate} from "../../common/utils/validate-date";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";
import {getDateTransform} from "../../common/utils/fn";
import {_base64ToArrayBuffer} from "../../common/utils/base64ToArray";
import {DischargedPersonReportService} from "@services/discharged-person-report.service";
import {DischargedPaginationPersonReport} from "@interfaces/paginationDischargedPersonReport";
import {Filters} from "@interfaces/filters";

@Component({
  selector: 'app-discharged-person-report',
  templateUrl: './discharged-person-report.component.html',
  styleUrls: ['./discharged-person-report.component.scss']
})
export class DischargedPersonReportComponent implements OnInit {
  showSpinner: boolean = true

  celulas$: Promise<any[]>;
  tribus$: Promise<any[]>
  profiles$: Promise<any[]>
  providers$: Promise<any[]>

  // Filter
  filtersDischargedPerson: FormGroup

  //MessageBar
  showMessageBarDischargedPerson: boolean = false

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 30

  dataReport$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 30})
  dischargedPersonReport$: Observable<DischargedPaginationPersonReport>

  columns: any[]

  constructor(
    private fb: FormBuilder,
    private _tribuService: TribuService,
    private _celulaService: CelulaService,
    private _profileService: ProfileService,
    private _providerService: ProvidersService,
    private _dischargedPersonReportService: DischargedPersonReportService) {

    this.tribus$ = this._tribuService.getTribu()
    this.profiles$ = this._profileService.getProfiles()
    this.providers$ = this._providerService.getProviders()
    this.setConfigFilters()

    this.dischargedPersonReport$ = this.dataReport$
      .pipe(
        debounceTime(500),
        switchMap(({size, page}) =>
          this._dischargedPersonReportService.getDischargedPersonSearchPaged(page, size, this.getFiltersValue())
        ),
        tap(() => this.showPagination = true),
      )

  }



  //#region Getters
  get tribuDP() {
    return this.filtersDischargedPerson.get('tribuDP') as FormControl
  }

  get celulaDP() {
    return this.filtersDischargedPerson.get('celulaDP') as FormControl
  }

  get profileDP() {
    return this.filtersDischargedPerson.get('profileDP') as FormControl
  }

  get filter() {
    return this.filtersDischargedPerson.get('filter') as FormControl
  }

  get asignmentEndDateDP() {
    return this.filtersDischargedPerson.get('asignmentEndDateDP') as FormGroup
  }

  get providerDP() {
    return this.filtersDischargedPerson.get('providerDP') as FormGroup
  }

  //#endregion

  setConfigFilters() {
    this.filtersDischargedPerson = this.fb.group({
      tribuDP: [[]],
      celulaDP: [[]],
      profileDP: [[]],
      providerDP: [[]],
      asignmentEndDateDP: this.fb.group({
        to: [null,],
        from: [null,],
      }, {
        validators: this.validateDatesDischargedPerson()
      }),
      asignmentStartDateDP: this.fb.group({
        to: [null,],
        from: [null,],
      }, {
        validators: this.validateDatesDischargedPerson()
      }),
      filter: []
    })

    this.registerEvents();
  }

  registerEvents() {

    const tribu$ = this.tribuDP.valueChanges.pipe(
      tap((idTribus) => {
        this.celulaDP.setValue([], {emitEvent: false})
        this.celulas$ = this._celulaService.getCelulaByArrayTribu(idTribus)
      })
    )

    const celula$ = this.celulaDP.valueChanges
    const profile$ = this.profileDP.valueChanges
    const provider$ =  this.providerDP.valueChanges
    const filterInput$ = this.filter.valueChanges
    const asignmentEndDate$ = this.asignmentEndDateDP.get('from').valueChanges
    merge(tribu$, celula$, profile$, provider$, asignmentEndDate$, filterInput$)
      .subscribe(() => {
        this.search()
      })
  }

  ngOnInit(): void {
    this.setConfigTableDischargedPerson()
  }

  search() {
    this.dataReport$.next({size: 5, page: 1})
    this.currentPage = 1
  }

  setConfigTableDischargedPerson() {
    this.columns = [
      {caption: 'Nombre de la persona'},
      {caption: 'Correo'},
      {caption: 'Teléfono'},
      {caption: 'Perfil'},
      {caption: 'Proveedor'},
      {caption: 'Tipo'},
      {caption: 'Fecha de salida'},
      {caption: 'Tribu que salió'},
      {caption: 'Célula que salió'},
      {caption: 'Motivo de salida'},
    ]
  }

  setupPaginationDischargedPerson(pagination: PaginationEvt) {
    this.dataReport$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }
  /*calendarSelectEndDate(event: any){
    this.asignmentStartDate.get('from').patchValue(
      getDateTransform(event.detail[0].dateFrom)
    )
    this.asignmentStartDate.get('to').patchValue(
      getDateTransform(event.detail[0].dateUntil)
    )
  }*/

  onClickSearchDischargedPerson(){
    this._dischargedPersonReportService.getDischargedReportPersonExcel(this.getFiltersValue())
      .then((data: any) => {
        const arrBufferDischargedPerson = _base64ToArrayBuffer(data.fileReportTo.fileBase64);
        const blobDischargedPerson = new Blob([arrBufferDischargedPerson], {type: data.fileReportTo.mimeType});
        const linkDischargedPerson = document.createElement('a');
        linkDischargedPerson.href = window.URL.createObjectURL(blobDischargedPerson);
        linkDischargedPerson.download =  data.fileReportTo.fileName;
        linkDischargedPerson.click();
      })
      .catch (() => {
        this.showMessageBarDischargedPerson = true
      })
  }

  calendarSelectEndDate(event: any){
    this.asignmentEndDateDP.get('from').patchValue(
      getDateTransform(event.detail[0].dateFrom)
    )
    this.asignmentEndDateDP.get('to').patchValue(
      getDateTransform(event.detail[0].dateUntil)
    )
  }


  validateDatesDischargedPerson(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const {from, to} = formGroup.value
      if (!to && !from) { //ALL NULL
        return null
      }

      if (!to || !from) { // ANY NULL
        return {validateDates: 'Las fechas deben tener un rango'}
      }

      if (from > to) {
        return {validateDates: 'El rango de las fechas es inválido'}
      }

      return null
    }
  }

  getFiltersValue() {
    const {
      tribuDP,
      celulaDP,
      profileDP,
      providerDP,
      asignmentEndDateDP,
      filter
    } = this.filtersDischargedPerson.getRawValue()

    let filters: Filters = {
      idTribus: tribuDP?.length > 0 ? tribuDP : null,
      idCelulas: celulaDP?.length > 0 ? celulaDP : null,
      idProfiles: profileDP?.length > 0 ? profileDP : null,
      idProviders: providerDP?.length > 0 ? providerDP : null,
      assigned: 0,
      assignmentRange: {
        from: null,
        to: null,
      },
      tentativeEndRange: {
        from: null,
        to: null,
      },
      ...({filter})
    }

    /* const {to, from} = asignmentStartDate
     if (validateDate(to) && validateDate(from))
       filters.assignmentRange = {
         from: from,
         to: to,
       }*/
    // const {toTentative, fromTentative} = tentativeAsignmentEndDate
    if (validateDate(asignmentEndDateDP.to)
      && validateDate(asignmentEndDateDP.from))
      filters.tentativeEndRange = {
        from: asignmentEndDateDP.from,
        to: asignmentEndDateDP.to,
      }
    return {...filters}
  }

  onClickMessageDischargedPerson(event: any){
    this.showMessageBarDischargedPerson = false
  }
}
