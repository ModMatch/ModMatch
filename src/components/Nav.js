import React, { useState } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ClickAwayListener, Button, Box, InputBase, Icon, Typography } from '@mui/material';
import Notifications from './Notification/Notifications';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
}));

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  flex: 1,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledButton = styled(Button)(({ theme}) => ({
  color: 'inherit',
  '&:hover': {
    color: theme.palette.grey.A200,      
    }
}))

function Nav(props) {
  
  const navigate = useNavigate()

  const[query, setQuery] = useState("")
  const[showNotif, setShowNotif] = useState(false)

  const onQuery = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
      navigate({
        pathname: `/search`,
        search: `?${createSearchParams({q: query})}`});
      navigate(0);

  }
  
  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate(0);
  }

  return (
    <Box display="flex" sx={{ flex: 1, width: "auto", marign: "auto"}}>
    <AppBar position="fixed">
      <Toolbar sx={{
          display: "grid",
          gridTemplateColumns: '1fr 2fr 1fr'
          }}>
        <Box sx={{
            display: 'flex',
            alignItems: "center",
          }}>
          <ClickAwayListener onClickAway={() => setShowNotif(false)}>
            <Box>
              <Notifications userid={props.userid}/>
            </Box>
          </ClickAwayListener>
        </Box>
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center"
          }}>
          <StyledButton 
            component={Link} 
            to="/home"  
          >
            <Typography>Home</Typography>
          </StyledButton>
          <StyledButton 
            component={Link} 
            to="/groups" 
          >
            <Typography>Groups</Typography>
          </StyledButton>
          <Box>
            <Search onSubmit={onSubmit}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={onQuery}
                />
                <input type="submit" hidden/>
            </Search>
          </Box>
        </Box>

        <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
          }}>
          <StyledButton 
            component={Link} 
            to={props.profileUrl}
          >
            <Typography>Profile</Typography>
          </StyledButton>
          <StyledButton 
            component={Link} 
            to="/" 
            onClick={logout} 
          >
            <Typography>Logout</Typography>
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
  
}

export default Nav;
