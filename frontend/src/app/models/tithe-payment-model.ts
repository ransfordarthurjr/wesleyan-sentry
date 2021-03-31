import { ClassLeaderInterface } from '../interfaces/db/class-leader-interface';
import { MemberInterface } from '../interfaces/db/member-interface';
import { MemberTithePaymentInterface } from '../interfaces/db/member-tithe-payment-interface';

export class TithePaymentModel {
    constructor(memberTithePaymentInterface: MemberTithePaymentInterface) {
        this._memberTithePaymentInterface = memberTithePaymentInterface;
        this._selected = false;
    }

    private _memberTithePaymentInterface: MemberTithePaymentInterface;
    private _selected: boolean;
    private _classLeaderInterface!: ClassLeaderInterface;

    public get memberTithePaymentInterface(): MemberTithePaymentInterface {
        return this._memberTithePaymentInterface;
    }

    public set memberTithePaymentInterface(
        memberTithePaymentInterface: MemberTithePaymentInterface
    ) {
        this._memberTithePaymentInterface = memberTithePaymentInterface;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(selected: boolean) {
        this._selected = selected;
    }

    public get classLeaderInterface(): ClassLeaderInterface {
        return this._classLeaderInterface;
    }

    public set classLeaderInterface(
        classLeaderInterface: ClassLeaderInterface
    ) {
        this._classLeaderInterface = classLeaderInterface;
    }
}
