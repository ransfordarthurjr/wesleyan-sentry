import { ChurchGroupInterface } from './church-group-interface';

export interface ChurchGroupAssociationInterface {
    id: number;
    member_id: number;
    church_group_id: number;
    members_church_groups: ChurchGroupInterface;
}
