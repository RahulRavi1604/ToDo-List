import Task from "./Task"
class List {
    private id: number;
    private name: string;
    private numberOfTasks: number;
    private tasks: Task[];
    private active: boolean;
    constructor(id: number, name: string, numberOfTasks: number, tasks: Task[], active: boolean) {
        this.id = id;
        this.name = name;
        this.numberOfTasks = numberOfTasks;
        this.tasks = tasks;
        this.active = active;
    }
    public getId(): number {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public getNumberOfTasks(): number {
        return this.numberOfTasks;
    }
    public setNumberOfTasks(numberOfTasks: number) {
        this.numberOfTasks = numberOfTasks;
    }
    public getTasks(): Task[] {
        return this.tasks;
    }
    public setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }
    public isActive(): boolean {
        return this.active;
    }
    public setActive(active: boolean) {
        this.active = active;
    }
}
export default List;