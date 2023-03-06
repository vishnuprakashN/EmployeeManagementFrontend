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
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';




const TeamsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);
    const [employee, setEmployee] = useState([]);


    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const [myValue, setValue] = useState('') 

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const handleClickOpen = () => {
        setOpen(true);
        getEmployeeData();
      };
    
    const handleClose = () => {
       
        setOpen(false)
      };

    const getEmployeeData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/employee/findAll"
            );
            console.log((await data).data);
            setEmployee((await data).data)
        }catch (e){
            console.log(e);
        }
    };
    useEffect(()=>{
        getEmployeeData()
    },[])

    const getEmployeeTeamData = async ()=>{
        try{
            const data = axios.get("http://localhost:8080/teams/findAll/employee/" + location.state.id 
            );
            console.log(location.state.id);
            console.log((await data).data);
            setTeam((await data).data)
        }catch (e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getEmployeeTeamData()
    },[])
    const columns = [
                    {field:"name", headerName:"Name", flex: 1, cellClassName: "name-column-cell"},   
]

    return (
    <Box m="20px">
        <Header title="Team" subtitle="Team information"/>
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
             ADD EMPLOYEE
             </Button >
            <Dialog open={open} onClose={handleClose} maxWidth="md"
            
            >
                <DialogTitle>ADD MEMBER TO TEAM</DialogTitle>
                <DialogContent >
                <DialogContentText marginBottom="12px">
                    Add employee to team
                </DialogContentText>
                {/* <TextField
                    autoFocus
                    id="name"
                    label="Team Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={myValue}
                    onChange={(e) => setValue(e.target.value)}
                /> */}
                <Autocomplete
                multiple
                id="employee"
                options={employee}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option,{selected})=>(
                    <li {...props} >
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}/>
                        {option.name}
                    </li>
                )}
                
                style={{width:500 }}
                // onChange={(event, value) => values.status = value} 
                renderInput={(params)=> (
                    <TextField {...params} label="Employees" placeholder="select employee"/>
                )}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} sx={{width: 200, color:colors.grey[100],backgroundColor:colors.greenAccent[600] }}>ADD TEAM</Button>
                </DialogActions>
            </Dialog>
            <DataGrid
                rows={team}
                columns={columns}
                components={{Toolbar: GridToolbar}}
            />
        </Box>
    </Box>);
        
};

export default TeamsPage;