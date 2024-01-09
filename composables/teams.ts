export const useTeams = async () => {
  return useAsyncData(
    "teams",
    () =>
      $fetch("/api/teams/list", {
        headers: decorateHeaders(),
      }),
    {
      default() {
        return [];
      },
    }
  );
};

export const useTeam = async (teamId: string) => {
  return useAsyncData(
    "team-" + teamId,
    () =>
      $fetch("/api/teams/get", {
        query: { teamId },
        headers: decorateHeaders(),
      }),
    {
      default() {
        return emptyTeam();
      },
    }
  );
};