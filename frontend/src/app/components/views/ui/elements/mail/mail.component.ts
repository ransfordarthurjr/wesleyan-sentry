import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MailInterface } from 'src/app/interfaces/mail-interface';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit, AfterViewInit {
    constructor() {}

    @Input() email!: MailInterface;
    @Input() index!: number;

    // life cycle methods
    ngOnInit(): void {
        this.email.read = !this.isPrime(this.index);
    }

    ngAfterViewInit(): void {}
    // end life cycle methods

    isRead(): string[] {
        if (this.email.read) {
            return ['border-transparent'];
        }

        // unread emails blue border accent
        return ['border-blue-600'];
    }

    isPrime(num: number): boolean {
        const absNumber: number = Math.abs(num);
        if (absNumber === 0 || absNumber === 1) {
            return false;
        } else if (absNumber === 2) {
            return true;
        } else {
            for (let i = 2; i < absNumber; ++i) {
                if (absNumber % i === 0) {
                    return false;
                }
            }

            return true;
        }
    }

    // getters and setters
    // end getters and setters
}
