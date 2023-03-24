import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { useGetTasksQuery } from "../features/task/tasksApi";

import Loading from "../components/ui/Loading";
import { useSelector } from "react-redux";

export default function TaskList() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { checkedArr, searchText } = useSelector((state) => state.filters);

  // console.log(tasks);
  useEffect(() => {
    console.log(checkedArr);
  }, [checkedArr]);

  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <p>{error}</p>;

  if (!isLoading && !isError && tasks?.length === 0)
    content = <h4>Somthing wrong</h4>;

  if (
    !isLoading &&
    !isError &&
    tasks?.length > 0 &&
    checkedArr?.length === 0 &&
    !searchText
  ) {
    content = <h4>Please check any project from left side</h4>;
  }

  if (
    !isLoading &&
    !isError &&
    tasks?.length > 0 &&
    checkedArr?.length > 0 &&
    !searchText
  ) {
    let filteredTasks = [];
    checkedArr.forEach((ts) =>
      tasks
        .filter((t) => t.project.projectName === ts.toString())
        .map((task) => filteredTasks.push(task))
    );

    content = filteredTasks.map((task) => (
      <TaskItem taskInfo={task} key={task?.id} />
    ));
  }

  if (
    !isLoading &&
    !isError &&
    tasks?.length > 0 &&
    checkedArr?.length > 0 &&
    searchText
  ) {
    let filteredTasks = [];
    checkedArr.forEach((ts) =>
      tasks
        .filter((t) => t.project.projectName === ts.toString())
        .map((task) => filteredTasks.push(task))
    );

    content = filteredTasks
      .filter((tsk) => tsk.taskName.toLowerCase().includes(searchText))
      .map((task) => <TaskItem taskInfo={task} key={task?.id} />);
  }

  return <div className="lws-task-list">{content}</div>;
}
