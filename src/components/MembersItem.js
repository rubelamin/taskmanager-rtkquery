import React from "react";

export default function MembersItem({ memberInfo }) {
  const { name, avatar } = memberInfo;

  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" alt={name} />
      <p className="label">{name}</p>
    </div>
  );
}
