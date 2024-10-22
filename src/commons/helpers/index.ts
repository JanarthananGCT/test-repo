import { ResultGroupDataOptionsType, ResultGroupDataType } from "../../mapping/types";

export const handleMappingOptions = (
  mappingType: string,
  surveyQuestions: Array<any>,
  contactProperties: Array<any>,
  surveyVariables: Array<any>,
  expressions: Array<any>
) => {
  let currentOption;
  switch (mappingType) {
    case "QUESTION":
      currentOption = handleQuestionOptions(surveyQuestions);
      break;
    case "CONTACT":
      currentOption = contactProperties.map((contact) => ({
        label: contact.label,
        value: contact.name
      }));
      break;
    case "VARIABLE":
      currentOption = surveyVariables.map((varibles) => ({
        label: varibles.label,
        value: varibles.id
      }));
      break;
    case "EXPRESSION":
      currentOption = expressions.map((expression) => ({
        label: expression.name,
        value: expression.id
      }));
      break;
    default:
      currentOption = [];
  }

  return currentOption;
};

const handleQuestionOptions = (surveyQuestions: Array<any>) => {
  const data = surveyQuestions.map((val) => {
    const value = surveyQuestions.find((a) => a.id === val.parent_question_id);
    if (val.parent_question_id && !!value && !!value?.rtxt) {
      return {
        label: value?.rtxt,
        options: [
          {
            label: val?.rtxt,
            value: val?.id,
            parentQuestionId: value?.id,
            type: val?.type
          }
        ],
        id: value?.id
      };
    } else {
      return { ...val };
    }
  });
  const groupedData = data.reduce((result, item) => {
    const existingGroup = result.find((group: ResultGroupDataType) => group.label === item.label);

    if (existingGroup) {
      existingGroup.options.push(...(item.options || []));
    } else if (item.label) {
      result.push({
        label: item.label,
        options: item.options || []
      });
    }

    return result;
  }, []);

  // Extract other data
  const updatedData = data?.filter((question) => {
    if (!groupedData.some((data: ResultGroupDataType) => data.label === question.rtxt)) {
      return question;
    }
  });

  const filteredData = updatedData
    ?.filter((item) => !item.label)
    .map((question) => ({
      label: !!question.rtxt?.length  ? question.rtxt  :'Please enter your question',
      value: question.id,
      questionType: question.type
    }));

  const formattedData = [
    ...filteredData,
    ...groupedData.map((data: ResultGroupDataType) => ({
      ...data,
      options: data.options
        .map((option: ResultGroupDataOptionsType) => ({
          ...option,
          label: `- ${option.label}`
        }))
    }))
  ];
  return formattedData;
};
