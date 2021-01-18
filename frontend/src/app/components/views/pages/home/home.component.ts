import { Component, OnInit } from '@angular/core';
import { MailInterface } from 'src/app/interfaces/mail-interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor() {}

    private _mails: MailInterface[] = [];

    ngOnInit() {
        this._mails = [];
        this.placeholderMails.forEach((mail) => {
            this._mails.push({
                sender: mail.sender,
                subject: mail.subject,
                message: this.placeholderMessage,
                timeSinceReceived: mail.timeSinceReceived,
                read: false,
            });
        });
    }

    // placeholder
    private placeholderMails = [
        {
            sender: 'Ransford Arthur',
            subject: 'Crash Course',
            timeSinceReceived: '2 minutes ago',
        },
        {
            sender: 'Joe Armstrong',
            subject: 'Re: Student Discont',
            timeSinceReceived: '1 day ago',
        },
        {
            sender: 'Jane Armstrong',
            subject: 'Supplementary worksheet related to course financing',
            timeSinceReceived: '1 day ago',
        },
        {
            sender: 'Gloria Roberston',
            subject: 'Refund',
            timeSinceReceived: '2 days ago',
        },
        {
            sender: 'Pat Steward',
            subject: 'Issue with reporting',
            timeSinceReceived: '4 days ago',
        },
        {
            sender: 'Jerome Warren',
            subject: 'Email not working',
            timeSinceReceived: '4 days ago',
        },
        {
            sender: 'Gladys McCoy',
            subject: 'Do you have a student discount?',
            timeSinceReceived: '4 days ago',
        },
        {
            sender: 'George Murphy',
            subject: 'Not what i expected',
            timeSinceReceived: '1 week ago',
        },
    ];

    private placeholderMessage: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.`;
    //end  placeholder

    // getters and setters
    public get mails(): MailInterface[] {
        return this._mails;
    }

    public set mails(mails: MailInterface[]) {
        this._mails = mails;
    }
    // end getters and setters
}
