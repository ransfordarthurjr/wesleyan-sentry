export class CheckboxModel {
    constructor(id: number, name: string, controlNamePrefix: string) {
        this._id = id;
        this._name = name;
        this._checked = false;
        this._formControlName = `${controlNamePrefix}${id}`;
    }

    private _id: number;
    private _name: string;
    private _checked: boolean;
    private _formControlName: string;

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get checked(): boolean {
        return this._checked;
    }

    public set checked(checked: boolean) {
        this._checked = checked;
    }

    public get formControlName(): string {
        return this._formControlName;
    }

    public set formControlName(formControlName: string) {
        this._formControlName = formControlName;
    }
}
