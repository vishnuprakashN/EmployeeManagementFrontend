import {Box, Button, Typography,InputLabel,FormControl,Select,MenuItem, IconButton } from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import Header from "../../components/Header";
import { boxSizing, color } from "@mui/system";
import {useTheme} from "@mui/material";
import axios from "axios"
import { useEffect, useState,useCallback } from "react";
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
import Axios from "axios"
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
function AddTeam() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[designation,setDesignation] = useState([])
  const [posts,setPosts] = useState([])
  const [openPopUp,setOpenPopUp] = useState(false)
  const[openDelPopup,setDelPopup] = useState(false)
  const[teamNames,setTeamNames] = useState("")
  const[deleteMessage,setDeleteMessage] = useState("")
  const[openMessage,setOpenMessage] = useState(false)
  const{state: teamState} = useLocation()
  console.log(teamState.id.id)
  const fetchDesignation = async () => {
    const { data } = await Axios.get(
      `http://localhost:8080/teams/findAll/${teamState.id.id}`
    );
    const designation = data;
    setDesignation(designation);
    console.log(designation);
  };

  useEffect(() => {
    fetchDesignation();
  },[]);

  const navigate = useNavigate();
  const handlePopUp = () => {
    setOpenPopUp(true)
  }
  const handleClose = () => {
    setOpenPopUp(false)
  }
  const handleTeamName = (event) => {
    setTeamNames(event.target.value)
  }
  const postTeam =  async() => {
    const post = {
      teamName:teamNames,
      projectId: teamState.id.id 
    } 
    if(teamNames !== "")
    {
    await Axios.post("http://localhost:8080/teams/add",post)
    setPosts([post,...posts])
    console.log(posts)
    setDeleteMessage(" Added Successfully!!")
    setOpenMessage(true)
    handleClose()
    fetchDesignation()
    } }

    const handleOpenMessage = () => {
      setDeleteMessage(" Deleted Successfully!!")
      setOpenMessage(true)
    }

  const handleDelete = async (id) => {
    setDesignation(designation.filter((item) => item.id !== id.id))
     await Axios.delete(
        `http://localhost:8080/teams/delete/${id}`
      )
      setDelPopup(false)
      handleOpenMessage()
      fetchDesignation()
      console.log(designation)
  }

  const handleDelPopup = () => {
    setDelPopup(true)
  }
  const closeDelPopup = () => {
    setDelPopup(false)
  }
  const handleBoxClick = (params) => {
    navigate("/recommendation", {
      state: {
        id: params
      }
    });
  console.log(params)
  }

  const datas = [{
    name: "vishnu prakash",
    designation: "software developer"
  }, {
    name: "roshini",
    designation: "frontend developer"
  }, {
    name: "sruthi",
    designation: "backend developer"
  }, {
    name: "kamal",
    designation: "frontend developer"
  }, {
    name: "venkat",
    designation: "data engineer"
  }, {
    name: "dharshan",
    designation: "data engineer"
  }, {
    name: "bharathi",
    designation: "Backend Developer"
  },];

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="150px"
        gap="10px"
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
            <Header title="CREATE TEAM" subtitle={"Create a team for Project"} />
          </Box>
          {openMessage && (
            <Box sx={{marginRight:"20px",borderRadius:"5px",marginTop:"5px",marginBottom:"5px"}}>
            <Typography><b><DoneAllIcon sx={{color:"green"}}/>{deleteMessage}</b></Typography>
          </Box>
          )}
        </Box>
        {/* row 1*/}
            {designation.map((item) => {
              return (
                <Box
                  gridColumn="span 4"
                  backgroundColor={colors.navbar[100]}
                  display="flex"
                  alignItems="center"
                  borderRadius="10px"
                  justifyContent="flex-start"
                  sx={{
                    '&:hover': {
                      boxShadow: 3,
                    },
                    cursor:"pointer"
                  }}

                >
                  <Box>
                    <Button variant="contained" style={{bottom:"10px",height:"50%",marginTop:"105px",left:"330px",}} onClick={() => handleBoxClick(item.id)}>View
                    </Button>
                    </Box>
                  <Box>
                  <IconButton style={{bottom:"55px",height:"100%",left:"300px"}} onClick={handleDelPopup}> 
                    <CancelIcon  onClick={handleDelPopup} />
                   </IconButton>
                   {openDelPopup && (
                    <>
                    <Dialog open={true}>
                      <DialogContent>
                      <Typography sx={{fontSize:"20px"}}>Are you sure to delete?</Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button variant="contained" onClick={() => handleDelete(item.id)}>Confirm</Button>
                        <Button onClick={closeDelPopup}>Close</Button>
                      </DialogActions>
                    </Dialog>
                    </>
                  )}
                 {/*   <img
                      alt="profile-user"
                      width="98px"
                      height="98px"
                      src={require('../../assets/rosee.jpg')}
                   style={{ cursor: "pointer", borderRadius: "50%", margin: "15px" }} /> */}
                   </Box>
                   <Avatar
                      style={{ cursor: "pointer", borderRadius: "50%", width:"90px",right:"50px",
                      height:"90px", backgroundColor: "#5E7CE5",fontSize:"30px" }} >{item.teamName[0]}</Avatar>
                  <Box>
                    <Typography
                      varient="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      fontSize="19px"
                      style={{right:"50px"}}
                    >{item.teamName}</Typography>
                    <Typography varient="h5" color={colors.greenAccent[500]}>
                      {item.designation}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <Box
                  gridColumn="span 4"
                  backgroundColor="#E2DFDE"
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
                    <AddBoxSharpIcon color="secondary" sx={{fontSize:"53px",alignItems:"center",marginLeft:"160px",'&:hover': {
                      backgroundColor:"white",borderRadius:"10px",cursor:"pointer"
                    }} } onClick={handlePopUp}/>
                    <Typography variant="h5" sx={{marginLeft:"150px", }}><b>Add Team</b></Typography>
                    {openPopUp && (
                      <>
                      <Dialog open={true}>
                         <DialogContent>
                          <TextField variant="filled" type={"text"} label="Team Name" onChange={handleTeamName}></TextField>
                         </DialogContent>
                         <DialogActions>
                          <Button variant="contained" onClick={postTeam}>Add</Button>
                          <Button onClick={handleClose}>Close</Button>
                         </DialogActions>
                      </Dialog>
                      </>
                    )}
                  </Box>
                </Box>
      </Box>
    </Box>);
}
export default AddTeam;