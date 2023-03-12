import {useState} from "react";
import { ProSidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import {Box, IconButton, Typography, useTheme } from '@mui/material';
import {Link} from "react-router-dom";
import {tokens} from "../../theme";
import InputBase from "@mui/material/InputBase";
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
import SearchIcon from '@mui/icons-material/Search';

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
                background: `${colors.navbar[100]} !important`
            },
            "& .pro-icon-wrapper": {
                background: `transparent !important`
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                color:`${colors.navbartext[100]}`
            },
            "& .pro-inner-item:hover":{
                color: "#007AFF !important",
            },
            "& .pro-menu-item.active":{
                borderRadius: "10px 10px 10px 10px",
                backgroundColor: "#007AFF",
                marginLeft:"10px",
                marginRight:"10px",
            },
            "& .css-1l8icbj":{
                padding: "10px"
            }
            
    }}
    
    >

        <ProSidebar 
            collapsed={isCollapsed}
        >
            <Menu iconShape="square">
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
                                <Box display="flex" justifyContent="center" alignItems="left">
                            <img
                                alt="profile-user"
                                width="50px"
                                height="50px"
                                src={require('../../assets/vishnu.jpg')}
                                style={{ cursor:"pointer", borderRadius: "50%"}}
                                />
                        </Box>
                        <Box textAlign="center" justifyContent="center">
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
                                <IconButton onClick={() =>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                    )}
                  </MenuItem>


                  {!isCollapsed&&(
                    <Box mb="20px" ml="20px" mr="20px" >
                        <Box display="flex"
                     backgroundColor={colors.primary[400]}
                     borderRadius="10px"
                         >
                            <InputBase sx={{ml:2, flex:1,padding:"6px"}} placeholder="Search"/>
                            <IconButton type="button" sx={{p:1}}>
                                
                                <SearchIcon/>
                            </IconButton>
                         </Box>
                        {/* <IconButton></IconButton> */}
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
                        color={colors.grey[100]}
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
                        color={colors.grey[100]}
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
                        color={colors.grey[100]}
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