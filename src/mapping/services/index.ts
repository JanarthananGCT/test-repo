
const apiHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const fetchSurveyQuestions = async (
  surveySparrowURL: string,
  surveyId: number | string,
  token: string
) => {
  let hasNextPage = false,
    questions: Array<{}> = [],
    pageNo = 1;
  try {
    do {
      const data = (
        await fetch(
          `${surveySparrowURL}/v3/questions?survey_id=${surveyId}&page=${pageNo}`,
          apiHeader(token)
        )
      ).json();
      const response = await data;
      hasNextPage = response?.has_next_page ?? false;
      pageNo = pageNo + 1;
      questions = [...questions, ...(response?.data ?? [])];
    } while (hasNextPage);
    return questions;
  } catch (error) {
    console.error(error);
  }
  return questions;
};

export const fetchSurveyVariables = async (
  surveySparrowURL: string,
  surveyId: number | string,
  token: string
) => {
  let hasNextPage = false,
    variables: Array<{}> = [],
    pageNo = 1;
  try {
    do {
      const data = (
        await fetch(
          `${surveySparrowURL}/v3/variables?survey_id=${surveyId}&page=${pageNo}`,
          apiHeader(token)
        )
      ).json();
      const response = await data;
      hasNextPage = response?.has_next_page ?? false;
      pageNo = pageNo + 1;
      variables = [...variables, ...(response?.data ?? [])];
    } while (hasNextPage);
    return variables;
  } catch (error) {
    console.error(error);
  }
  return variables;
};

export const fetchContactProperties = async (
  surveySparrowURL: string,
  token: string
) => {
  let contactProperties: any[] = [];
  try {
    const data = (
      await fetch(
        `${surveySparrowURL}/v3/contact_properties`,
        apiHeader(token)
      )
    ).json();
    const contactProperties = await data;
    return contactProperties?.data;
  } catch (error) {
    console.error(error);
  }
  return contactProperties;
};

export const fetchSurveyExpression = async (
  surveySparrowURL: string,
  surveyId: number | string,
  token: string
) => {
  let hasNextPage = false,
    expressions: Array<{}> = [],
    pageNo = 1;
  try {
    do {
      const data = (
        await fetch(
          `${surveySparrowURL}/v3/expressions?survey_id=${surveyId}&page=${pageNo}`,
          apiHeader(token)
        )
      ).json();
      const response = await data;
      hasNextPage = response?.has_next_page ?? false;
      pageNo = pageNo + 1;
      expressions = [...expressions, ...(response?.data ?? [])];
    } while (hasNextPage);
    return expressions;
  } catch (error) {
    console.error(error);
  }
  return expressions;
};
