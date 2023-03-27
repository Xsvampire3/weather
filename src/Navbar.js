import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { Cloud as CloudIcon } from "@material-ui/icons";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton edge="start" color="inherit" aria-label="home">
            <CloudIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        <Button color="inherit" component={Link} to="/searchbycity">
          Current Weather
        </Button>
        <Button color="inherit" component={Link} to="/forecast">
          Forecast
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
