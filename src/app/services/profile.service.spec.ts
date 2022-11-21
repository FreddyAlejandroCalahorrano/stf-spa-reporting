import {ProfileService} from './profile.service';
import {from} from "rxjs";
import {Profile} from "../types/profile";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('ProfileService', () => {
  let profilesService: ProfileService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    profilesService = new ProfileService(httpServiceMock);
  })

  it('should be created', () => {
    expect(profilesService).toBeTruthy();
  });

  it('should return expected profiles', (done: DoneCallback) => {

    const expectedProfiles: Profile[] = [
      {"id": 1, "nameProfile": "Dev Front"},
      {"id": 2, "nameProfile": "QA"},
      {"id": 3, "nameProfile": "Dev Back"},
      {"id": 4, "nameProfile": "Devops"},
      {"id": 5, "nameProfile": "Bancs"},
      {"id": 6, "nameProfile": "BI"}
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedProfiles]);

    from(profilesService.getProfiles())
      .subscribe((profiles) => {
        // expected value
        expect(profiles).toEqual(expectedProfiles)

        // chapters length is expected to be greater than 0
        expect(profiles.length).toBeGreaterThan(0)

        profiles.forEach((profile) => {
          // Name Profile is expected not to be null
          expect(profile.nameProfile).not.toBeNull()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })


});
