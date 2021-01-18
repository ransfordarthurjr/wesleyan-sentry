import { ClassLeaderInterface } from '../interfaces/db/class-leader-interface';
import { MemberInterface } from '../interfaces/db/member-interface';

export class MemberModel {
    constructor(memberInterface: MemberInterface) {
        this._memberInterface = memberInterface;
        this._selected = false;
    }

    private _memberInterface: MemberInterface;
    private _selected: boolean;
    private _classLeaderInterface?: ClassLeaderInterface;

    public get memberInterface(): MemberInterface {
        return this._memberInterface;
    }

    public set memberInterface(memberInterface: MemberInterface) {
        this._memberInterface = memberInterface;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(selected: boolean) {
        this._selected = selected;
    }

    public get classLeaderInterface(): ClassLeaderInterface {
        return this._classLeaderInterface!;
    }

    public set classLeaderInterface(
        classLeaderInterface: ClassLeaderInterface
    ) {
        this._classLeaderInterface = classLeaderInterface;
    }
}
