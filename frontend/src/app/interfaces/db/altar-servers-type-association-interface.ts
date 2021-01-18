import { AltarServersTypeInterface } from './altar-servers-type-interface';

export interface AltarServersTypeAssociationInterface {
    id: number;
    member_id: number;
    altar_servers_type_id: number;
    members_altar_servers_types: AltarServersTypeInterface;
}
