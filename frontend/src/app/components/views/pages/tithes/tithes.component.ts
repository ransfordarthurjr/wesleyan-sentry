import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { debounce, debounceTime, filter, map, takeWhile } from 'rxjs/operators';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import { default as _rollupMoment } from 'moment';

import {
    MembersPrerequisiteService,
    Response as MembersPrerequisiteResponse,
} from 'src/app/services/api/graphql/components/members-prerequisite.service';
import { MemberService } from 'src/app/services/api/graphql/member.service';
import { MemberTithePaymentService } from 'src/app/services/api/graphql/member-tithe-payment.service';
import { ClassLeaderService } from 'src/app/services/api/graphql/class-leader.service';
import { PaymentTypeService } from 'src/app/services/api/graphql/payment-type.service';
import { PaymentCurrencyService } from 'src/app/services/api/graphql/payment-currency.service';

import { MemberInterface } from 'src/app/interfaces/db/member-interface';
import { MemberTithePaymentInterface } from 'src/app/interfaces/db/member-tithe-payment-interface';

import { CheckboxModel } from 'src/app/models/checkbox-model';
import { TithePaymentModel } from 'src/app/models/tithe-payment-model';
import { TithesTithePaymentPreviewComponent } from '../../ui/elements/tithes-tithe-payment-preview/tithes-tithe-payment-preview.component';
import { ClassLeaderInterface } from 'src/app/interfaces/db/class-leader-interface';
import { PaymentTypeInterface } from 'src/app/interfaces/db/payment-type-interface';
import { PaymentCurrencyInterface } from 'src/app/interfaces/db/payment-currency-interface';
import { doesNotReject } from 'assert';

@Component({
    selector: 'app-tithes',
    templateUrl: './tithes.component.html',
    styleUrls: ['./tithes.component.scss'],
})
export class TithesComponent implements OnInit, OnDestroy {
    constructor(
        private readonly tithePaymentsDateFormBuilder: FormBuilder,
        private readonly searchPaymentsFormBuilder: FormBuilder,
        private readonly tithePaymentFormBuilder: FormBuilder,

        private readonly memberTithePaymentService: MemberTithePaymentService,
        private readonly classLeaderService: ClassLeaderService,
        private readonly paymentTypeService: PaymentTypeService,
        private readonly paymentCurrencyService: PaymentCurrencyService,
        private readonly memberService: MemberService
    ) {
        //setup forms
        this._setupSearchPaymentsForm();
        this._setupTithePayementForm();
    }

    /* #region formcontrols */
    // form controls
    private _tithePaymentsDateForm!: FormGroup;
    private _tithePaymentsDatepicker!: FormControl;
    private _tithePaymentsDatepickerValue!: _moment.Moment;

    private _searchPaymentsForm!: FormGroup;
    private _searchPaymentsTextControl!: FormControl;
    private _searchPaymentsTextControlValue: string = '';

    private _tithePaymentForm!: FormGroup;
    private _searchMemberAutocompleteTextControl!: FormControl;
    private _searchMemberAutocompleteTextControlValue: string = '';
    private _lastnameTextControl!: FormControl;
    private _firstnameTextControl!: FormControl;
    private _othernamesTextControl!: FormControl;
    private _classLeaderSelectControl!: FormControl;
    private _paymentTypeSelectControl!: FormControl;
    private _currencySelectControl!: FormControl;
    private _amountTextControl!: FormControl;
    private _transactionReferenceTextControl!: FormControl;
    private _descriptionTextControl!: FormControl;

    // form controls
    /* #endregion */

    /* #region variablessubscriptons */
    private _membersTithesPayments$!: Observable<MemberTithePaymentInterface[]>;
    private _membersTithesPaymentSubscription!: Subscription;

    private _prerequisiteDataSubscription!: Subscription;
    /* #endregion */

    /* #region variablesdataholders */
    // variablesdataholders
    private _membersTithesPayments: TithePaymentModel[] = [];
    private _filteredMembersTithesPayments: TithePaymentModel[] = [];
    private _classLeaders: ClassLeaderInterface[] = [];
    private _paymentTypes: PaymentTypeInterface[] = [];
    private _paymentCurrencies: PaymentCurrencyInterface[] = [];
    private _membersAutocompleteOptions: MemberInterface[] = [];

