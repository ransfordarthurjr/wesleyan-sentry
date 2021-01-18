import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ChurchGroupInterface } from 'src/app/interfaces/db/church-group-interface';

type Response = {
    members_church_groups: ChurchGroupInterface[];
};

@Injectable({
    providedIn: 'root',
})
class ChurchGroupsQuery extends Query<Response> {
    document = gql`
        query {
            members_church_groups {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class ChurchGroupService {
    constructor(private readonly churchGroupsQuery: ChurchGroupsQuery) {}

    public getChurchGroups() {
        return this.churchGroupsQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
