import { Copyright } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../../api";
import { LessonPropsType } from "../types";

const useStyles: any = makeStyles((theme: Theme) => ({
  header: {
    paddingTop: "50px",
    height: "30vh",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #B7410E 0%, #D86239 26%, #FF8B28 100%)",
  },
  main: {
    paddingTop: "100px",
    paddingBottom: "100px"
  },
  lessons: {
    "&.css-honmcm-MuiGrid-root": {
      marginTop: "30px"
    }
  },
  cardAction: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&.css-bhp9pd-MuiPaper-root-MuiCard-root": {
      backgroundColor: theme.palette.secondary.main,
      color: "white"
    },
    "& .css-1oitmrd-MuiButtonBase-root-MuiCardActionArea-root:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  cardContent: {
    "&.css-46bh2p-MuiCardContent-root": {
      padding: "30px 10px"
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  lessonDescription: {
    "&.css-1uwgr7b-MuiTypography-root": {
      marginTop: "20px"
    }
  },
  footer: {
    padding: "50px"
  }
}));

const DashboardPage = () => {

  const navigate = useNavigate();
  

  const [lessons, setLessons] = useState<LessonPropsType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    http
      .request({
        url: "http://localhost:8000/api/lessons/",
        method: "get",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        setLessons(data);
      })
      .catch((err) => { 
      });
  }, [])
  const classes = useStyles();

  const handleClick = (id: any) => {
    navigate(`/lesson/${id}`);
  }

  return (
    <>
      <Box className={classes.header}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Welcome To Our Classroom
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            You can have lessons in this class
          </Typography>
        </Container>
      </Box>
      <Container className={classes.main}>
        <Typography component="h1" variant="h3" align="center">
          Our lessons
        </Typography>
        {/* End hero unit */}
        <Grid className={classes.lessons} container spacing={6}>
          {lessons.map((lesson: LessonPropsType) => (
            <Grid item key={lesson.id} sx={{ flexGrow: 1, ml: 10, mr: 10 }}>
              <Card className={classes.cardAction} onClick={() => handleClick(lesson.id)}>
                <CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Typography align="center" variant="h2">{"Class " + lesson.number}</Typography>
                    <Typography align="center" variant="body1" className={classes.lessonDescription}>{lesson.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Box className={classes.footer} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
};

export default DashboardPage;