    /* #endregion */

    /* #region lifecyclemethods */
    // component life cycle methods
    ngOnInit(): void {
        this._setupPrerequisiteDataServices();
    }

    ngOnDestroy(): void {
        this._stopSubscriptions();
    }
    // component life cycle methods
    /* #endregion */

    /* #region receivedevents */
    // received events//
    private _selectedTithePayment!: TithePaymentModel;
    selectedTithePaymentEventReceived(event$: TithePaymentModel) {
        //deselect the previous selected
        if (typeof this._selectedTithePayment !== 'undefined') {
            //unset selected on previous
            this._selectedTithePayment.selected = false;
        }

        //set new selected as current
        this._selectedTithePayment = event$;
        this._selectedTithePayment.selected = true;
    }
    // received events//

    public updateAutocompleteOptions(event$: any) {
        this._searchMemberAutocompleteTextControlValue = this._searchMemberAutocompleteTextControl.value;

        this.memberService
            .getMembersByName(this._searchMemberAutocompleteTextControlValue)
            .pipe(map((response) => response.data))
            .subscribe({
                next: (members) => {
                    if (members.members_by_name) {
                        this._membersAutocompleteOptions =
                            members.members_by_name;
                    }
                },
            });
    }
    /* #endregion */

    /* #region setupforms */
    // setup forms
    private _setupSearchPaymentsForm(): void {
        this._tithePaymentsDatepicker = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        this._tithePaymentsDateForm = this.tithePaymentsDateFormBuilder.group({
            paymentsDate: this.tithePaymentsDatepicker,
        });

        this._searchPaymentsTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        this._searchPaymentsForm = this.searchPaymentsFormBuilder.group({
            searchpayments: this._searchPaymentsTextControl,
        });
    }

