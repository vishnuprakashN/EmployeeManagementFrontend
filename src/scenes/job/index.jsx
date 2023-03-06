import {Box, Typography, Button, IconButton } from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Jobs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [project, setProject] = useState([]);

    const getJobData = async () =>{

        try{
            const data = axios.get("http://localhost:8080/jobs/findAll"
            );
            console.log((await data).data);
            setProject((await data).data)
        }catch (e){
            console.log(e);
        }
    };
    useEffect(()=>{
        getJobData()
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
                    {field:"jobName", headerName:"Job Name", flex: 1, cellClassName: "name-column-cell"},   
                    {field: "ratePerHour",headerName: "RPH",flex:1, renderCell:(params) =>
                    (
                        <Typography color={colors.greenAccent[500]}>
                            ${params.row.ratePerHour}
                        </Typography>
                    )},
                    {field:"estimatedHours", headerName:"Estimated Hours", flex: 1}, 
                    {field:"loggedHours", headerName:"Logged Hours", flex: 1},     
                    {field:"startDate", headerName:"Start Date", flex: 1},
                    {field:"endDate", headerName:"End Date", flex: 1},
                    {field:"billable", headerName:"Billable", flex: 1},
                    {field:"projectName", headerName:"Project", flex: 1},
                    {field:"job_Status",
                     headerName:"Job Status",
                     flex:1,
                     renderCell: ({row: {job_Status}}) =>{
                        return(
                            <Box
                              width="80%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor={
                                job_Status === "COMPLETED"
                                ? colors.greenAccent[600]
                                : colors.redAccent[600]
                              }
                            >
                              <Typography color={colors.grey[100]} sx={{ml: "5px"}}>
                                {job_Status}
                              </Typography>
                            </Box>
                        )
                     }
                    },
                    {
                     headerName:"Action",
                     flex:1,
                     renderCell: (cellValues) =>{
                        return(
                            <Box
                              width="100%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                            >
                                <IconButton aria-label="edit">
                                <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="delete">
                                 <DeleteIcon />
                                </IconButton>
                                
                              
                            </Box>
                        )
                     }
                    }
                                             
]

    return (
    <Box m="20px">
        <Header title="Jobs" subtitle="List of Jobs form"/>

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
            navigate("/addproject")
         }} 
         >
            Create New Job
        </Button >
            <DataGrid
                rows={project}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                // onRowClick={handleRowClick}
                checkboxSelection
            />
            
        </Box>
    </Box>);
        
};

export default Jobs;