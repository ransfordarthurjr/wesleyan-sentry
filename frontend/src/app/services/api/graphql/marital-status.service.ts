import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { MaritalStatusInterface } from 'src/app/interfaces/db/marital-status-interface';

type Response = {
    members_marital_statuses: MaritalStatusInterface[];
};

@Injectable({
    providedIn: 'root',
})
class MaritalStatusesQuery extends Query<Response> {
    document = gql`
        query {
            members_marital_statuses {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class MaritalStatusService {
    constructor(private readonly maritalStatusesQuery: MaritalStatusesQuery) {}

    public getMaritalStatuses() {
        return this.maritalStatusesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
