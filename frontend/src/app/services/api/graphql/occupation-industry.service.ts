import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { OccupationIndustryInterface } from 'src/app/interfaces/db/occupation-industry-interface';

type Response = {
    members_occupations_industries: OccupationIndustryInterface[];
};

@Injectable({
    providedIn: 'root',
})
class OccupationIndustriesQuery extends Query<Response> {
    document = gql`
        query {
            members_occupations_industries {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class OccupationIndustryService {
    constructor(
        private readonly occupationIndustriesQuery: OccupationIndustriesQuery
    ) {}

    public getOccupationIndustries() {
        return this.occupationIndustriesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
