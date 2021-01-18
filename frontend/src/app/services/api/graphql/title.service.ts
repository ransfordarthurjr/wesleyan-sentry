import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { TitleInterface } from 'src/app/interfaces/db/title-interface';

type Response = {
    members_titles: TitleInterface[];
};

@Injectable({
    providedIn: 'root',
})
class TitlesQuery extends Query<Response> {
    document = gql`
        query {
            members_titles {
                id
                title
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    constructor(private readonly titlesQuery: TitlesQuery) {}

    public getTitles() {
        return this.titlesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
