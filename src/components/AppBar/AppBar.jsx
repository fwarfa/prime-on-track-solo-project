import React from 'react'
import {Link} from 'react-router-dom';
import LogoutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function MyAppBar({jobHuntInfo}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((store) => store.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);

    const user = useSelector((store) => store.user);

   let currentJobHuntId = undefined;
    if (jobHuntInfo.length > 0) {
      for (let hunt of jobHuntInfo) {
        if (hunt.end_date === null) {
            currentJobHuntId = hunt.id
        }
        console.log('currentJobHuntId ', currentJobHuntId);
        break;
      }
    }
  };

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/home">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                On Track
                            </Typography>
                        </Link>
                        {user.id === null ?
                        // If there's no user, show login/registration links
                        <Link className="navLink" to="/login">
                            Login / Register
                        </Link>
                        :
                        <LogoutButton />
                        }
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <Link className="drawerLink" to="/">Home</Link>
                                <ListItemText/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <Link className="drawerLink"  to="/profile">Profile</Link>
                                <ListItemText/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><DashboardCustomizeIcon /></ListItemIcon>
                                <Link className="drawerLink" to='/home'>Dashboard</Link>
                                <ListItemText/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><InfoIcon /></ListItemIcon>
                                <Link className="drawerLink" to="/about">About</Link>
                                <ListItemText/>
                            </ListItem>
                           
                            <ListItem button>
                            {user.id === null ?
                                <Link className="drawerLink" to="/login">
                                    Login
                                </Link>
                            :
                           <LogoutButton />
                            }
                        </ListItem>
                                   
                        </List>
                    </Drawer>
                    <Main open={open}>
            <DrawerHeader />
            <Typography paragraph>
            Hi, my name is Farah
            </Typography>
            <Typography paragraph>
            I am a Software Engineer
            </Typography>
        </Main>
            </Box>
        </div>
    )
}

export default MyAppBar;
