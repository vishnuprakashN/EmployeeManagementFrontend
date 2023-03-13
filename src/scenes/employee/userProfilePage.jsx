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


const UserProfilePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);
    const [openBasicInfo,setBasicInfo] = useState(false)

    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const [myValue, setValue] = useState('') 

    const handleBasicInfo = () => {
      setBasicInfo(true)
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
              backgroundColor={colors.navbar[100]}
              display="flex"
              borderRadius="10px"
              padding="20px 20px 20px 20px"
              >
                 <Box display="flex" justifyContent="center" alignItems="left">
                            <img
                                alt="profile-user"
                                width="60px"
                                height="60px"
                                src={require('../../assets/vishnu.jpg')}
                                style={{ cursor:"pointer", borderRadius: "50%"}}
                                />
                  </Box>
                  <Box marginLeft="20px">
                            <Typography
                                varient="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{m: "10px 0 0 0"}}
                                >Vishnu prakash</Typography>
                            <Typography varient = "h5" color={colors.greenAccent[500]}>
                                vishnu@gmail.com
                            </Typography>
                    </Box>
                    
          </Box>
          <Box   
              backgroundColor={colors.navbar[100]}
              display="flex"
              borderRadius="10px"
              padding="10px 10px 10px 10px"
            marginTop="1%"
              >
                    <Box>
                      <Button style={{marginRight:"5px",borderRadius:"50px"}} sx={{'&:hover':{backgroundColor:"lightblue"}}} onClick={handleBasicInfo}>Profile</Button>
                      <Button style={{marginRight:"5px",borderRadius:"50px"}} sx={{'&:hover':{backgroundColor:"lightblue"}}}>Files</Button>
                    </Box>

          </Box>
              
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
        >
            
            {/* row 1*/}
          
        <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                marginTop="5%"
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >About Me</Typography>
                </Box>
              </Box>
             {openBasicInfo && (
             <>
              <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                marginTop="5%"
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Basic Info</Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                marginTop="5%"
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Work Info</Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 3"
                gridRow="span 2"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
                marginTop="5%"
              >
                <Box
                padding="20px"
                >
                    <Typography
                      variant="h3"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >Personal Info</Typography>
                </Box>
              </Box> 
              </>
             )}
            </Box>
           </Box>
    )
        
};


export default UserProfilePage;