import { MemberInterface } from './member-interface';

export interface ClassLeaderInterface {
    id: number;
    class_name?: string;
    member_id_asst_leader?: number;
    member_id_leader: number;

    assistant_class_leaders?: MemberInterface;
    class_leaders: MemberInterface;
}
