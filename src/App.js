import Weather from "./CurrentWeather";
import "./styles.css";
import ForecastPage from "./ForecastWeather";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0047AB"
    },
    secondary: {
      main: "#EF6C00"
    }
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 16
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#EFEFEF", minHeight: "100vh" }}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchbycity" element={<Weather />} />
              <Route path="/forecast" element={<ForecastPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
