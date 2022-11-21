import {TribuService} from './tribu.service';
import {from} from "rxjs";
import {Tribu} from "../types/tribu";
import {TestBed} from "@angular/core/testing";
import {HttpService} from "@pichincha/angular-sdk/http";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('TribuService', () => {
  let tribuService: TribuService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    TestBed.configureTestingModule({
      providers: [
        TribuService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    })
    tribuService = TestBed.inject(TribuService);
  })

  it('should be created', () => {
    expect(tribuService).toBeTruthy();
  });

  it('should return expected tribus', (done: DoneCallback) => {

    const expectedTribus: Tribu[] = [null, null]

    httpServiceMock.get
      .mockReturnValueOnce([expectedTribus])

    from(tribuService.getTribu())
      .subscribe(tribus => {
        // expected value
        expect(tribus).toEqual(expectedTribus)
        expect(tribus.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })


});
