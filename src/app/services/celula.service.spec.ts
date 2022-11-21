import {CelulaService} from './celula.service';
import Mocked = jest.Mocked;

describe('CelulaService', () => {
  let celulaService: CelulaService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    celulaService = new CelulaService(httpServiceMock);
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(celulaService).toBeTruthy();
  });

  it('should return array with celula by idTribu', (done) => {
    httpServiceMock.get.mockImplementation(() => Promise.resolve([]))
    celulaService.getCelulaByTribu(9)
      .then(response => {
        done()
        expect(
          Array.isArray(response)
        ).toBeTruthy()
      })
  });

  it('should return array with celula by idTribu array', (done) => {
    httpServiceMock.post.mockImplementation(() => Promise.resolve([]))
    celulaService.getCelulaByArrayTribu([9, 1, 5])
      .then(response => {
        done()
        expect(
          Array.isArray(response)
        ).toBeTruthy()
      })
  })

});
