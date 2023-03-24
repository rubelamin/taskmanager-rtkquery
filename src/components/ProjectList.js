import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { projectArr } from "../features/filter/filterSlice";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import ProjectListItem from "./ProjectListItem";
import Loading from "./ui/Loading";

export default function ProjectList() {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const [projectChecked, setProjectChecked] = useState("");

  useEffect(() => {
    if (!isLoading && !isError) {
      projects.forEach((proj) => dispatch(projectArr(proj.projectName)));
    }
  }, [dispatch, isError, isLoading, projects]);

  useEffect(() => {
    if (projectChecked) {
      dispatch(projectArr(projectChecked));
    }
    return () => {
      setProjectChecked("");
    };
  }, [dispatch, projectChecked]);

  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <p>{error}</p>;

  if (!isLoading && !isError && projects?.length === 0)
    content = <h4>Somthing wrong</h4>;

  if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <ProjectListItem
        projectInfo={project}
        key={project.id}
        checkFn={setProjectChecked}
      />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
