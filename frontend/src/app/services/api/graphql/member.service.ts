import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { MemberInterface } from 'src/app/interfaces/db/member-interface';

export interface Response {
    members: MemberInterface[];
    members_by_name: MemberInterface[];
}

@Injectable({
    providedIn: 'root',
})
class MembersQuery extends Query<Response> {
    document = gql`
        query {
            members {
                member_id
                firstname
                lastname
                othernames
                email
                mobile
                mobile_2
                dateofbirth
                baptised
                confirmed
                gender_id
                title_id
                membership_status_id
                marital_status_id
                country_id
                occupation_id
                countries {
                    country_id
                    country
                    continent
                    region
                    iso
                    iso3
                }
                members_genders {
                    name
                    id
                }
                members_marital_statuses {
                    id
                    name
                }
                members_membership_statuses {
                    id
                    name
                    description
                }
                members_occupations {
                    id
                    name
                    industry_id
                    members_occupations_industries {
                        id
                        name
                    }
                }
                members_titles {
                    id
                    title
                }
                #classes member belongs to
                #ideally one
                members_classes {
                    id
                    member_id
                    class_id
                }
                #will show entries if member is a class leader
                class_leaders {
                    id
                    class_name
                    member_id_leader
                    member_id_asst_leader
                }
                #will show entries if member is an assistant class leader
                assistant_class_leaders {
                    id
                    class_name
                    member_id_leader
                    member_id_asst_leader
                }
                members_organizations_associations {
                    id
                    member_id
                    organization_id
                    members_organizations {
                        id
                        name
                    }
                }
                members_church_groups_associations {
                    id
                    member_id
                    church_group_id
                    members_church_groups {
                        id
                        name
                    }
                }
                members_altar_servers_types_associations {
                    id
                    member_id
                    altar_servers_type_id
                    members_altar_servers_types {
                        id
                        name
                    }
                }
            }
        }
    `;
}
@Injectable({
    providedIn: 'root',
})
class MembersByNameQuery extends Query<Response> {
    document = gql`
        query($name: String!) {
            members_by_name(name: $name) {
                member_id
                firstname
                lastname
                othernames
                email
                mobile
                mobile_2
                dateofbirth
                baptised
                confirmed
                gender_id
                title_id
                membership_status_id
                marital_status_id
                country_id
                occupation_id
                countries {
                    country_id
                    country
                    continent
                    region
                    iso
                    iso3
                }
                members_genders {
                    name
                    id
                }
                members_marital_statuses {
                    id
                    name
                }
                members_membership_statuses {
                    id
                    name
                    description
                }
                members_occupations {
                    id
                    name
                    industry_id
                    members_occupations_industries {
                        id
                        name
                    }
                }
                members_titles {
                    id
                    title
                }
                #classes member belongs to
                #ideally one
                members_classes {
                    id
                    member_id
                    class_id
                }
                #will show entries if member is a class leader
                class_leaders {
                    id
                    class_name
                    member_id_leader
                    member_id_asst_leader
                }
                #will show entries if member is an assistant class leader
                assistant_class_leaders {
                    id
                    class_name
                    member_id_leader
                    member_id_asst_leader
                }
                members_organizations_associations {
                    id
                    member_id
                    organization_id
                    members_organizations {
                        id
                        name
                    }
                }
                members_church_groups_associations {
                    id
                    member_id
                    church_group_id
                    members_church_groups {
                        id
                        name
                    }
                }
                members_altar_servers_types_associations {
                    id
                    member_id
                    altar_servers_type_id
                    members_altar_servers_types {
                        id
                        name
                    }
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    constructor(
        private readonly membersQuery: MembersQuery,
        private readonly membersByNameQuery: MembersByNameQuery
    ) {}

    public getMemebers() {
        return this.membersQuery.watch(
            {},
            {
                pollInterval: 15 * 1000,
            }
        );
    }

    public getMembersByName(name: string) {
        return this.membersByNameQuery.fetch({ name: name }, {});
    }
}
