import { useDispatch } from "react-redux";
import {
  CreateTeam,
  DeleteTeam,
  EditTeam,
  listTeams,
  Team,
} from "services/Teams/team.service";
import { getAllTeams } from "store/reducers/teams.reducer";

export const TeamsFunction = () => {
  const dispatch = useDispatch();

  const ListAllTeams = async (params: string = ""): Promise<void> => {
    try {
      const res = await listTeams(params);
      if (!res) throw new Error("Failed to get teams");

      dispatch(getAllTeams(res.result));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const postTeam = async (teamData: Team): Promise<void> => {
    try {
      const res = await CreateTeam(teamData);
      if (!res) throw new Error("Failed to get teams");

      ListAllTeams();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const putTeam = async (teamData: Team): Promise<void> => {
    try {
      const res = await EditTeam(teamData);
      if (!res) throw new Error("Failed to Update team");

      ListAllTeams();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteTeam = async (id_team: string): Promise<void> => {
    try {
      const res = await DeleteTeam(id_team);
      if (!res) throw new Error("Failed to delete team");

      ListAllTeams();
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  return { ListAllTeams, postTeam, putTeam, deleteTeam };
};
