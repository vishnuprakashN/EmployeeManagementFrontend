import {useState} from "react";
import { ProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {Box, IconButton, Typography, useTheme } from '@mui/material';
import {Link} from "react-router-dom";
import {tokens} from "../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SchoolIcon from '@mui/icons-material/School';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const Item = ({title, to, icon, selected, setSelected})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <MenuItem 
            active={selected ===title}
            style={{color: colors.grey[100]}}
            onClick={()=> setSelected(title)}
            icon = {icon}    
        >
        <Typography>{title}
        </Typography>
        <Link to={to}/>
        </MenuItem>
    );
        
}


const Sidebar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (<Box sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`
            },
            "& .pro-icon-wrapper": {
                background: `transparent !important`
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important"
            },
            "& .pro-inner-item:hover":{
                color: "#868dfb !important"
            },
            "& .pro-menu-item.active":{
                color:"#6870fa !important"
            },
    }}
    
    >

        <ProSidebar 
            collapsed={isCollapsed}
        >
            <Menu iconShape="square">
                {/* Logo and menu icon*/}
                <MenuItem
                  onClick={()=> setIsCollapsed(!isCollapsed)}
                  icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                  style={{
                    margin: "10px 0 20px 0",
                    color: colors.grey[100],
                  }}>
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px">
                                <Typography varient="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() =>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                    )}
                  </MenuItem>


                  {/*User*/}
                  {!isCollapsed&&(
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={require('../../assets/vishnu.jpg')}
                                style={{ cursor:"pointer", borderRadius: "50%"}}
                                />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                varient="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{m: "10px 0 0 0"}}
                                >Vishnu prakash</Typography>
                            <Typography varient = "h5" color={colors.greenAccent[500]}>
                                SQUARESHIFT
                            </Typography>
                        </Box>
                    </Box>
                  )}


                  {/* Menu Items */}
                  <Box paddingLeft={isCollapsed ? undefined: "10%"}>
                    <Item
                      title="Dashboard"
                      to="/"
                      icon={<HomeOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                        >
                            Data</Typography>
                      
                      <Item
                      title="Designations"
                      to="/designation"
                      icon={<SchoolIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                    <Item
                      title="Departments"
                      to="/department"
                      icon={<DomainOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                       <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                        >
                            Projects</Typography>
                      <Item
                      title="Manage Projects"
                      to="/projects"
                      icon={<PeopleOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                       <Item
                      title="Jobs Scheduler"
                      to="/calendar"
                      icon={<CalendarTodayOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                      <Item
                      title="Jobs"
                      to="/jobs"
                      icon={<WorkOutlineIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                      <Item
                      title="TimeSheets"
                      to="/timesheet"
                      icon={<PendingActionsIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                      <Item
                      title="Time Logs"
                      to=""
                      icon={<PendingActionsIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                       <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{m: "15px 0 5px 20px"}}
                        >
                            Analytics</Typography>

                      <Item
                      title="Analytics"
                      to="/analytics"
                      icon={<BarChartOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />
                      <Item
                      title="Bar Chart"
                      to="/bargraph"
                      icon={<BarChartOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />

                      <Item
                      title="Line Chart"
                      to="/linechart"
                      icon={<TimelineOutlinedIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                      />

                  </Box>
            </Menu>
        </ProSidebar>

    </Box>
    );
};


export default Sidebar;