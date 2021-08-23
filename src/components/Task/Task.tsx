import {ChangeEvent, FC, useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import CheckboxWrapper from "../CheckboxWrapper/CheckboxWrapper";
import CrossIcon from "../CrossIcon/CrossIcon";
import classes from "./Task.module.scss";
import { updateTask } from "../../redux/actions/tasks/action";
import iconCheck from "./Icon/icon-check.svg";

const Task: FC<{
    id: string,
    task: string,
    active: boolean
}>= (props) => {

    const dispatch = useDispatch();
    const {color} = useSelector((store: any) => store.theme);
    const {tasks} = useSelector((store: any) => store);
    const [idTask, setIdTask] = useState<string>("");
    const [activeTask, setActiveTask] = useState<boolean>(props.active);

    const completeTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setActiveTask(currentState => !currentState);
        setIdTask(e.target.id);
    }

    useEffect(() => {
        const [taskToUpdate] = tasks.filter((task:{id: string, task:string, active:boolean}) => {
            if(task.id === idTask){
                task.active = activeTask;
            }
            return task.id === idTask
        });

        if(taskToUpdate){
            dispatch(updateTask(tasks));
        }

    },[idTask, tasks, dispatch,activeTask]);

    let classIconCheck = classes["task__icon-check"];
    classIconCheck += !activeTask?` ${classes["task__icon-check--completed"]}`:"";

    let classTaskText = classes["task__text"];
    classTaskText += !activeTask?` ${classes["task__text--completed"]}`:"";


    return(
        <div className={`${classes.task} ${classes[`task--${color}`]}`}>
            <label htmlFor={props.id}>
                <CheckboxWrapper active={activeTask}>
                    <input type="checkbox" id={props.id} className={classes["task__checkbox"]} onChange={completeTaskHandler}/>
                    <img src={iconCheck} alt="icon check" className={classIconCheck}/>
                </CheckboxWrapper>
            </label>
            <label htmlFor={props.id} className={classTaskText} data-id={props.id}>
                {props.task}
            </label>
            <CrossIcon/>
        </div>
    )
}

export default Task;