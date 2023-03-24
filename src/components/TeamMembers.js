import React from "react";
import MembersItem from "./MembersItem";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import Loading from "./ui/Loading";

export default function TeamMembers() {
  const { data: teams, isLoading, isError, error } = useGetTeamsQuery();

  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <p>{error}</p>;

  if (!isLoading && !isError && teams?.length === 0)
    content = <h4>Somthing wrong</h4>;

  if (!isLoading && !isError && teams?.length > 0) {
    content = teams.map((member) => (
      <MembersItem memberInfo={member} key={member.id} />
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
