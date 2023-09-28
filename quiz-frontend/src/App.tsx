import { ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import theme from "./theme";
import AuthPage from "./content/Auth";
import { LessonPage } from "./content/Lesson/pages";
import SignInPage from "./content/Auth/sign-in";
// import SignUpPage from "./content/Auth/sign-up";
import { QueryClient, QueryClientProvider } from "react-query";
import { DashboardPage } from "./content/dashboard/pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Navigate to={"/sign-in"} />} />
            <Route path="/sign-in" Component={SignInPage} />
            {/* <Route path="/sign-up" Component={SignUpPage} /> */}
            <Route path="/home" Component={DashboardPage} />
            <Route path="/auth" Component={AuthPage} />
            <Route path="lesson/:lessonId" Component={LessonPage} />
          </Routes>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
