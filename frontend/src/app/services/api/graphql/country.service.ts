import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { CountryInterface } from 'src/app/interfaces/db/country-interface';

type Response = {
    countries: CountryInterface[];
};

@Injectable({
    providedIn: 'root',
})
class CountriesQuery extends Query<Response> {
    document = gql`
        query {
            countries {
                country_id
                country
                continent
                region
                iso
                iso3
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    constructor(private readonly countriesQuery: CountriesQuery) {}

    public getCountries() {
        return this.countriesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
