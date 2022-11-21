import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Profile} from 'src/app/types/profile';
import {environment} from "@environments/environment";

@Injectable()

export class ProfileService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get the profiles assignable to a person
   * @returns Promise<Profile[]>
   * @method Get
   */
  public getProfiles(): Promise<Profile[]> {
    return this.http.get(this.rootUrl + 'profile')
  }

}
