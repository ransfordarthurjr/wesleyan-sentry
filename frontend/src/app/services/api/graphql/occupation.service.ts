import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { OccupationInterface } from 'src/app/interfaces/db/occupation-interface';

type Response = {
    members_occupation_by_id: OccupationInterface;
    members_occupations_by_industry: OccupationInterface[];
};

@Injectable({
    providedIn: 'root',
})
class OccupationByIdQuery extends Query<Response> {
    document = gql`
        query($id: Int!) {
            members_occupation_by_id(id: $id) {
                id
                name
                industry_id
                members_occupations_industries {
                    id
                    name
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
class OccupationsByIndustryIdQuery extends Query<Response> {
    document = gql`
        query($industry_id: Int!) {
            members_occupations_by_industry(industry_id: $industry_id) {
                id
                name
                industry_id
                members_occupations_industries {
                    id
                    name
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class OccupationService {
    constructor(
        private readonly occupationByIdQuery: OccupationByIdQuery,
        private readonly occupationsByIndustryIdQuery: OccupationsByIndustryIdQuery
    ) {}

    public getOccupationById(id: number) {
        return this.occupationByIdQuery.fetch(
            {
                id: id,
            },
            {
                //pollInterval: 15 * 1000,
            }
        );
    }

    public getOccupationsByIndustryId(industryId: number) {
        return this.occupationsByIndustryIdQuery.fetch(
            {
                industry_id: industryId,
            },
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
