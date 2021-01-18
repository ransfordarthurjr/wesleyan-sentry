import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { AltarServersTypeInterface } from 'src/app/interfaces/db/altar-servers-type-interface';

type Response = {
    members_altar_servers_types: AltarServersTypeInterface[];
};

@Injectable({
    providedIn: 'root',
})
class AltarServersTypesQuery extends Query<Response> {
    document = gql`
        query {
            members_altar_servers_types {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class AltarServersTypeService {
    constructor(
        private readonly altarServersTypesQuery: AltarServersTypesQuery
    ) {}

    public getAltarServersTypes() {
        return this.altarServersTypesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
