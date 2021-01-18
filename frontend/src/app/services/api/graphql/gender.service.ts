import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { GenderInterface } from 'src/app/interfaces/db/gender-interface';

type Response = {
    members_genders: GenderInterface[];
};

@Injectable({
    providedIn: 'root',
})
class GendersQuery extends Query<Response> {
    document = gql`
        query {
            members_genders {
                id
                name
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class GenderService {
    constructor(private readonly gendersQuery: GendersQuery) {}

    public getGenders() {
        return this.gendersQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
