
const apiHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const fetchSurveyChannels = async (
  token: string,
  apiURL: string,
  surveyId: number | string
) => {
   let channels: Array<{}> = []
  try {
      const data = (
        await fetch(
          `${apiURL}/v3/channels?survey_id=${surveyId}`,
          apiHeader(token)
        )
      ).json();
      const response = await data;
      channels = response.data.map((item:any, id:any) => ({
        label: item.name,
        value: item.id,
        type: item.type,
        id
      }));
    return channels;
  } catch (error) {
    console.error(error);
  }
  return channels;
};
