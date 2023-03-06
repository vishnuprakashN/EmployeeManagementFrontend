import {Box, Typography, Button } from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import Header from "../../components/Header";
import { color } from "@mui/system";
import {useTheme} from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import ProjectsPage from "../projectspage/index";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Designation = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [designation, setDesignation] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [myValue, setValue] = useState('') 

    const getDesignationData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/designation/findAll"
            );
            console.log((await data).data);
            setDesignation((await data).data)
        }catch (e){
            console.log(e);
        }
    };

    useEffect(()=>{
        getDesignationData()
    },[])

    const setDesignationData = async (values) =>{

        try{
            axios.post("http://localhost:8080/designation/add",values)
            .then(function (response) {
                console.log(response);
              });
        
        }catch (e){
            console.log(e);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleclickclose = ()=>{
        console.log(myValue);
        const name = {
            designationName: myValue
        }
        setDesignationData(name)
        handleClose()
        window.location.reload(false);
        handleClose()
    }
    
    const handleClose = () => {
       
        setOpen(false)
      };
    
    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate("/designationspage", {
            state: {
              id: params.row.id
            }
          });
        console.log(params.row.id)
    
    };

    const columns = [{field: "id", headerName: "ID", flex:0.5},
                    {field:"name", headerName:"Name", flex: 1, cellClassName: "name-column-cell"},     
                                             
]

    return (
    <Box m="20px">
        <Header title="DESIGNATION" subtitle="List of Designation"/>

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
             ADD NEW DESIGNATION
             </Button >
            <Dialog open={open} onClose={handleClose} maxWidth="md"
            fullWidth="true" 
            >
                <DialogTitle>CREATE DESIGNATION</DialogTitle>
                <DialogContent >
                <DialogContentText>
                    Enter designation name
                </DialogContentText>
                <TextField
                    autoFocus
                    id="name"
                    label="Designation Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={myValue}
                    onChange={(e) => setValue(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleclickclose} sx={{width: 200, color:colors.grey[100],backgroundColor:colors.greenAccent[600] }}>ADD DESIGNATION</Button>
                </DialogActions>
            </Dialog>

            <DataGrid
                rows={designation}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
            
        </Box>
    </Box>);
        
};

export default Designation;