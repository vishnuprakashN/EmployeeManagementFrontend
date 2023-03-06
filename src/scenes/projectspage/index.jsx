import {Box, Button } from "@mui/material";
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
        <Header title="PROJECTS INFORMATION" subtitle="Project details"/>
        <Box
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
        </Box>
    </Box>);
        
};


export default ProjectsPage;