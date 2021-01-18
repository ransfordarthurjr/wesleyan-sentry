import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { PaymentCurrencyInterface } from 'src/app/interfaces/db/payment-currency-interface';

type Response = {
    payments_currencies: PaymentCurrencyInterface[];
};

@Injectable({
    providedIn: 'root',
})
class PaymentCurrenciesQuery extends Query<Response> {
    document = gql`
        query {
            payments_currencies {
                id
                currency
                code
                code2
            }
        }
    `;
}

@Injectable({
    providedIn: 'root',
})
export class PaymentCurrencyService {
    constructor(
        private readonly paymentCurrenciesQuery: PaymentCurrenciesQuery
    ) {}

    public getPaymentCurrencies() {
        return this.paymentCurrenciesQuery.fetch({}, {});
    }
}