    private _setupTithePayementForm(): void {
        /* #region initializeformcontrols */
        this._searchMemberAutocompleteTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._lastnameTextControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._firstnameTextControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._othernamesTextControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._classLeaderSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._paymentTypeSelectControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._currencySelectControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._amountTextControl = new FormControl(
            { value: '0.00', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._transactionReferenceTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        this._descriptionTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        /* #endregion */
        this._tithePaymentForm = this.tithePaymentFormBuilder.group({
            /* #region setformcontrols */
            searchMemberAutoComplete: this._searchMemberAutocompleteTextControl,
            lastname: this._lastnameTextControl,
            firstname: this._firstnameTextControl,
            othernames: this._othernamesTextControl,
            classLeader: this._classLeaderSelectControl,
            paymentType: this._paymentTypeSelectControl,
            currency: this._currencySelectControl,
            amount: this._amountTextControl,
            transactionReference: this._transactionReferenceTextControl,
            description: this._descriptionTextControl,
            /* #endregion */
        });

        this._setSearchFormControlsListeners();
    }

    private _setSearchFormControlsListeners(): void {
        // assign dateselected value to _tithePaymentsDatepickerValue
        this._tithePaymentsDatepicker.valueChanges
            .pipe(debounceTime(1 * 1000))
            .subscribe({
                next: (value) => {
                    this._tithePaymentsDatepickerValue = value;

                    this._fetchTithePaymentsByDate();
                },
            });

        // update filtered tithe payments based on value of search box
        this._searchPaymentsTextControl.valueChanges
            .pipe(
                // wait a second after typing has top before querying
                debounceTime(1 * 1000),
                map((value) => {
                    this._searchPaymentsTextControlValue = value;
                    const searchValue = value.toLowerCase().trim();
                    //on nothin entered or empty or first
                    if (searchValue === '') {
                        return this._membersTithesPayments;
                    }
                    return this._membersTithesPayments.filter(
                        (tithe) =>
                            tithe.memberTithePaymentInterface.members.firstname
                                .toLowerCase()
                                .includes(searchValue) ||
                            tithe.memberTithePaymentInterface.members.lastname
                                .toLowerCase()
                                .includes(searchValue) ||
                            tithe.memberTithePaymentInterface.members.othernames
                                .toLowerCase()
                                .includes(searchValue)
                    );
                })
            )
            .subscribe({
                next: (filteredMembersTithesPayments) => {
                    this._filteredMembersTithesPayments = filteredMembersTithesPayments;
                },
            });

        //setup observer for search member
        // 1. when typed
        // 2. when selected
        const searchMemberAutocompleteSelected$ = this._searchMemberAutocompleteTextControl.valueChanges.pipe(
            filter((value) => typeof value === 'object' && value !== null)
        );

        const searchMemberAutocompleteTyped$ = this._searchMemberAutocompleteTextControl.valueChanges.pipe(
            filter((value) => typeof value === 'string')
        );

        searchMemberAutocompleteSelected$
            .pipe
            //debounceTime(1 * 1000)
            // todo sanitize input
            ()
            .subscribe({
                next: (selectedValue) => {
                    console.log('sv', selectedValue);
                },
            });
        searchMemberAutocompleteTyped$
            .pipe
            //debounceTime(1 * 1000)
            // todo sanitize input
            ()
            .subscribe({
                next: (typedValue) => {
                    console.log('tv', typedValue);
                },
            });

        //update member options based on typed input

        /*this.searchMemberAutocompleteTextControl.valueChanges
            .pipe(
                // wait a second after typing has top before querying
                debounceTime(1 * 1000),
                map((value: string) => {
                    console.log(value);
                    return value.trim();
                })
            )
            .subscribe({
                next: (value) => {
                    this._searchMemberAutocompleteTextControlValue = value;

                    this.memberService
                        .getMembersByName(
                            this._searchMemberAutocompleteTextControlValue
                        )
                        .pipe(map((response) => response.data))
                        .subscribe({
                            next: (members) => {
                                if (members.members_by_name) {
                                    this._membersAutocompleteOptions =
                                        members.members_by_name;
                                }
                            },
                        });
                },
            });*/
    }
    // setup forms
    /* #endregion */

    // close subscriptions
    private _stopSubscriptions(): void {
        if (this._membersTithesPaymentSubscription) {
            this._membersTithesPaymentSubscription.unsubscribe();
        }

        if (this._prerequisiteDataSubscription) {
            this._prerequisiteDataSubscription.unsubscribe();
        }
    }
    // close subscriptions

    /* #region getsetupinformation */
    // get setup information
    private _setupPrerequisiteDataServices(): void {
        //create observable of subscriptions of prerequisites
        const getClassLeaders = this.classLeaderService
            .getClassLeaders()
            .pipe(map((response) => response.data));
        const getPaymentTypes = this.paymentTypeService
            .getPaymentTypes()
            .pipe(map((response) => response.data));
        const getPaymentCurrencies = this.paymentCurrencyService
            .getPaymentCurrencies()
            .pipe(map((response) => response.data));

        this._prerequisiteDataSubscription = forkJoin([
            getClassLeaders,
            getPaymentTypes,
            getPaymentCurrencies,
        ]).subscribe({
            next: ([classLeaders, paymentTypes, paymentCurrencies]) => {
                if (classLeaders.members_class_leaders) {
                    this._classLeaders = classLeaders.members_class_leaders;
                }

                if (paymentTypes.payments_types) {
                    this._paymentTypes = paymentTypes.payments_types;
                }

                if (paymentCurrencies.payments_currencies) {
                    this._paymentCurrencies =
                        paymentCurrencies.payments_currencies;
                }
            },

            complete: () => {
                // set default value of payments to Cash
                this._paymentTypeSelectControl.setValue(
                    this._paymentTypes.find(
                        (payment) => payment.name === 'Cash'
                    )?.id
                );

                // set default value of currency to GHS
                this._currencySelectControl.setValue(
                    this.paymentCurrencies.find(
                        (currency) => currency.code === 'GHS'
                    )?.id
                );
            },
        });
    }

    private _fetchSetupData(): void {
        // call prerequisite subscription
    }

    private _fetchTithePaymentsByDate(): void {
        const paymentDate: string = this._tithePaymentsDatepickerValue.format(
            'YYYY-MM-DD'
        );
        this._membersTithesPayments$ = this.memberTithePaymentService
            .getMemberTithePaymentsByPaymentDate(paymentDate)
            .valueChanges.pipe(
                map((response) => response.data.members_tithes_payments_by_date)
            );

        this._membersTithesPaymentSubscription = this._membersTithesPayments$.subscribe(
            {
                next: (tithePayments) => {
                    if (tithePayments) {
                        this._membersTithesPayments = [];
                        tithePayments.forEach((tithe) => {
                            this._membersTithesPayments.push(
                                new TithePaymentModel(tithe)
                            );
                        });

                        // trigger set filtered members by set value
                        this._searchPaymentsTextControl.setValue(
                            this._searchPaymentsTextControlValue
                        );
                        //this._filteredMembersTithesPayments = this._membersTithesPayments;
                    }
                },
            }
        );
    }
    // get setup information
    /* #endregion */

    /* #region memberfunctions */
    public searchMemberAutocompleteDisplay(
        member: MemberInterface
    ): string | undefined {
        return member ? `${member.firstname} ${member.lastname}` : undefined;
    }
    /* #endregion */

    /* #region classes */
    datepickerSundaysHighlight: MatCalendarCellClassFunction<_moment.Moment> = (
        cellMoment: _moment.Moment,
        view: string
    ) => {
        const highlightSunday: string = 'bg-blue-300 cursor-pointer',
            highlightNonSunday: string = 'bg-gray-300 cursor-text';
        let cssClass: string = '';
        //highlight sundays with css class date-highlights-sunday
        if (view === 'month') {
            // Highlight the 1st and 20th day of each month.
            cssClass =
                cellMoment.day() === 0 ? highlightSunday : highlightNonSunday;
        }

        return cssClass;
    };
    /* #endregion */

    /* #region gettersandsetters */
    public get membersTithesPayments(): TithePaymentModel[] {
        return this._membersTithesPayments;
    }

    public get filteredMembersTithesPayments(): TithePaymentModel[] {
        return this._filteredMembersTithesPayments;
    }

    public get classLeaders(): ClassLeaderInterface[] {
        return this._classLeaders;
    }

    public get paymentTypes(): PaymentTypeInterface[] {
        return this._paymentTypes;
    }

    public get paymentCurrencies(): PaymentCurrencyInterface[] {
        return this._paymentCurrencies;
    }

    public get membersAutocompleteOptions(): MemberInterface[] {
        return this._membersAutocompleteOptions;
    }

    public get tithePaymentsDateForm(): FormGroup {
        return this._tithePaymentsDateForm;
    }

    public get tithePaymentsDatepicker(): FormControl {
        return this._tithePaymentsDatepicker;
    }

    public get searchPaymentsForm(): FormGroup {
        return this._searchPaymentsForm;
    }

    public get searchPaymentsTextControl(): FormControl {
        return this._searchPaymentsTextControl;
    }

    public get tithePaymentForm(): FormGroup {
        return this._tithePaymentForm;
    }

    public get searchMemberAutocompleteTextControl(): FormControl {
        return this._searchMemberAutocompleteTextControl;
    }

    public get lastnameTextControl(): FormControl {
        return this._lastnameTextControl;
    }

    public get firstnameTextControl(): FormControl {
        return this._firstnameTextControl;
    }

    public get othernamesTextControl(): FormControl {
        return this._othernamesTextControl;
    }

    public get classLeaderSelectControl(): FormControl {
        return this._classLeaderSelectControl;
    }

    public get paymentTypeSelectControl(): FormControl {
        return this._paymentTypeSelectControl;
    }

    public get currencySelectControl(): FormControl {
        return this._currencySelectControl;
    }

    public get amountTextControl(): FormControl {
        return this._amountTextControl;
    }

    public get transactionReferenceTextControl(): FormControl {
        return this._transactionReferenceTextControl;
    }

    public get descriptionTextControl(): FormControl {
        return this._descriptionTextControl;
    }
    /* #endregion */
}
