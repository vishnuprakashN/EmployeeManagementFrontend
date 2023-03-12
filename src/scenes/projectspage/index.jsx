import {Box, Button, Typography } from "@mui/material";
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


const ProjectsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);

    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const [myValue, setValue] = useState('') 


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
                 <Header title="PROJECTS INFORMATION" 
            
                    subtitle="Project details"/>
                </Box>
                <Box>
                <Button type="button" color="secondary" variant="contained"
                onClick={handleClickOpen}>
                    ADD EMPLOYEES
                </Button >
                </Box>

              </Box>
            {/* row 1*/}
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
              <Box
              gridColumn="span 3"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center">
                <StatBox
                    title="12,361"
                    subtitle="Total revenue"
                    progress="0.75"
                    increase="+14%"
                />
              </Box>
              <Box
              gridColumn="span 3"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center">
                <StatBox
                    title="12,361"
                    subtitle="Employee count"
                    progress="0.75"
                    increase="+14%"
                />
              </Box>
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
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Details</Typography>
                    <Button type="button" color="secondary" variant="contained"
                onClick={handleClickOpen}>
                    Edit
                </Button >
                </Box>
               
              </Box>
              {/* row 2*/ }
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
                gridRow="span 3"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
                <Box
                 padding="20px"
                >
                    

                </Box>
              </Box>
        

        </Box>
        {/* <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root":{
                    border: "none",
                },
                "& .MuiDataGrid-cell":{
                    borderBottom: "none",
                },
                "& .name-column--cell":{
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller":{
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer":{
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },  
                "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            <Button type="submit" color="secondary" variant="contained" 
             onClick={handleClickOpen}>
             ADD NEW TEAM
             </Button >
            <Dialog open={open} onClose={handleClose} maxWidth="md"
            fullWidth="true" 
            >
                <DialogTitle>CREATE TEAM</DialogTitle>
                <DialogContent >
                <DialogContentText>
                    Enter team name
                </DialogContentText>
                <TextField
                    autoFocus
                    id="name"
                    label="Team Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={myValue}
                    onChange={(e) => setValue(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleclickclose} sx={{width: 200, color:colors.grey[100],backgroundColor:colors.greenAccent[600] }}>ADD TEAM</Button>
                </DialogActions>
            </Dialog>
            <DataGrid
                rows={team}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
        </Box>  */}
    </Box>);
        
};


export default ProjectsPage;