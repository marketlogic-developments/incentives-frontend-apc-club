import { API } from "services/connectapi.service";
import {
  GenericalPromise,
  HandleError,
  MultipleElements,
  PaginatedElements,
} from "services/generical.service";
import { CurrentUser } from "services/User/user.service";

export interface Team {
  id: string;
  name: string;
  description: string;
  users_teams: userTeams[];
}

interface userTeams {
  user: CurrentUser;
  percentage: number;
}

export const listTeams = async (params: string) => {
  try {
    const response = await API.get<PaginatedElements<Team>>(
      `organizations/adobe/partnet/connection/club/teams?${params}`
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const CreateTeam = async (teamData: Team) => {
  try {
    const response = await API.post<GenericalPromise<Team>>(
      `organizations/adobe/partnet/connection/club/teams`,
      teamData
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};
export const EditTeam = async (teamData: Team) => {
  const { id, ...data } = teamData;

  try {
    const response = await API.put<GenericalPromise<Team>>(
      `organizations/adobe/partnet/connection/club/teams?id=${teamData.id}`,
      data
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};
export const DeleteTeam = async (teamDataId: string) => {
  try {
    const response = await API.delete<GenericalPromise<Team>>(
      `organizations/adobe/partnet/connection/club/teams?id=${teamDataId}`
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};
