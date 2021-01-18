import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { OrganizationInterface } from 'src/app/interfaces/db/organization-interface';

type Response = {
    members_organizations: OrganizationInterface[];
};

@Injectable({
    providedIn: 'root',
})
class OrganizationsQuery extends Query<Response> {
    document = gql`
        query {
            members_organizations {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(private readonly organizationsQuery: OrganizationsQuery) {}

    public getOrganizations() {
        return this.organizationsQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
