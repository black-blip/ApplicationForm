import "./App.css";
import ApplicationForm from "./ApplicationForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <ApplicationForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
