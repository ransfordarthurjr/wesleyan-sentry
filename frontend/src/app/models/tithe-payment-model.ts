import { MemberTithePaymentInterface } from '../interfaces/db/member-tithe-payment-interface';

export class TithePaymentModel {
    constructor(memberTithePaymentInterface: MemberTithePaymentInterface) {
        this._memberTithePaymentInterface = memberTithePaymentInterface;
        this._selected = false;
    }

    private _memberTithePaymentInterface: MemberTithePaymentInterface;
    private _selected: boolean;

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
}
