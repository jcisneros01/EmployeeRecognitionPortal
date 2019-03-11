import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

function AuthHeaderBar() {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" >
            Employee Recoginition Portal
          </Typography>
        </Toolbar>
      </AppBar>
  
  );
}
export default AuthHeaderBar;

