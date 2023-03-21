import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react"
import Header from "../../components/Header";
const AddProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[projectName,setProjectName] = useState("")
  const[description,setDescription] = useState("")
  const[startDate,setStartDate] = useState("")
  const[endDate,setEndDate] = useState("")
  const[clientName,setClientName] = useState("")
  const[clientAddress,setClientAddress] = useState("")
  const [posts,setPosts] = useState([])
  const apiEndPoint = "http://localhost:8080/projects/add"
  const handleProjectName = (event) => {
    setProjectName(event.target.value)
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
  const addProject = async () => {
    const post = {
      projectName: projectName,
      projectDescription: description,
      clientName: clientName,
      startDate: "2001-11-21",
      endDate: "2002-11-21",
      clientAddress: clientAddress
    }
    await axios.post(apiEndPoint,post)
    setPosts([post,...posts])
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
      <TextField fullWidth variant="filled" type="text" label="End Date" onChange={handleEndDate} sx={{gridColumn:"span 4"}}></TextField>
      <TextField fullWidth variant="filled" type="text" label="Client Address" onChange={handleClientAddress} sx={{gridColumn:"span 4"}}></TextField>
      </Box>
    </form>
    <Button variant="contained" onClick={addProject} style={{marginTop:"10px"}}>Add</Button>
    </Box>
    </>
  )
}
export default AddProject