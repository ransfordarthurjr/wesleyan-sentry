import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounce, debounceTime, filter, map, takeWhile } from 'rxjs/operators';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import { default as _rollupMoment } from 'moment';

import {
    MembersPrerequisiteService,
    Response as MembersPrerequisiteResponse,
} from 'src/app/services/api/graphql/components/members-prerequisite.service';
import { MemberService } from 'src/app/services/api/graphql/member.service';

import { MemberInterface } from 'src/app/interfaces/db/member-interface';

import { CheckboxModel } from 'src/app/models/checkbox-model';

@Component({
    selector: 'app-xwesleyan-pagex',
    templateUrl: './xwesleyan-pagex.component.html',
    styleUrls: ['./xwesleyan-pagex.component.scss'],
})
export class XwesleyanPagexComponent implements OnInit, OnDestroy {
    constructor(
        private readonly searchPaymentsFormBuilder: FormBuilder,
        private readonly tithePaymentFormBuilder: FormBuilder
    ) {
        //setup forms
        this._setupSearchPaymentsForm();
        this._setupTithePayementForm();
    }

    /* #region formcontrols */
    // form controls
    private _searchPaymentsForm!: FormGroup;
    private _searchPaymentsTextControl!: FormControl;

    private _tithePaymentForm!: FormGroup;

    // form controls
    /* #endregion */

    /* #region variablessubscriptons */
    /* #endregion */

    /* #region variablesdataholders */
    // variablesdataholders
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

    // received events//
    /* #endregion */

    /* #region setupforms */
    // setup forms
    private _setupSearchPaymentsForm(): void {
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
        /* #endregion */
        this._tithePaymentForm = this.tithePaymentFormBuilder.group({
            /* #region setformcontrols */
            /* #endregion */
        });

        this._setSearchFormControlsListeners();
    }

    private _setSearchFormControlsListeners(): void {}
    // setup forms
    /* #endregion */

    // close subscriptions
    private _stopSubscriptions(): void {}
    // close subscriptions

    /* #region getsetupinformation */
    // get setup information
    private _setupPrerequisiteDataServices(): void {
        //create observable of subscriptions of prerequisites and members

        this._fetchSetupData();
    }

    private _fetchSetupData(): void {
        // call prerequisite subscription
    }
    // get setup information
    /* #endregion */

    /* #region memberfunctions */
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
    public get searchPaymentsForm(): FormGroup {
        return this._searchPaymentsForm;
    }

    public get searchPaymentsTextControl(): FormControl {
        return this._searchPaymentsTextControl;
    }

    public get tithePaymentForm(): FormGroup {
        return this._tithePaymentForm;
    }
    /* #endregion */
}
