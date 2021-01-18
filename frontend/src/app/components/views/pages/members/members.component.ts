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
import { OccupationService } from 'src/app/services/api/graphql/occupation.service';

import { AltarServersTypeInterface } from 'src/app/interfaces/db/altar-servers-type-interface';
import { ChurchGroupInterface } from 'src/app/interfaces/db/church-group-interface';
import { ClassLeaderInterface } from 'src/app/interfaces/db/class-leader-interface';
import { CountryInterface } from 'src/app/interfaces/db/country-interface';
import { GenderInterface } from 'src/app/interfaces/db/gender-interface';
import { MaritalStatusInterface } from 'src/app/interfaces/db/marital-status-interface';
import { MembershipStatusInterface } from 'src/app/interfaces/db/membership-status-interface';
import { OccupationIndustryInterface } from 'src/app/interfaces/db/occupation-industry-interface';
import { OccupationInterface } from 'src/app/interfaces/db/occupation-interface';
import { OrganizationInterface } from 'src/app/interfaces/db/organization-interface';
import { TitleInterface } from 'src/app/interfaces/db/title-interface';
import { MemberInterface } from 'src/app/interfaces/db/member-interface';

import { MemberModel } from 'src/app/models/member-model';
import { CheckboxModel } from 'src/app/models/checkbox-model';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
    constructor(
        private readonly searchFormBuilder: FormBuilder,
        private readonly memberDetailsFormBuilder: FormBuilder,
        private readonly membersFormPrerequisiteService: MembersPrerequisiteService,
        private readonly occupationService: OccupationService,
        private readonly memberService: MemberService
    ) {
        //setup forms
        this._setupSearchForm();
        this._setupMemberDetailsForm();
    }

    private readonly checkboxPrefixOrganization = 'organization-checkbox-';
    private readonly checkboxPrefixChurchGroup = 'churchgroup-checkbox-';
    private readonly checkboxPrefixAltarServersType =
        'altarserverstype-checkbox-';

    /* #region formcontrols */
    // form controls
    private _searchForm!: FormGroup;
    private _searchTextControl!: FormControl;
    private _searchTextControlValue: string = '';

    private _memberDetailsForm!: FormGroup;
    private _titleSelectControl!: FormControl;
    private _lastnameTextControl!: FormControl;
    private _firstnameTextControl!: FormControl;
    private _othernamesTextControl!: FormControl;

    private _dateofbirthDatepickerControl!: FormControl;
    private _genderSelectControl!: FormControl;

    private _maritalStatusSelectControl!: FormControl;
    private _countrySelectControl!: FormControl;

    private _mobileTextControl!: FormControl;
    private _mobile2TextControl!: FormControl;
    private _emailTextControl!: FormControl;

    private _occupationIndustrySelectControl!: FormControl;
    private _occupationIndustrySelectControlValue!: number;
    private _occupationSelectControl!: FormControl;

    private _baptisedToggleControl!: FormControl;
    private _confirmedToggleControl!: FormControl;

    private _organizationsArray!: FormArray;
    private _organizationsCheckboxModels!: CheckboxModel[];

    private _churchGroupsArray!: FormArray;
    private _churchGroupsCheckboxModels!: CheckboxModel[];

    private _altarServersTypesArray!: FormArray;
    private _altarServersTypesCheckboxModels!: CheckboxModel[];

    private _classLeaderToggleControl!: FormControl;
    private _assistantClassLeaderToggleControl!: FormControl;

    private _membershipStatusSelectControl!: FormControl;
    private _classLeaderSelectControl!: FormControl;

    // form controls
    /* #endregion */

    /* #region variablessubscriptons */
    private _memberDetailsFormPrerequisites$!: Observable<MembersPrerequisiteResponse>;
    private _memberDetailsFormPrerequisitesSubscription!: Subscription;
    //private _memberOccupations$!: Observable<OccupationInterface>;
    private _memberOccupationsSubscription!: Subscription;

    private _members$!: Observable<MemberInterface[]>;
    private _membersSubscription!: Subscription;
    /* #endregion */

    /* #region variablesdataholders */
    private _altarServersTypes: AltarServersTypeInterface[] = [];
    private _churchGroups: ChurchGroupInterface[] = [];
    private _classLeaders: ClassLeaderInterface[] = [];
    private _countries: CountryInterface[] = [];
    private _genders: GenderInterface[] = [];
    private _maritalStatuses: MaritalStatusInterface[] = [];
    private _membershipStatuses: MembershipStatusInterface[] = [];
    private _occupationIndustries: OccupationIndustryInterface[] = [];
    private _occupations: OccupationInterface[] = [];
    private _organizations: OrganizationInterface[] = [];
    private _titles: TitleInterface[] = [];

    //private _membersInterfaces: MemberInterface[] = [];
    private _members: MemberModel[] = [];
    private _filteredMembers: MemberModel[] = [];

    // data holders
    /* #endregion */

    /* #region lifecyclemethods */
    // component life cycle methods
    ngOnInit(): void {
        this._getSetupPrerequisiteData();
    }

    ngOnDestroy(): void {
        this._stopSubscriptions();
    }
    // component life cycle methods
    /* #endregion */

    /* #region receivedevents */
    // received events//
    private _selectedMember!: MemberModel;
    selectedMemberEventReceived(event$: MemberModel) {
        //deselect the previous selected
        if (typeof this._selectedMember !== 'undefined') {
            //unset selected on previous
            this._selectedMember.selected = false;
        }

        //set new selected as current
        this._selectedMember = event$;
        this._selectedMember.selected = true;

        //console.log('selected member', this._selectedMember);
        //load values into memberdetails
        this._memberDetailsForm.patchValue(
            this._selectedMember.memberInterface
        );

        //custom loads
        // set occupation industry
        // (no need to set occupation as well)
        this._occupationIndustrySelectControl.setValue(
            this._selectedMember.memberInterface.members_occupations.industry_id
        );

        //set baptism and confirmation
        this._baptisedToggleControl.setValue(
            this._selectedMember.memberInterface.baptised === 'truthy'
        );
        this._confirmedToggleControl.setValue(
            this._selectedMember.memberInterface.confirmed === 'truthy'
        );

        // set orgainaztions
        // first clear all and set only those that user belongs to
        this._organizationsArray.controls.forEach((control) =>
            control.setValue(false)
        );
        this._selectedMember.memberInterface.members_organizations_associations.forEach(
            (association) => {
                const index = this._organizationsCheckboxModels.findIndex(
                    (checkbox) => checkbox.id === association.organization_id
                );
                this._organizationsArray.controls[index].setValue(true);
            }
        );
        // set church groups
        // first clear all and set only those that user belongs to
        this._churchGroupsArray.controls.forEach((control) =>
            control.setValue(false)
        );
        this._selectedMember.memberInterface.members_church_groups_associations.forEach(
            (association) => {
                const index = this._churchGroupsCheckboxModels.findIndex(
                    (checkbox) => checkbox.id === association.church_group_id
                );
                this._churchGroupsArray.controls[index].setValue(true);
            }
        );
        // set altar servers
        // first clear all and set only those that user belongs to
        this._altarServersTypesArray.controls.forEach((control) =>
            control.setValue(false)
        );
        this._selectedMember.memberInterface.members_altar_servers_types_associations.forEach(
            (association) => {
                const index = this._altarServersTypesCheckboxModels.findIndex(
                    (checkbox) =>
                        checkbox.id === association.altar_servers_type_id
                );
                this._altarServersTypesArray.controls[index].setValue(true);
            }
        );

        // set member status as cleader or assistant
        // set class leader toggle
        // does member id === class leader id
        this._classLeaderToggleControl.setValue(
            this._selectedMember.memberInterface.member_id ===
                this._selectedMember.classLeaderInterface.member_id_leader
        );

        // set class assistant leader toggle
        // does member id === class assistant leader id
        this._assistantClassLeaderToggleControl.setValue(
            this._selectedMember.memberInterface.member_id ===
                this._selectedMember.classLeaderInterface.member_id_asst_leader
        );

        // set class leader of member
        this._classLeaderSelectControl.setValue(
            this._selectedMember.classLeaderInterface.id
        );

        // disable class selection if individual is a class leader or assistant
        // moved to observable _setSearchFormControlsListeners
    }
    /* #endregion */

    /* #region setupforms */
    // setup forms
    private _setupSearchForm(): void {
        this._searchTextControl = new FormControl(this._searchTextControlValue);
        this._searchForm = this.searchFormBuilder.group({
            searchText: this.searchTextControl,
        });
    }

    private _setupMemberDetailsForm(): void {
        /* #region initializeformcontrols */
        this._titleSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._lastnameTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._firstnameTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._othernamesTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._dateofbirthDatepickerControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._genderSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._countrySelectControl = new FormControl(
            { value: 1082, disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._maritalStatusSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._maritalStatusSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._mobileTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._mobile2TextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        this._emailTextControl = new FormControl(
            { value: '', disabled: false },
            { validators: Validators.compose([]) }
        );
        this._occupationIndustrySelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._occupationSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._baptisedToggleControl = new FormControl(
            { value: null, disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._confirmedToggleControl = new FormControl(
            { value: null, disabled: false },
            { validators: Validators.compose([Validators.required]) }
        );
        this._organizationsArray = new FormArray([]);
        this._churchGroupsArray = new FormArray([]);
        this._altarServersTypesArray = new FormArray([]);
        this._classLeaderToggleControl = new FormControl(
            { value: false, disabled: true },
            { validators: Validators.compose([]) }
        );
        this._assistantClassLeaderToggleControl = new FormControl(
            { value: false, disabled: true },
            { validators: Validators.compose([]) }
        );
        this._membershipStatusSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        this._classLeaderSelectControl = new FormControl(
            { value: '', disabled: true },
            { validators: Validators.compose([Validators.required]) }
        );
        /* #endregion */
        this._memberDetailsForm = this.memberDetailsFormBuilder.group({
            /* #region setformcontrols */
            title_id: this._titleSelectControl,
            lastname: this._lastnameTextControl,
            firstname: this._firstnameTextControl,
            othernames: this._othernamesTextControl,
            dateofbirth: this._dateofbirthDatepickerControl,
            gender_id: this._genderSelectControl,
            country_id: this._countrySelectControl,
            marital_status_id: this._maritalStatusSelectControl,
            mobile: this._mobileTextControl,
            mobile_2: this._mobile2TextControl,
            email: this._emailTextControl,
            occupationIndustry: this._occupationIndustrySelectControl,
            occupation_id: this._occupationSelectControl,
            baptism: this._baptisedToggleControl,
            confirmation: this._confirmedToggleControl,
            organizations: this._organizationsArray,
            churchGroups: this._churchGroupsArray,
            altarServersTypes: this._altarServersTypesArray,
            classLeader: this._classLeaderToggleControl,
            assistantClassLeader: this._assistantClassLeaderToggleControl,
            membership_status_id: this._membershipStatusSelectControl,
            memberClassLeader: this._classLeaderSelectControl,
            /* #endregion */
        });

        this._setSearchFormControlsListeners();
    }

    private _setSearchFormControlsListeners(): void {
        this._searchTextControl.valueChanges
            .pipe(
                //startWith(''),
                //perform check after no-value change for 1s
                debounceTime(1 * 1000),
                map((value) => {
                    this._searchTextControlValue = value;
                    const searchValue = value.toLocaleLowerCase().trim();
                    //on nothin entered or empty or first
                    if (searchValue === '') {
                        return this._members;
                    }

                    return this._members.filter(
                        (member) =>
                            member.memberInterface.firstname
                                .toLocaleLowerCase()
                                .includes(searchValue) ||
                            member.memberInterface.lastname
                                .toLocaleLowerCase()
                                .includes(searchValue) ||
                            member.memberInterface.othernames
                                .toLocaleLowerCase()
                                .includes(searchValue)
                    );
                })
            )
            .subscribe(
                (filteredMembers) => (this._filteredMembers = filteredMembers)
            );

        this._occupationIndustrySelectControl.valueChanges
            .pipe(
                //trigger occupation update on 2seconds no change
                debounceTime(2 * 1000)
            )
            .subscribe({
                next: (value) => {
                    this._occupationIndustrySelectControlValue = value;

                    this._fetchOccupationsByIndustryId(
                        this._occupationIndustrySelectControlValue
                    );
                },
            });

        combineLatest([
            this._classLeaderToggleControl.valueChanges,
            this._assistantClassLeaderToggleControl.valueChanges,
        ])
            .pipe(
                map(
                    ([isClassLeader, isAssistantClassLeader]) =>
                        isClassLeader || isAssistantClassLeader
                )
            )
            .subscribe({
                next: (isCleaderOrAssistant) => {
                    isCleaderOrAssistant
                        ? this._classLeaderSelectControl.disable()
                        : this._classLeaderSelectControl.enable();
                },
            });
    }

    private _resetFormSetupData(): void {
        this._altarServersTypes = [];
        this._churchGroups = [];
        this._classLeaders = [];
        this._countries = [];
        this._genders = [];
        this._maritalStatuses = [];
        this._membershipStatuses = [];
        this._occupationIndustries = [];
        this._occupations = [];
        this._organizations = [];
        this._titles = [];
    }
    // setup forms
    /* #endregion */

    // close subscriptions
    private _stopSubscriptions(): void {
        if (this._memberDetailsFormPrerequisitesSubscription) {
            this._memberDetailsFormPrerequisitesSubscription.unsubscribe();
        }

        if (this._memberOccupationsSubscription) {
            this._memberOccupationsSubscription.unsubscribe();
        }

        if (this._membersSubscription) {
            this._membersSubscription.unsubscribe();
        }
    }
    // close subscriptions

    /* #region getsetupinformation */
    // get setup information
    private _getSetupPrerequisiteData(): void {
        //create subscriptions of prerequisites and members
        this._memberDetailsFormPrerequisites$ = this.membersFormPrerequisiteService
            .getMemberDetailsFormPrerequisite(0)
            .pipe(map((response) => response.data));

        this._members$ = this.memberService
            .getMemebers()
            .valueChanges.pipe(map((response) => response.data.members));

        this._fetchSetupData();
    }

    private _fetchSetupData(): void {
        // call prerequisite subscription
        // and then call members subscription on prereq completed\

        this._titleSelectControl.disable();
        this._genderSelectControl.disable();
        this._maritalStatusSelectControl.disable();
        this._occupationIndustrySelectControl.disable();
        this._occupationSelectControl.disable();
        this._memberDetailsFormPrerequisitesSubscription = this._memberDetailsFormPrerequisites$.subscribe(
            {
                next: (prerequisites) => {
                    //console.log(prerequisites);
                    this._resetFormSetupData();

                    /* #region assignprereqdata */
                    if (prerequisites.members_altar_servers_types) {
                        this._altarServersTypes =
                            prerequisites.members_altar_servers_types;
                    }

                    if (prerequisites.members_church_groups) {
                        this._churchGroups =
                            prerequisites.members_church_groups;
                    }

                    if (prerequisites.members_class_leaders) {
                        this._classLeaders =
                            prerequisites.members_class_leaders;
                        this._classLeaderSelectControl.enable();
                    }

                    if (prerequisites.countries) {
                        this._countries = prerequisites.countries;
                        this.countrySelectControl.enable();
                    }

                    if (prerequisites.members_genders) {
                        this._genders = prerequisites.members_genders;
                        this._genderSelectControl.enable();
                    }

                    if (prerequisites.members_marital_statuses) {
                        this._maritalStatuses =
                            prerequisites.members_marital_statuses;
                        this._maritalStatusSelectControl.enable();
                    }

                    if (prerequisites.members_membership_statuses) {
                        this._membershipStatuses =
                            prerequisites.members_membership_statuses;
                        this.membershipStatusSelectControl.enable();
                    }

                    if (prerequisites.members_occupations_industries) {
                        this._occupationIndustries =
                            prerequisites.members_occupations_industries;
                        this._occupationIndustrySelectControl.enable();
                    }

                    if (prerequisites.members_occupations_by_industry) {
                        this._occupations =
                            prerequisites.members_occupations_by_industry;
                        this._occupationSelectControl.enable();
                    }

                    if (prerequisites.members_organizations) {
                        this._organizations =
                            prerequisites.members_organizations;
                    }

                    if (prerequisites.members_titles) {
                        this._titles = prerequisites.members_titles;
                        this._titleSelectControl.enable();
                    }
                    /* #endregion */
                },

                error: (err) => {
                    console.error(err);
                },

                complete: () => {
                    this._setupOrganizationsCheckboxControls();
                    this._setupChurchGroupsCheckboxControls();
                    this._setupAltarServersTypesCheckboxControls();
                    this._fetchMembersData();

                    //set default country as Ghana
                    this._countrySelectControl.setValue(
                        this._countries.find(
                            (country) =>
                                country.country.toLowerCase() === 'ghana'
                        )?.country_id
                    );
                    //set first value to trigger population of occupations
                    this._occupationIndustrySelectControl.setValue(
                        this.occupationIndustries[0].id
                    );
                },
            }
        );
    }

    private _fetchMembersData(): void {
        this._membersSubscription = this._members$.subscribe({
            next: (memebers) => {
                this._members = [];
                if (memebers) {
                    let member: MemberModel;
                    memebers.forEach((memb) => {
                        member = new MemberModel(memb);
                        member.classLeaderInterface = this._classLeaders.find(
                            (cl) => cl.id === memb.members_classes[0].class_id
                        )!;

                        this._members.push(member);
                    });

                    //call set value to trigger on change event
                    this._searchTextControl.setValue(
                        this._searchTextControlValue
                    );
                    //console.log(this._members);
                }
            },
            error: (err) => {
                console.error(err);
            },
            complete: () => {},
        });
    }

    private _setupOrganizationsCheckboxControls(): void {
        this._organizationsCheckboxModels = [];

        let checkboxModel: CheckboxModel;
        this._organizations.forEach((org) => {
            checkboxModel = new CheckboxModel(
                org.id,
                org.name,
                this.checkboxPrefixOrganization
            );

            this._organizationsCheckboxModels.push(checkboxModel);
            this._organizationsArray.push(new FormControl());
            this._memberDetailsForm.setControl(
                'organizations',
                this._organizationsArray
            );
        });
    }

    private _setupChurchGroupsCheckboxControls(): void {
        this._churchGroupsCheckboxModels = [];

        let checkboxModel: CheckboxModel;
        this._churchGroups.forEach((group) => {
            checkboxModel = new CheckboxModel(
                group.id,
                group.name,
                this.checkboxPrefixChurchGroup
            );

            this._churchGroupsCheckboxModels.push(checkboxModel);
            this._churchGroupsArray.push(new FormControl());
            this._memberDetailsForm.setControl(
                'churchGroups',
                this._churchGroupsArray
            );
        });
    }

    private _setupAltarServersTypesCheckboxControls(): void {
        this._altarServersTypesCheckboxModels = [];

        let checkboxModel: CheckboxModel;
        this._altarServersTypes.forEach((serverType) => {
            checkboxModel = new CheckboxModel(
                serverType.id,
                serverType.name,
                this.checkboxPrefixAltarServersType
            );

            this._altarServersTypesCheckboxModels.push(checkboxModel);
            this._altarServersTypesArray.push(new FormControl());
            this._memberDetailsForm.setControl(
                'altarServersTypes',
                this._altarServersTypesArray
            );
        });
    }

    private _fetchOccupationsByIndustryId(industryId: number): void {
        this._occupations = [];
        this._occupationSelectControl.disable();
        this._memberOccupationsSubscription = this.occupationService
            .getOccupationsByIndustryId(industryId)
            .pipe(map((response) => response.data))
            .subscribe({
                next: (response) => {
                    if (response.members_occupations_by_industry) {
                        this._occupations =
                            response.members_occupations_by_industry;

                        this._occupationSelectControl.enable();
                    }
                },
            });
    }
    // get setup information
    /* #endregion */

    /* #region memberfunctions */
    public addNewMember(): void {}

    public saveExistingMember(): void {}
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
    // getters and setters
    public get memberDetailsFormPrerequisites$(): Observable<MembersPrerequisiteResponse> {
        return this._memberDetailsFormPrerequisites$;
    }

    public get altarServersTypes(): AltarServersTypeInterface[] {
        return this._altarServersTypes;
    }

    public get churchGroups(): ChurchGroupInterface[] {
        return this._churchGroups;
    }

    public get classLeaders(): ClassLeaderInterface[] {
        return this._classLeaders;
    }

    public get countries(): CountryInterface[] {
        return this._countries;
    }

    public get genders(): GenderInterface[] {
        return this._genders;
    }

    public get maritalStatuses(): MaritalStatusInterface[] {
        return this._maritalStatuses;
    }

    public get membershipStatuses(): MembershipStatusInterface[] {
        return this._membershipStatuses;
    }

    public get occupationIndustries(): OccupationIndustryInterface[] {
        return this._occupationIndustries;
    }

    public get occupations(): OccupationInterface[] {
        return this._occupations;
    }

    public get organizations(): OrganizationInterface[] {
        return this._organizations;
    }

    public get titles(): TitleInterface[] {
        return this._titles;
    }

    public get members$(): Observable<MemberInterface[]> {
        return this._members$;
    }

    public get members(): MemberModel[] {
        return this._members;
    }

    public get filteredMembers(): MemberModel[] {
        return this._filteredMembers;
    }

    public get searchForm(): FormGroup {
        return this._searchForm;
    }

    public get searchTextControl(): FormControl {
        return this._searchTextControl;
    }

    public get searchTextControlValue(): string {
        return this._searchTextControlValue;
    }

    public set searchTextControlValue(searchTextControlValue: string) {
        this._searchTextControlValue = searchTextControlValue;
    }

    public get memberDetailsForm(): FormGroup {
        return this._memberDetailsForm;
    }

    public get titleSelectControl(): FormControl {
        return this._titleSelectControl;
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

    public get dateofbirthDatepickerControl(): FormControl {
        return this._dateofbirthDatepickerControl;
    }

    public get genderSelectControl(): FormControl {
        return this._genderSelectControl;
    }

    public get maritalStatusSelectControl(): FormControl {
        return this._maritalStatusSelectControl;
    }

    public get countrySelectControl(): FormControl {
        return this._countrySelectControl;
    }

    public get mobileTextControl(): FormControl {
        return this._mobileTextControl;
    }

    public get mobile2TextControl(): FormControl {
        return this._mobile2TextControl;
    }

    public get emailTextControl(): FormControl {
        return this._emailTextControl;
    }

    public get occupationIndustrySelectControl(): FormControl {
        return this._occupationIndustrySelectControl;
    }

    public get occupationSelectControl(): FormControl {
        return this._occupationSelectControl;
    }

    public get baptisedToggleControl(): FormControl {
        return this._baptisedToggleControl;
    }

    public get confirmedToggleControl(): FormControl {
        return this._confirmedToggleControl;
    }

    public get organizationsArray(): FormArray {
        return this._organizationsArray;
    }

    public get organizationsCheckboxModels(): CheckboxModel[] {
        return this._organizationsCheckboxModels;
    }

    public get churchGroupsArray(): FormArray {
        return this._churchGroupsArray;
    }
    public get churchGroupsCheckboxModels(): CheckboxModel[] {
        return this._churchGroupsCheckboxModels;
    }
    public get altarServersTypesArray(): FormArray {
        return this._altarServersTypesArray;
    }
    public get altarServersTypesCheckboxModels(): CheckboxModel[] {
        return this._altarServersTypesCheckboxModels;
    }

    public get classLeaderToggleControl(): FormControl {
        return this._classLeaderToggleControl;
    }

    public get assistantClassLeaderToggleControl(): FormControl {
        return this._assistantClassLeaderToggleControl;
    }

    public get membershipStatusSelectControl(): FormControl {
        return this._membershipStatusSelectControl;
    }

    public get classLeaderSelectControl(): FormControl {
        return this._classLeaderSelectControl;
    }
    // getters and setters
    /* #endregion */
}
