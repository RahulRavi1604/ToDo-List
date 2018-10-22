import { EventEmitter } from "events";
import * as Actions from "../actions/Actions";
import dispatcher from "../dispatcher/dispatcher";

import List from "../model/List"
import Task from '../model/Task';

class TodoStore extends EventEmitter {
    private store: List[] = [new List(0, "list1", 2,
        [new Task(0, "Task 11", false, "", new Date(), false, false, "")
            , new Task(1, "Task 12", false, "", new Date(), false, false, "")
        ],
        false),
    new List(1, "list2", 1,
        [new Task(0, "Task 2", false, "", new Date(), false, false, "")],
        false),
    new List(2, "list3", 0, [], false),
    new List(3, "list4", 1,
        [new Task(0, "Task 4", false, "", new Date(), false, false, "")],
        false),
    new List(4, "list5", 1,
        [new Task(0, "Task 5", false, "", new Date(), false, false, "")],
        false)
    ];

    constructor() {
        super();
    }
    public handleActions(action: any) {
        switch (action.type) {
            case Actions.ACTION_TYPES.ADD_LIST: {
                this.addNewList(action.value);
                this.emit("listAdded");
                break;
            }
            case Actions.ACTION_TYPES.ADD_TASK: {
                this.addNewTask(action.listId, action.value);
                this.emit("taskAdded");
                break;
            }
            default: {
                console.log("Undefined Event");
            }
        }
    }
    public getStore(): List[] {
        return this.store;
    }
    public setStore(store: List[]): void {
        this.store = store;
    }

    public addNewList(listName: string): List[] {
        this.store.push(new List(
            this.store.length === 0 ? 0 : this.store[this.store.length - 1].getId() + 1,
            listName, 0, [], false));
        return this.store;
    }

    public incrementNumberOfTasks(listId: number): List[] {
        this.getListById(listId).setNumberOfTasks(this.getListById(listId).getNumberOfTasks() + 1);
        return this.store;
    }
    public addNewTask(listId: number, taskName: string): Task[] {
        this.getListById(listId).getTasks().push(new Task(this.getListById(listId).getTasks().length === 0 ?
            0 : this.getListById(listId).getTasks()[this.getListById(listId).getTasks().length - 1].getId() + 1
            , taskName, false, "", new Date(), false, false, ""));
        this.incrementNumberOfTasks(listId);
        return this.getListById(listId).getTasks();
    }
    public renameList(listId: number, newListName: string): List[] {
        if (listId > 0) {
            this.getListById(listId).setName(newListName);
        }
        return this.store;
    }
    public renameTask(listId: number, taskId: number, newTaskName: string) {
        this.getTaskById(listId, taskId).setName(newTaskName);
        return this.store;
    }
    public getActiveListIndex() {
        let id = null;
        this.store.forEach(list => {
            if (list.isActive()) {
                id = list.getId();
            }
        });
        return id;
    }
    public setActiveList(listIndex: number) {
        this.store.forEach(list => {
            if (list.getId() === listIndex) {
                list.setActive(true);
            } else {
                list.setActive(false);
            }
        });
    }
    public setActiveTask(taskIndex: number) {
        this.store.forEach(list => {
            list.getTasks().forEach(task => {
                if (task.getId() === taskIndex) {
                    task.setActive(true);
                } else {
                    task.setActive(false);
                }
            });
        });
    }
    public toggleTaskCompleted(listId: number, taskId: number) {
        this.getTaskById(listId, taskId).setCompleted(
            !this.getTaskById(listId, taskId).isCompleted()
        );
        return this.store;
    }
    public toggleTaskImportant(listId: number, taskId: number) {
        this.getTaskById(listId, taskId).setImportant(
            !this.getTaskById(listId, taskId).isImportant()
        );
        return this.store;
    }
    public toggleAddToDay(listId: number, taskId: number) {
        this.getTaskById(listId, taskId).setAddedToDay(
            !this.getTaskById(listId, taskId).isAddedToDay()
        );
        return this.store;
    }
    public updateDueDate = (listId: number, taskId: number, inputDate: Date): List[] => {
        this.getTaskById(listId, taskId).setDueDate(inputDate);
        return this.store;
    }
    public updateReminder = (listId: number, taskId: number, inputDate: Date): List[] => {
        this.getTaskById(listId, taskId).setReminderDate(inputDate);
        return this.store;
    }
    public updateRepeat = (listId: number, taskId: number, inputValue: string): List[] => {
        this.getTaskById(listId, taskId).setRepeat(inputValue);
        return this.store;
    }
    public updateNote = (listId: number, taskId: number, inputValue: string): List[] => {
        this.getTaskById(listId, taskId).setNote(inputValue);
        return this.store;
    }
    public deleteList = (listId: number): void => {
        if (listId > 0) {
            this.store.splice(listId, 1);
        }
    }
    public deleteTask = (listId: number, taskId: number): void => {
        this.getListById(listId).getTasks().splice(taskId, 1);
    }
    public getListById = (listId: number): any => {
        let resultList;
        this.store.forEach((list) => {
            if (listId === list.getId()) {
                resultList = list;
            }
        });
        return resultList;
    }
    public getTaskById = (listId: number, taskId: number): any => {
        let resultTask;
        this.getListById(listId).getTasks().forEach((task: Task) => {
            if (taskId === task.getId()) {
                resultTask = task;
            }
        });
        return resultTask;
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;
