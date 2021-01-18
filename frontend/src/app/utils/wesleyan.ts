export class Wesleyan {
    public static readonly WS_DATE_FORMATS_DATE = {
        parse: {
            //you can let the user enter any type of date with any format,
            //and the date adapter will reformat it to the format you specify in this attribute
            dateInput: 'LL',
        },
        display: {
            //input textbox
            dateInput: 'ddd, MMMM DD, YYYY',
            //month year top left
            monthYearLabel: '[Q]Q YYYY, MMM',
            //input textbox accessibility
            dateA11yLabel: 'LLL',
            //month year top left accessibility
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };
    public static readonly WS_DATE_FORMATS_DATEOFBIRTH = {
        parse: {
            //you can let the user enter any type of date with any format,
            //and the date adapter will reformat it to the format you specify in this attribute
            dateInput: 'LL',
        },
        display: {
            //input textbox
            dateInput: 'ddd, MMMM DD, YYYY',
            //month year top left
            monthYearLabel: 'YYYY, MMM',
            //input textbox accessibility
            dateA11yLabel: 'LLL',
            //month year top left accessibility
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };
    public static readonly WS_DATE_FORMATS_TITHES = {
        parse: {
            //you can let the user enter any type of date with any format,
            //and the date adapter will reformat it to the format you specify in this attribute
            dateInput: 'LL',
        },
        display: {
            //input textbox
            dateInput: 'ddd, MMMM DD, YYYY',
            //month year top left
            monthYearLabel: '[Q]Q YYYY, MMM',
            //input textbox accessibility
            dateA11yLabel: 'LLL',
            //month year top left accessibility
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };
}
