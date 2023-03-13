import {Box, Button, Select, Typography,FormControl,MenuItem,InputLabel} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import Header from "../../components/Header";
import { color } from "@mui/system";
import {useTheme} from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom';
import StatBox from "../../components/StatBox";
import ProfileListView from "./profileListView";


const Profile2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);
    const [employeeView,setEmployeeView] = useState("")
    const [openEmployeeList,setOpenEmployeeList] = useState(false)
    const [openProfileList,setOpenProfileList] = useState(false)

    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const [myValue, setValue] = useState('') 
    const handleEmployeeView = (event) => {
        setEmployeeView(event.target.value)
    }
    const handleEmployeeDashboard = () => {
      setOpenEmployeeList(true)
      setOpenProfileList(false)
    }
    const handleProfileList = () => {
      setOpenProfileList(true)
      setOpenEmployeeList(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
       
        setOpen(false)
      };
    const navigate = useNavigate();


      const handleRowClick = (params) => {
        navigate("/teamspage", {
            state: {
              id: params.row.id
            }
          });
        console.log(params.row.id)
    
    };

    const handleclickclose = ()=>{
        console.log(myValue);
        const name = {
            name: myValue,
            project_id: location.state.id
        }
        setTeamsData(name)
        handleClose()
        window.location.reload(false);
        handleClose()
    }


    const setTeamsData = async (values) =>{

        try{
            axios.post("http://localhost:8080/teams/add",values)
            .then(function (response) {
                console.log(response);
              });
        
        }catch (e){
            console.log(e);
        }
    };


    const getTeamData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/project/findAll/teams/" + location.state.id
            );
            console.log((await data).data);
            setTeam((await data).data)
        }catch (e){
            console.log(e);
        }
    };
    useEffect(()=>{
        getTeamData()
    },[])
    
    const columns = [
                    {field:"name", headerName:"Teams", flex: 1, cellClassName: "name-column-cell"},   
                    {field:"project", headerName: "Project", type: "number",headerAlign:"left",align:"left",},
                              
]
    return (
    <Box m="20px">
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
        >
            <Box
              gridColumn="span 12"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              padding="20px 20px 20px 20px"
              justifyContent="space-between">
                <Box paddingTop="20px">
                 <Header title="Employee Information" />
                 <Box width={"50%"} marginBottom={"8%"}>
                 <FormControl fullWidth>
  <InputLabel>Employee View</InputLabel>
  <Select
    label="Employee View" onChange={handleEmployeeView} sx={{borderRadius:"10px",border:0}}
  >
    <MenuItem value={"Employee Dashboard"} onClick={handleEmployeeDashboard}>Employee Dashboard</MenuItem>
    <MenuItem value={"Profile List"} onClick={handleProfileList}>Profile List</MenuItem>
  </Select>
</FormControl>
</Box>
                </Box>
                <Box>
                <Button type="button" color="secondary" variant="contained" onClick={() => {
            navigate("/userProfilePage")
         }}
                >
                    ADD EMPLOYEES
                </Button >
                </Box>
              </Box>
            {/* row 1*/}
           {/* <Box
              gridColumn="span 3"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center">
                <StatBox
                    title="246 H"
                    subtitle="Logged Hours"
                    progress="0.75"
                    increase="+14%"
                />
        </Box> */}
     <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Details</Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 9"
                gridRow="span 4"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
              <Box
                padding="10px"
              >
                <Box
                m="0 0 0 0"
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border: "none",
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom: "none",
                    },
                    "& .name-column--cell":{
                        color: colors.navbar[100]
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors.navbar[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller":{
                        backgroundColor: colors.navbar[300],
                    },
                    "& .MuiDataGrid-footerContainer":{
                        borderTop: "none",
                        backgroundColor: colors.navbar[100],
                    },  
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color: `${colors.grey[100]} !important`,
                    },
                }}
                     >
                <DataGrid
                rows={team}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
        </Box> 
                </Box>
              </Box>
              <Box
              gridColumn="span 3"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center">
                <StatBox
                    title="246 H"
                    subtitle="Logged Hours"
                    progress="0.75"
                    increase="+14%"
                />
    </Box>
    {openProfileList  && (
      <>
      {navigate("/employee/profilelistview")}
      </>
    )}
{openEmployeeList && (
  <>
              <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Details</Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 9"
                gridRow="span 4"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
              <Box
                padding="10px"
              >
                <Box
                m="0 0 0 0"
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border: "none",
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom: "none",
                    },
                    "& .name-column--cell":{
                        color: colors.navbar[100]
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors.navbar[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller":{
                        backgroundColor: colors.navbar[300],
                    },
                    "& .MuiDataGrid-footerContainer":{
                        borderTop: "none",
                        backgroundColor: colors.navbar[100],
                    },  
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color: `${colors.grey[100]} !important`,
                    },
                }}
                     >
                <DataGrid
                rows={team}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
        </Box> 
                </Box>
              </Box>
              <Box
              gridColumn="span 3"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center">
                <StatBox
                    title="246 H"
                    subtitle="Logged Hours"
                    progress="0.75"
                    increase="+14%"
                />
    </Box>
    </>
)}

        </Box>
    </Box>);
        
};


export default Profile2;