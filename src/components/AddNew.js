import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useAddTaskMutation } from "../features/task/tasksApi";
import { useGetTeamsQuery } from "../features/teams/teamsApi";

export default function AddNew() {
  const { data: teams } = useGetTeamsQuery();
  const { data: projects } = useGetProjectsQuery();
  const [addTask, { isSuccess: addedSuccess }] = useAddTaskMutation();

  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState({});
  const [project, setProject] = useState({});
  const [deadline, setDeadLine] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(taskName, teamMember, project, deadline);
    addTask({
      taskName,
      teamMember,
      project,
      deadline,
      status: "pending",
    });
  };

  useEffect(() => {
    if (addedSuccess) {
      navigate("/");
    }
  }, [addedSuccess, navigate]);

  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Create Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label htmlFor="lws-taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="lws-taskName"
              required
              placeholder="Implement RTK Query"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="fieldContainer">
            <label>Assign To</label>
            <select
              name="teamMember"
              id="lws-teamMember"
              required
              value={teamMember}
              onChange={(e) => setTeamMember(JSON.parse(e.target.value))}
            >
              <option value={teamMember}>
                {teamMember?.name ? teamMember.name : "Select Member"}
              </option>
              {teams?.length > 0 &&
                teams.map((team) => (
                  <option value={JSON.stringify(team)} key={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="fieldContainer">
            <label htmlFor="lws-projectName">Project Name</label>
            <select
              id="lws-projectName"
              name="projectName"
              required
              value={project}
              onChange={(e) => setProject(JSON.parse(e.target.value))}
            >
              <option value={project}>
                {project?.projectName ? project.projectName : "Select Project"}
              </option>
              {projects?.length > 0 &&
                projects.map((proj) => (
                  <option value={JSON.stringify(proj)} key={proj.id}>
                    {proj.projectName}
                  </option>
                ))}
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-deadline"
              required
              value={deadline}
              onChange={(e) => setDeadLine(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button type="submit" className="lws-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
