import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { PaymentTypeInterface } from 'src/app/interfaces/db/payment-type-interface';

type Response = {
    payments_types: PaymentTypeInterface[];
};

@Injectable({
    providedIn: 'root',
})
class PaymentTypesQuery extends Query<Response> {
    document = gql`
        query {
            payments_types {
                id
                name
                description
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class PaymentTypeService {
    constructor(private readonly paymentTypesQuery: PaymentTypesQuery) {}

    public getPaymentTypes() {
        return this.paymentTypesQuery.fetch({}, {});
    }
}
