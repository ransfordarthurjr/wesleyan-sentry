import { MemberInterface } from './member-interface';
import { PaymentCurrencyInterface } from './payment-currency-interface';
import { PaymentTypeInterface } from './payment-type-interface';

export interface MemberTithePaymentInterface {
    id: number;
    transaction_date: Date;
    payment_date: Date;
    payment_type_id: number;
    member_id: number;
    payment_currency_id: number;
    amount: number;
    transaction_reference: string;
    description: string;
    members: MemberInterface;
    payments_currencies: PaymentCurrencyInterface;
    payments_types: PaymentTypeInterface;
}
