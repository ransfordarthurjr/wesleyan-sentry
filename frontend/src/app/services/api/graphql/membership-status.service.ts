import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { MembershipStatusInterface } from 'src/app/interfaces/db/membership-status-interface';

type Response = {
    members_membership_statuses: MembershipStatusInterface[];
};

@Injectable({
    providedIn: 'root',
})
class MembershipStatusesQuery extends Query<Response> {
    document = gql`
        query {
            members_membership_statuses {
                id
                name
                description
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class MembershipStatusService {
    constructor(
        private readonly membershipStatusesQuery: MembershipStatusesQuery
    ) {}

    public getMembershipStatuses() {
        return this.membershipStatusesQuery.fetch(
            {},
            {
                //pollInterval: 15 * 1000,
            }
        );
    }
}
