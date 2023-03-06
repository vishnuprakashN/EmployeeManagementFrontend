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

const TimeSheets = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [project, setProject] = useState([]);

    const getProjectData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/project/findAll"
            );
            console.log((await data).data);
            setProject((await data).data)
        }catch (e){
            console.log(e);
        }
    };
    useEffect(()=>{
        getProjectData()
    },[])
    
    const navigate = useNavigate();



    const handleRowClick = (params) => {
        navigate("/projectspage", {
            state: {
              id: params.row.id
            }
          });
        console.log(params.row.id)
    
    };

    const columns = [{field: "id", headerName: "ID", flex:0.5},
                    {field:"projectName", headerName:"Name", flex: 1, cellClassName: "name-column-cell"},   
                    {field: "valuation",headerName: "Valuation",flex:1, renderCell:(params) =>
                    (
                        <Typography color={colors.greenAccent[500]}>
                            ${params.row.valuation}
                        </Typography>
                    )},
                    {field:"type", headerName:"Type", flex: 1},   
                    {field:"startDate", headerName:"Start Date", flex: 1},
                    {field:"endDate", headerName:"End Date", flex: 1},
                    {field:"status",
                     headerName:"Status",
                     flex:1,
                     renderCell: ({row: {status}}) =>{
                        return(
                            <Box
                              width="60%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor={
                                status === "COMPLETED"
                                ? colors.greenAccent[600]
                                : colors.redAccent[600]
                              }
                            >
                              <Typography color={colors.grey[100]} sx={{ml: "5px"}}>
                                {status}
                              </Typography>
                            </Box>
                        )
                     }
                    }   
                                             
]

    return (
    <Box m="20px">
        <Header title="TIMESHEET" subtitle="List of TIMESHEETS"/>

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
        
        onClick={() => {
            navigate("/addtimesheet")
         }}>
            Create New Timesheet
        </Button >
            <DataGrid
                rows={project}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                onRowClick={handleRowClick}
            />
            
        </Box>
    </Box>);
        
};

export default TimeSheets;