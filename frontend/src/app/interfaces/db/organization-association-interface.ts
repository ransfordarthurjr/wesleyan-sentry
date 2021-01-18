import { OrganizationInterface } from './organization-interface';

export interface OrganizationAssociationInterface {
    id: number;
    member_id: number;
    organization_id: number;
    members_organizations: OrganizationInterface;
}
