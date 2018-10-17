import List from "./List"
import Task from './Task';

const Store: List[] = [new List(1, "list1", 2,
                      [new Task(1 , "Task 11" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )
                      ,new Task(1 , "Task 12" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )
                    ],
                       false),
                       new List(2, "list2", 0,
                        [new Task(1 , "Task 2" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )],
                         false),
                       new List(3, "list3", 1, 
                       [new Task(1 , "Task 3" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )],
                        true),
                       new List(4, "list4", 4,
                        [new Task(1 , "Task 4" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )],
                         false),
                       new List(5, "list5", 3,
                        [new Task(1 , "Task 5" , false , "falalaa", new Date(), new Date(), new Date(), false, false, "" )],
                         false)
                    ];
export default Store;