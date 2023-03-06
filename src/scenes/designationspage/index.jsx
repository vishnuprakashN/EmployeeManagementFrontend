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
import {useNavigate} from 'react-router-dom';



const DesignationsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [designation, setDesignation] = useState([]);

    const location = useLocation();

    const navigate = useNavigate();

      const handleRowClick = (params) => {
        navigate("/teamspage", {
            state: {
              id: params.row.id
            }
          });
        console.log(params.row.id)
    
    };

    const getEmployeeData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/employee/findAll?id="+ location.state.id +"&entity=DES"
            );
            console.log((await data).data);
            setDesignation((await data).data)
        }catch (e){
            console.log(e);
        }
    };

    useEffect(()=>{
        getEmployeeData()
    },[])
    
    const columns = [
                    {field:"name", headerName:"Names", flex: 1, cellClassName: "name-column-cell"},   
                              
]


    return (
    <Box m="20px">
        <Header title="EMPLOYEES LIST" subtitle="Employees with designation"/>
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
            
            <DataGrid
                rows={designation}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
        </Box>
    </Box>);
        
};


export default DesignationsPage;