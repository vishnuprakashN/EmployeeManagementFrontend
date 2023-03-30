import { Box, Button, TextField, useMediaQuery,FormControl,InputLabel,MenuItem,Select } from "@mui/material"
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react"
import Header from "../../components/Header";
import {useNavigate} from 'react-router-dom';
const AddProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[projectName,setProjectName] = useState("")
  const[description,setDescription] = useState("")
  const[startDate,setStartDate] = useState("")
  const[endDate,setEndDate] = useState("")
  const[clientName,setClientName] = useState("")
  const[clientAddress,setClientAddress] = useState("")
  const [posts,setPosts] = useState([])
  const[status,setStatus] = useState("")
  const[projectType,setProjectType] = useState("")
  const[openAddButton,setOpenAddButton] = useState(false)
  const apiEndPoint = "http://localhost:8080/project/add"
  const navigate = useNavigate();
  const handleProjectName = (event) => {
    setProjectName(event.target.value)
  }
  const handleProjectType = (event) => {
    setProjectType(event.target.value)
  }
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleStartDate = (event) => {
    setStartDate(event.target.value)
  }
  const handleEndDate = (event) => {
    setEndDate(event.target.value)
  }
  const handleClientName = (event) => {
    setClientName(event.target.value)
  }
  const handleClientAddress = (event) => {
    setClientAddress(event.target.value)
  }
  const handleStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleOpen = () => {
    setOpenAddButton(true)
    console.log(openAddButton)
  }
  const navigateAddTeam = () => {
    setOpenAddButton(true)
    navigate("/addTeam")
  }
  const handleTeam = () => {
    handleOpen();
    navigateAddTeam();
  }
  const addProject = async () => {
    const post = {
      projectName: projectName,
      projectType: projectType,
      projectDescription: description,
      clientName: clientName,
      clientAddress: clientAddress,
      startDate: "2023-03-24",
      projectStatus: status
    }
    if(projectName !== "" && projectType !== "" && description !== "" && clientName !== "" && clientAddress !== "" && status !== "")
    {
    await axios.post(apiEndPoint,post)
    setPosts([post,...posts])
    alert("Added Successfully!!")
    navigate("/projects")
    }
    else{
      alert("Enter Invalid Data")
    }
  }
  return(
    <>
    <Box m="20px">
    <Header title="CREATE PROJECT" subtitle="Create a New Project"/>
    <form>
      <Box display="grid"
                         gap="30px" 
                         gridTemplateColumns="repeat(4, minmax(0, 1fr)) "
                         sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                         }}>
      <TextField fullWidth variant="filled" type="text" label="Project Name" onChange={handleProjectName} sx={{ gridColumn: "span 4"}}></TextField>
      <TextField fullWidth variant="filled" type="text" label="Project Description" onChange={handleDescription} sx={{gridColumn:"span 4"}}></TextField>  
      <TextField fullWidth variant="filled" type="text" label="Client Name" onChange={handleClientName} sx={{gridColumn:"span 4"}}></TextField>   
      <TextField fullWidth variant="filled" type="text" label="Start Date" onChange={handleStartDate} sx={{gridColumn:"span 4"}}></TextField>
      <FormControl fullWidth sx={{gridColumn:"span 4"}}>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
   onChange={handleStatus}
    label="Status"
  >
    <MenuItem value={"ON-GOING"}>On-going</MenuItem>
    <MenuItem value={"COMPLETED"}>Completed</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth sx={{gridColumn:"span 4"}}>
  <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
  <Select
   onChange={handleProjectType}
    label="Project Type"
  >
    <MenuItem value={"T&M"}>T&M</MenuItem>
    <MenuItem value={"Fixed Cost"}>Fixed Cost</MenuItem>
  </Select>
</FormControl>
      <TextField fullWidth variant="filled" type="text" label="Client Address" onChange={handleClientAddress} sx={{gridColumn:"span 4"}}></TextField>
      </Box>
    </form>
   <Button variant="contained" onClick={addProject} style={{marginTop:"10px"}}>Add</Button>
    </Box>
    </>
  )
}
export default AddProject