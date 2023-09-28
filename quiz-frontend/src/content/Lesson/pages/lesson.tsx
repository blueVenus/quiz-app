import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { Problem } from "../components";
import http from "../../../api";
import { AnswerPropsType, ProblemPropsType } from "../types/ProblemProps";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "100px",
    backgroundColor: "rgb(20, 26, 31)",
    minHeight: "calc(100vh - 200px)"
  },
  paper: {
    position: "relative",
    borderRadius: "10px",
    padding: "50px 100px",
    backgroundColor: "white",
    width: "800px",
    minWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  problemField: {
    "&.css-32q0xd-MuiGrid-root": {
      marginTop: "30px",
    },
  },
  submitButton: {},
}));

const LessonPage = () => {
  const classes = useStyles();

  const { lessonId } = useParams<{ lessonId: string }>();
  const [problems, setProblems] = useState<ProblemPropsType[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [answer, setAnswer] = useState<AnswerPropsType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    http
    .request({
      url: `http://localhost:8000/api/questions/${lessonId}/`,
      method: "get",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(({ data }) => {
      setProblems(data.questions);
      let tmp : AnswerPropsType[] = data.questions.map((item : ProblemPropsType) => ({
        question: item.id,
        choices: []
      }))
      setAnswer(tmp)
    })
    .catch((err) => { 
    });
  }, [lessonId])

  const [isAnyQuestionAnswered, setIsAnyQuestionAnswered] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token')

    // Assuming you have an API endpoint to submit answers and get a score
    http
      .request({
        url: "http://localhost:8000/api/submit-answers/",
        method: "post",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ answers: answer }),
      })
      .then(({ data }) => {
        setScore(data.total);
      })
      .catch((err) => { 
      });
    
  };

  const handleAnswerChange = (questionIndex: number, newAnswer: AnswerPropsType) => {
    setAnswer((prevAnswer) => {
      const res = [...prevAnswer];
      res[questionIndex] = newAnswer
      return res;
    });

    // Check if at least one question has been answered
    const isAnswered = answer.some((item : AnswerPropsType, idx) => {
      if (idx === questionIndex) {
        return item.choices.length > 0; // this is the current question being updated
      }
      return item.choices.length > 0; // the previous state for other questions
    });

    setIsAnyQuestionAnswered(isAnswered);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.paper}>
        <Typography variant="h4">{"Class" + lessonId}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            className={classes.problemField}
            container
            spacing={3}
            direction={"column"}
          >
            {problems.map((problem: ProblemPropsType, index) => (
              <Problem
                key={index}
                index={index}
                question={problem.question_text}
                choices={problem.choice}
                type={problem.is_multi}
                selectedAnswer={answer[index]}
                handleAnswerChange={handleAnswerChange}
              />
            ))}
            <Grid item alignSelf={"flex-end"}>
              <Button
                type="submit"
                variant="contained"
                disabled={!isAnyQuestionAnswered}
              >
                Submit
              </Button>
            </Grid> 
          </Grid>
        </form>
        {score !== null && (
          <Typography variant="h6">Your score: {score}</Typography>
        )}
      </Box>
    </div>
  );
};

export default LessonPage;
