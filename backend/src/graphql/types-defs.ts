import { gql } from 'apollo-server-express';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

export const typeDefs = gql`
    enum Booleany {
        truthy
        falsey
    }

    scalar GraphQLDate
    scalar GraphQLDateTime

    type Country {
        country_id: Int!
        country: String!
        continent: String!
        region: String!
        iso: String!
        iso3: String!
        capital: String
        independence_year: Int
        unsd_code: String
        phone_code: String
    }

    type Member {
        member_id: Int!
        firstname: String!
        lastname: String!
        othernames: String
        email: String
        mobile: String!
        mobile_2: String
        dateofbirth: GraphQLDate!
        baptised: Booleany
        confirmed: Booleany
        gender_id: Int!
        title_id: Int!
        membership_status_id: Int!
        marital_status_id: Int!
        country_id: Int!
        occupation_id: Int!
        countries: Country!
        members_genders: Gender!
        members_marital_statuses: MaritalStatus!
        members_membership_statuses: MembershipStatus!
        members_occupations: Occupation!
        members_titles: Title!
        members_classes: [MemberClass]!
        assistant_class_leaders: [ClassLeader]
        class_leaders: [ClassLeader]!
        members_organizations_associations: [OrganizationAssociation]
        members_church_groups_associations: [ChurchGroupAssociation]
        members_altar_servers_types_associations: [AltarServersTypeAssociation]
    }

    type CoordinatingOffice {
        id: Int!
        name: String!
    }

    type AltarServersType {
        id: Int!
        name: String!
    }

    type ChurchGroup {
        id: Int!
        name: String!
    }

    type Gender {
        id: Int!
        name: String!
    }

    type MaritalStatus {
        id: Int!
        name: String!
        description: String
    }

    type MembershipStatus {
        id: Int!
        name: String!
        description: String
    }

    type Occupation {
        id: Int!
        name: String!
        industry_id: Int!
        members_occupations_industries: OccupationIndustry
    }

    type OccupationIndustry {
        id: Int!
        name: String!
        members_occupations: [Occupation]
    }

    type Organization {
        id: Int!
        name: String!
    }

    type OrganizationAssociation {
        id: Int!
        member_id: Int!
        organization_id: Int!
        members: Member!
        members_organizations: Organization!
    }

    type ChurchGroupAssociation {
        id: Int!
        member_id: Int!
        church_group_id: Int!
        members: Member!
        members_church_groups: ChurchGroup!
    }

    type AltarServersTypeAssociation {
        id: Int!
        member_id: Int!
        altar_servers_type_id: Int!
        members: Member!
        members_altar_servers_types: AltarServersType!
    }

    type Title {
        id: Int!
        title: String!
    }

    type ClassLeader {
        id: Int!
        class_name: String!
        member_id_leader: Int!
        member_id_asst_leader: Int
        class_leaders: Member!
        assistant_class_leaders: Member
        members_classes: [Member]
    }

    type MemberClass {
        id: Int!
        member_id: Int!
        class_id: Int!
        members_class_leaders: ClassLeader!
        members: Member!
    }

    type PaymentCurrency {
        id: Int!
        currency: String!
        code: String!
        code2: String!
    }

    type PaymentType {
        id: Int!
        name: String!
        description: String
    }

    type MemberTithePayment {
        id: Int!
        transaction_date: GraphQLDateTime!
        payment_date: GraphQLDate!
        payment_type_id: Int!
        member_id: Int!
        payment_currency_id: Int!
        amount: Float!
        transaction_reference: String
        description: String
        members: Member!
        payments_currencies: PaymentCurrency!
        payments_types: PaymentType!
    }

    type Query {
        members_titles: [Title]
        members_genders: [Gender]
        members_organizations: [Organization]
        members_altar_servers_types: [AltarServersType]
        members_church_groups: [ChurchGroup]
        members_class_leaders: [ClassLeader]
        members_marital_statuses: [MaritalStatus]
        members_membership_statuses: [MembershipStatus]
        countries: [Country]
        members_occupations_industries: [OccupationIndustry]
        members_occupation_by_id(id: Int = 0): Occupation
        members_occupations_by_industry(industry_id: Int = 0): [Occupation]
        payments_currencies: [PaymentCurrency]
        payments_types: [PaymentType]
        members: [Member]
        members_by_name(name: String = 0): [Member]
        members_tithes_payments: [MemberTithePayment]
        members_tithes_payments_by_date(
            payment_date: GraphQLDate = "2020-01-01"
        ): [MemberTithePayment]
    }
`;
