import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AnswerPropsType, ChoicePropsType, ProblemProps } from "./ProblemProps";

const useStyles = makeStyles((theme: Theme) => ({
  answersField: {
    maxWidth: "400px",
  },
}));

const Problem = (props: ProblemProps) => {
  const {
    index,
    question,
    choices,
    type,
    handleAnswerChange,
    selectedAnswer,
  } = props;

  const classes = useStyles();

  const isMultipleChoice = type;

  const handleCheckboxChange = (choice_id: number) => {
    let newAnswer : any = selectedAnswer !== undefined ? {...selectedAnswer} : {};
    const choiceIndex = newAnswer.choices.indexOf(choice_id)
    
    if (choiceIndex === -1) {
      newAnswer.choices.push(choice_id)
    }
    else {
      newAnswer.choices.splice(choiceIndex, 1);
    }

    handleAnswerChange(index, newAnswer);
  };

  const handleRadioChange = (choice_id: number) => {
    let newAnswer : any = selectedAnswer !== undefined ? {...selectedAnswer} : {};
    newAnswer.choices = [choice_id];

    handleAnswerChange(index, newAnswer);
  };

  return (
    <Grid key={index} item>
      <Typography variant="body1">
        {index + 1}. {question}
      </Typography>
      <FormGroup>
        {choices.map((choice: ChoicePropsType) => (
          <FormControlLabel
            className={classes.answersField}
            key={choice.id}
            control={
              isMultipleChoice ? (
                <Checkbox
                  checked={
                    selectedAnswer !== undefined
                      ? selectedAnswer.choices.includes(choice.id)
                      : false
                  }
                  onChange={() => handleCheckboxChange(choice.id)}
                />
              ) : (
                <Radio
                  checked={
                    selectedAnswer !== undefined
                    ? selectedAnswer.choices.includes(choice.id)
                    : false
                  }
                  onChange={() => handleRadioChange(choice.id)}
                />
              )
            }
            label={choice.choice_text}
          />
        ))}
      </FormGroup>
    </Grid>
  );
};

export default Problem;
