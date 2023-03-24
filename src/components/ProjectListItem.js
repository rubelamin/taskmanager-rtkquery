import React, { useState } from "react";

export default function ProjectListItem({ projectInfo, checkFn }) {
  const { projectName, colorClass } = projectInfo;

  const [checking, setChecking] = useState(true);

  const handleCheck = (etarget, proName) => {
    setChecking(!checking);
    checkFn(proName);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        checked={checking}
        onChange={(e) => handleCheck(e.target.checked, projectName)}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}
