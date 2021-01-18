import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TithePaymentModel } from 'src/app/models/tithe-payment-model';

@Component({
    selector: 'app-tithes-tithe-payment-preview',
    templateUrl: './tithes-tithe-payment-preview.component.html',
    styleUrls: ['./tithes-tithe-payment-preview.component.scss'],
})
export class TithesTithePaymentPreviewComponent implements OnInit {
    constructor() {}

    @Input() tithePayment!: TithePaymentModel;
    @Output()
    selectedTithePaymentEvent: EventEmitter<TithePaymentModel> = new EventEmitter<TithePaymentModel>();

    ngOnInit(): void {}

    // events//
    selectedTithePayment(): void {
        this.selectedTithePaymentEvent.emit(this.tithePayment);
    }
    // end events//

    //classes
    isSelected(): string[] {
        return this.tithePayment.selected
            ? ['border-teal-700', 'bg-gray-50']
            : ['border-transparent', 'bg-white'];
    }

    getClsAmount(): string[] {
        return ['border-gray-400', 'bg-gray-600'];
    }

    getClsPaymentType(): string[] {
        return ['text-gray-600'];
    }
    //classes
}
