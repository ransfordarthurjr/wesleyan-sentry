import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { MemberTithePaymentInterface } from 'src/app/interfaces/db/member-tithe-payment-interface';

export interface Response {
    members_tithes_payments: MemberTithePaymentInterface[];
    members_tithes_payments_by_date: MemberTithePaymentInterface[];
}

@Injectable({
    providedIn: 'root',
})
class MembersTithesPaymentsQuery extends Query<Response> {
    document = gql`
        query {
            members_tithes_payments {
                id
                transaction_date
                payment_date
                payment_type_id
                member_id
                payment_currency_id
                amount
                transaction_reference
                description
                members {
                    member_id
                    firstname
                    lastname
                    othernames
                    #classes member belongs to
                    #ideally one
                    members_classes {
                        id
                        member_id
                        class_id
                    }
                }
                payments_currencies {
                    id
                    currency
                    code
                    code2
                }
                payments_types {
                    id
                    name
                    description
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
class MembersTithesPaymentsByPaymentDateQuery extends Query<Response> {
    document = gql`
        query($payment_date: GraphQLDate!) {
            members_tithes_payments_by_date(payment_date: $payment_date) {
                id
                transaction_date
                payment_date
                payment_type_id
                member_id
                payment_currency_id
                amount
                transaction_reference
                description
                members {
                    member_id
                    firstname
                    lastname
                    othernames
                    #classes member belongs to
                    #ideally one
                    members_classes {
                        id
                        member_id
                        class_id
                    }
                }
                payments_currencies {
                    id
                    currency
                    code
                    code2
                }
                payments_types {
                    id
                    name
                    description
                }
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class MemberTithePaymentService {
    constructor(
        private readonly membersTithesPaymentsQuery: MembersTithesPaymentsQuery,
        private readonly membersTithesPaymentsByPaymentDateQuery: MembersTithesPaymentsByPaymentDateQuery
    ) {}

    public getMemberTithePayments() {
        return this.membersTithesPaymentsQuery.fetch({}, {});
    }

    public getMemberTithePaymentsByPaymentDate(payment_date: string) {
        return this.membersTithesPaymentsByPaymentDateQuery.watch(
            { payment_date: payment_date },
            {
                pollInterval: 15 * 1000,
            }
        );
    }
}
