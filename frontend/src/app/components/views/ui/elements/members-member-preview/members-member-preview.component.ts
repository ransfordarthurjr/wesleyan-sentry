import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberModel } from 'src/app/models/member-model';

@Component({
    selector: 'app-members-member-preview',
    templateUrl: './members-member-preview.component.html',
    styleUrls: ['./members-member-preview.component.scss'],
})
export class MembersMemberPreviewComponent implements OnInit {
    constructor() {}

    @Input() member!: MemberModel;
    @Output()
    selectedMemberEvent: EventEmitter<MemberModel> = new EventEmitter<MemberModel>();

    ngOnInit(): void {}

    // events//
    selectMember(): void {
        this.selectedMemberEvent.emit(this.member);
    }
    // end events//

    //classes
    isSelected(): string[] {
        return this.member.selected
            ? ['border-blue-700', 'bg-gray-50']
            : ['border-transparent', 'bg-white'];
    }

    getClsMembershipStatus(): string[] {
        switch (this.member.memberInterface.membership_status_id) {
            case 1004: //'Adherent'
                return ['border-gray-400', 'bg-gray-600'];

            case 1003: //'Catechumen'
                return ['border-pink-400', 'bg-pink-700'];

            case 1001: //'Full Member'
                return ['border-purple-400', 'bg-purple-800'];

            case 1002: //'Junior Member'
                return ['border-blue-400', 'bg-blue-700'];

            default:
                return ['border-gray-400', 'bg-gray-600'];
        }
    }

    getClsClassLeader(): string[] {
        if (this.member.memberInterface.class_leaders.length >= 1) {
            //is the member id part of the his/her class leader list
            //is he/she a class leader in his/her own class
            /*const classLeader = this.member.memberInterface.class_leaders.find(
                ({ member_id_leader }) =>
                    member_id_leader === this.member.memberInterface.member_id
            );

            return typeof classLeader !== 'undefined'
                ? ['text-pink-900']
                : ['text-gray-600'];*/

            return this.member.memberInterface.member_id ===
                this.member.classLeaderInterface.member_id_leader
                ? ['text-pink-900']
                : ['text-gray-600'];
        }
        if (this.member.memberInterface.assistant_class_leaders.length >= 1) {
            //is the member id part of the his/her assistant class leader list
            //is he/she a assistant class leader in his/her own class
            /*const classLeader = this.member.memberInterface.assistant_class_leaders.find(
                ({ member_id_asst_leader }) =>
                    member_id_asst_leader ===
                    this.member.memberInterface.member_id
            );

            return typeof classLeader !== 'undefined'
                ? ['text-green-900']
                : ['text-gray-600'];*/
            return this.member.memberInterface.member_id ===
                this.member.classLeaderInterface.member_id_asst_leader
                ? ['text-green-900']
                : ['text-gray-600'];
        }

        return ['text-gray-600'];
    }
    //classes
}
