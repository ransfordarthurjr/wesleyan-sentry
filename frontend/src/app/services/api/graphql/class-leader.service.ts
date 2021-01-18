import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ClassLeaderInterface } from 'src/app/interfaces/db/class-leader-interface';

type Response = {
    members_class_leaders: ClassLeaderInterface[];
};

@Injectable({
    providedIn: 'root',
})
class ClassLeadersQuery extends Query<Response> {
    document = gql`
        query {
            members_class_leaders {
                id
                class_name
                member_id_leader
                class_leaders {
                    member_id
                    firstname
                    lastname
                    othernames
                }
                member_id_asst_leader
                assistant_class_leaders {
                    member_id
                    firstname
                    lastname
                    othernames
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class ClassLeaderService {
    constructor(private readonly classLeadersQuery: ClassLeadersQuery) {}

    public getClassLeaders() {
        return this.classLeadersQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
