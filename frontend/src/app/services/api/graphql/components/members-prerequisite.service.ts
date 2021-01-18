import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { AltarServersTypeInterface } from 'src/app/interfaces/db/altar-servers-type-interface';
import { ChurchGroupInterface } from 'src/app/interfaces/db/church-group-interface';
import { ClassLeaderInterface } from 'src/app/interfaces/db/class-leader-interface';
import { CountryInterface } from 'src/app/interfaces/db/country-interface';
import { GenderInterface } from 'src/app/interfaces/db/gender-interface';
import { MaritalStatusInterface } from 'src/app/interfaces/db/marital-status-interface';
import { MembershipStatusInterface } from 'src/app/interfaces/db/membership-status-interface';
import { OccupationIndustryInterface } from 'src/app/interfaces/db/occupation-industry-interface';
import { OccupationInterface } from 'src/app/interfaces/db/occupation-interface';
import { OrganizationInterface } from 'src/app/interfaces/db/organization-interface';
import { TitleInterface } from 'src/app/interfaces/db/title-interface';

export interface Response {
    members_altar_servers_types: AltarServersTypeInterface[];
    members_church_groups: ChurchGroupInterface[];
    members_class_leaders: ClassLeaderInterface[];
    countries: CountryInterface[];
    members_genders: GenderInterface[];
    members_marital_statuses: MaritalStatusInterface[];
    members_membership_statuses: MembershipStatusInterface[];
    members_occupations_industries: OccupationIndustryInterface[];
    members_occupations_by_industry: OccupationInterface[];
    members_organizations: OrganizationInterface[];
    members_titles: TitleInterface[];
}

@Injectable({
    providedIn: 'root',
})
class MemberDetailsFormPrerequisiteQuery extends Query<Response> {
    document = gql`
        query($industry_id: Int!) {
            members_altar_servers_types {
                id
                name
            }
            members_church_groups {
                id
                name
            }
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
            countries {
                country_id
                country
                continent
                region
                iso
                iso3
            }
            members_genders {
                id
                name
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
            members_occupations_industries {
                id
                name
            }
            members_occupations_by_industry(industry_id: $industry_id) {
                id
                name
                industry_id
                members_occupations_industries {
                    id
                    name
                }
            }
            members_organizations {
                id
                name
            }
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
export class MembersPrerequisiteService {
    constructor(
        private readonly memberDetailsFormPrerequisiteQuery: MemberDetailsFormPrerequisiteQuery
    ) {}

    public getMemberDetailsFormPrerequisite(indudstryId: number) {
        return this.memberDetailsFormPrerequisiteQuery.fetch(
            {
                industry_id: indudstryId,
            },
            {
                // pollInterval: 15 * 1000,
            }
        );
    }
}
