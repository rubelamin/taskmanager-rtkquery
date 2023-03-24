import React from "react";
import ProjectList from "./ProjectList";
import TeamMembers from "./TeamMembers";

export default function SideBar() {
  return (
    <div className="sidebar">
      <ProjectList />

      <TeamMembers />
    </div>
  );
}
