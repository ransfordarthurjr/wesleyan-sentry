import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CountryInterface } from 'src/app/interfaces/db/country-interface';
import { OccupationIndustryInterface } from 'src/app/interfaces/db/occupation-industry-interface';
import { OccupationInterface } from 'src/app/interfaces/db/occupation-interface';
import { GenderInterface } from 'src/app/interfaces/db/gender-interface';
import { TitleInterface } from 'src/app/interfaces/db/title-interface';
import { MaritalStatusInterface } from 'src/app/interfaces/db/marital-status-interface';
import { OrganizationInterface } from 'src/app/interfaces/db/organization-interface';
import { AltarServersTypeInterface } from 'src/app/interfaces/db/altar-servers-type-interface';
import { ChurchGroupInterface } from 'src/app/interfaces/db/church-group-interface';
import { MembershipStatusInterface } from 'src/app/interfaces/db/membership-status-interface';
import { MemberInterface } from 'src/app/interfaces/db/member-interface';
import { ClassLeaderInterface } from 'src/app/interfaces/db/class-leader-interface';
import { ɵAnimationGroupPlayer } from '@angular/animations';

@Injectable({
    providedIn: 'root',
})
export class DbService {
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        //this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('timeout', `${DbService.TIMEOUT}`);
    }

    private headers: HttpHeaders;
    // 20 second timeout
    private static readonly TIMEOUT: number = 30000;
    private static readonly URL: string = environment.url.api.graphql;

    // use above during testing
    private baseUrl: string = 'http://localhost:8000/api';
    private url = {
        titles: '/db/titles',
        genders: '/db/genders',
        maritalStatuses: '/db/marital-statuses',
        countries: '/db/countries',
        occupationIndustries: '/db/occupation-industries',
        occupations: '/db/occupations',
        organizations: '/db/organizations',
        churchGroups: '/db/churchgroups',
        altarServers: '/db/altarservers',
        classLeaders: '/db/class-leaders',
        membershipStatuses: '/db/membership-statuses',
        members: '/db/members',
    };

    public dbTitles(): Observable<TitleInterface[]> {
        return this.http.get<TitleInterface[]>(
            `${this.baseUrl}${this.url.titles}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbGenders(): Observable<GenderInterface[]> {
        return this.http.get<GenderInterface[]>(
            `${this.baseUrl}${this.url.genders}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbMaritalStatuses(): Observable<MaritalStatusInterface[]> {
        return this.http.get<MaritalStatusInterface[]>(
            `${this.baseUrl}${this.url.maritalStatuses}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbCountries(): Observable<CountryInterface[]> {
        const requestBody = JSON.stringify({
            query: `
                query {
                    countries {
                        country_id
                        country
                        continent
                        region
                        iso
                    }
                }`,
        });

        return (
            this.http
                .get<CountryInterface[]>(
                    `${this.baseUrl}${this.url.countries}`,
                    {
                        headers: this.headers,
                    }
                )
                /*.post<CountryInterface[]>(
                    `http://localhost:4000/`,
                    requestBody,
                    {
                        headers: this.headers,
                    }
                )*/
                .pipe(
                    map((countries) => {
                        from(countries).subscribe((country) =>
                            console.log(country)
                        );
                        return countries;
                    }),
                    //timeout(99999),
                    catchError((err) => {
                        console.log('error', err);
                        return of([]);
                    })
                    //retry(2)
                )
        );
    }

    public dbOccupationIndustries(): Observable<OccupationIndustryInterface[]> {
        return this.http.get<OccupationIndustryInterface[]>(
            `${this.baseUrl}${this.url.occupationIndustries}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbOccupationsByIndustry(
        industryId: number
    ): Observable<OccupationInterface[]> {
        return this.http.get<OccupationInterface[]>(
            `${this.baseUrl}${this.url.occupations}?industryid=${industryId}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbOccupationById(id: number): Observable<OccupationInterface> {
        return this.http.get<OccupationInterface>(
            `${this.baseUrl}${this.url.occupations}?id=${id}`,
            {
                headers: this.headers,
            }
        );
    }

    public dbOrganizations(): Observable<OrganizationInterface[]> {
        return this.http.get<OrganizationInterface[]>(
            `${this.baseUrl}${this.url.organizations}`,
            {
                headers: this.headers,
            }
        );
    }
    public dbChurchGroups(): Observable<ChurchGroupInterface[]> {
        return this.http.get<ChurchGroupInterface[]>(
            `${this.baseUrl}${this.url.churchGroups}`,
            {
                headers: this.headers,
            }
        );
    }
    public dbAltarServers(): Observable<AltarServersTypeInterface[]> {
        return this.http.get<AltarServersTypeInterface[]>(
            `${this.baseUrl}${this.url.altarServers}`,
            {
                headers: this.headers,
            }
        );
    }
    public dbClassLeaders(): Observable<ClassLeaderInterface[]> {
        return this.http.get<ClassLeaderInterface[]>(
            `${this.baseUrl}${this.url.classLeaders}`,
            {
                headers: this.headers,
            }
        );
    }
    public dbMembershipStatuses(): Observable<MembershipStatusInterface[]> {
        return this.http.get<MembershipStatusInterface[]>(
            `${this.baseUrl}${this.url.membershipStatuses}`,
            {
                headers: this.headers,
            }
        );
    }
    public dbMembers(): Observable<MemberInterface[]> {
        return this.http.get<MemberInterface[]>(
            `${this.baseUrl}${this.url.members}`,
            {
                headers: this.headers,
            }
        );
    }
}
