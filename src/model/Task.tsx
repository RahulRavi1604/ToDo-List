class Task {
    private id: number;
    private name: string;
    private addedToDay: boolean;
    private note: string;
    private createdDate: Date;
    private dueDate: Date;
    private reminderDate: Date;
    private completed: boolean;
    private important: boolean;
    private repeat: string;
    private listId : number;
    constructor(id : number, name : string, addedToDay : boolean, note : string, createdDate : Date, dueDate : Date,
             reminderDate : Date, completed :boolean, important : boolean, repeat : string) {
        this.id = id;
        this.name = name;
        this.addedToDay = addedToDay;
        this.note = note;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.reminderDate = reminderDate;
        this.completed = completed;
        this.important = important;
        this.repeat = repeat;
    }
    public getId(): number {
        return this.id;
    }
    public setId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public isAddedToDay(): boolean {
        return this.addedToDay;
    }
    public setAddedToDay(addedToDay: boolean) {
        this.addedToDay = addedToDay;
    }
    public getNote(): string {
        return this.note;
    }
    public setNote(note: string) {
        this.note = note;
    }
    public getCreatedDate(): Date {
        return this.createdDate;
    }
    public setCreatedDate(createdDate: Date) {
        this.createdDate = createdDate;
    }
    public getDueDate(): Date {
        return this.dueDate;
    }
    public setDueDate(dueDate: Date) {
        this.dueDate = dueDate;
    }
    public getReminderDate(): Date {
        return this.reminderDate;
    }
    public setReminderDate(reminderDate: Date) {
        this.reminderDate = reminderDate;
    }
    public isCompleted(): boolean {
        return this.completed;
    }
    public setCompleted(completed: boolean) {
        this.completed = completed;
    }
    public isImportant(): boolean {
        return this.important;
    }
    public setImportant(important: boolean) {
        this.important = important;
    }
    public getRepeat(): string {
        return this.repeat;
    }
    public setRepeat(repeat: string) {
        this.repeat = repeat;
    }
    public getListId(): number {
        return this.listId;
    }
    public setListId(): number {
        return this.listId;
    }
}
export default Task;