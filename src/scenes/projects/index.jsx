import {Box, Typography, Button,IconButton } from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import Header from "../../components/Header";
import { color } from "@mui/system";
import {useTheme} from "@mui/material";
import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import {useNavigate,generatePath, Link} from 'react-router-dom';
import ProjectsPage from "../projectspage/index";
import AddTeam from "./addTeam";
import Axios from "axios"
import CancelIcon from '@mui/icons-material/Cancel';

const Projects = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [project, setProject] = useState([]);
    const[modalTeam,setModalTeam] = useState()
    const [openAddTeam,setOpenAddTeam] = useState(false)
    const[team,setTeam] = useState([])

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
        navigate("/addTeam", {
            state: {
              id: params
            }
          });
        console.log(params)
    
    };
    const handleAddTeam = async (id) => {
        console.log(id)
            const { data } = await Axios.get(
              `http://192.168.100.121:8080/teams/findAll/${id}`
            );
            const team = data;
            setTeam(team);
            setOpenAddTeam(true)
            console.log(team);

          };

    const handleDelete = async (id) => {
        console.log(id)
    if (window.confirm("Are you sure?")) {
        const {data} = await Axios.delete(
            `http://192.168.100.121:8080/teams/delete/${id}`
        )
        const team = data;
        setTeam(team.filter((item) => item.id !== id));
        console.log(team)
  }
    }


    const columns = [{field:"id", headerName: "ID", flex:0.5},
                    {field:"projectName", headerName:"Name", flex: 1, cellClassName: "name-column-cell"},   
                    {field:"projectType", headerName:"Type", flex: 1},   
                    {field:"projectDescription", headerName:"Description", flex: 1, cellClassName: "name-column-cell"},
                    {field:"clientName", headerName:"Client Name", flex: 1},
                    {field:"clientAddress", headerName:"Client Adddress", flex: 1},
                    {field:"projectStatus",
                     headerName:"Project Status",
                     flex:1,
                     renderCell: ({row: {projectStatus}}) =>{
                        return(
                            <Box
                              width="60%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor={
                                projectStatus === "COMPLETED"
                                ? colors.greenAccent[600]
                                : colors.redAccent[600]
                              }
                            >
                              <Typography color={colors.grey[100]} sx={{ml: "5px"}}>
                                {projectStatus}
                              </Typography>
                            </Box>
                        )
                     }
                    },
                    {headerName:"Action",
                    renderCell:({row: id})=> {
                            console.log(id)
                        return(
                            <>
                            <Button variant="contained" onClick={()=>handleRowClick(id)}>Add Team</Button>
                           </>
                        )
                    }}                                            
]
const addTeam = () => {
    navigate("/addTeam")
}
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
                 <Header title="PROJECTS LIST" 
            
                    subtitle="Projects Data"/>
                </Box>
                <Box>
                <Button type="button" color="secondary" variant="contained" onClick={() => {
            navigate("/addproject")
         }}
                    >
                    ADD PROJECT
                </Button >
                </Box>

              </Box>
           {/*  <Box
                gridColumn="span 3"
                gridRow="span 4"
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
                    >Team Details</Typography>
                </Box>
                <Box
                padding="20px"
                >
                    {openAddTeam && (
                        <>
                         {team.map((item) => {
              return (
                <Box
                  gridRow="span 2"
                  backgroundColor={colors.navbar[100]}
                  display="flex"
                  alignItems="center"
                  borderRadius="10px"
                  justifyContent="flex-start"
                  sx={{
                    '&:hover': {
                      boxShadow: 3,
                    }
                  }}
                >
                  <Box>
                  <IconButton style={{bottom:"110px",marginRight:"2px",height:"100%"}} onClick={()=>handleDelete(item.id)}>
                    <CancelIcon sx={{color:"red"}} />
                   </IconButton>
                    <img
                      alt="profile-user"
                      width="98px"
                      height="98px"
                      src={require('../../assets/rosee.jpg')}
                      style={{ cursor: "pointer", borderRadius: "50%", margin: "15px" }} /></Box>
                  <Box>
                    <Typography
                      varient="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      fontSize="17px"
                      sx={{ m: "0 0 0 0" }}
                    >{item.teamName}</Typography>
                    <Typography varient="h5" color={colors.greenAccent[500]}>
                      {item.designation}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
                        </>
                    )}
                </Box>
          </Box> */}

              <Box
                gridColumn="span 12"
                gridRow="span 4"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
              <Box
                padding="10px"
              >
                <Box
            m="0px 0 0 0"
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
                    backgroundColor: colors.navbar[100],
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
           {/*  <Button type="submit" color="secondary" variant="contained" 
        
        onClick={() => {
            navigate("/addproject")
         }}>
            Create New Project
        </Button >  */ }
            <DataGrid
                rows={project}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                getRowId={(rows) => rows.id}
            />
        </Box>
              </Box>
            </Box>
    </Box>
    </Box>);
        
};

export default Projects;