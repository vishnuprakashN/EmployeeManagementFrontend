import {Box, Button, Card, CardContent, Typography,CardMedia,Paper } from "@mui/material";
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} 
const Recommendation = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [team, setTeam] = useState([]);
    const [experience, setExperience] = useState([20, 37]);
    const[getSkill,setGetSkill] = useState([])
    const [skills, setskills] = useState([0]);
   const[startSalary,setStartSalary] = useState()
    const[certification,setCertification] = useState([0])
    const[certificates,setCertificates] = useState([])
    const[getemployee,setGetEmployee] = useState([])
    const[employeeList,setEmployeeList] = useState([])
    const[endSalary,setEndSalary] = useState()
    const{state: teamState} = useLocation()
    console.log(teamState.id)

    const columns = [
    {field:"name",headerName:"Employee Name",flex:1},
    {field:"experience",headerName:"Experience",flex:1},
    {field:"departmentName",headerName:"Department",flex:2},
    {headerName:"Action", flex:1,
    renderCell:({row: id})=> {
        return(
            <>
            <Button variant="contained" onClick={() => handleRemove(id)}>Remove</Button>
           </>
        )
    }}]

    const empColumn = [
      {field:"name",headerName:"Employee Name",flex:1},
      {field:"experience",headerName:"Experience",flex:1},
      {field:"departmentName",headerName:"Department",flex:2},
      {headerName:"Action", flex:1,
      renderCell:({row: id})=> {
          return(
              <>
              <Button variant="contained" onClick={()=>addTeamMates(id)}>Add</Button>
             </>
          )
      }}]

      const addTeamMates = async(id) => {
          const addTeamMates = {
            employeeId:id.id,
            teamId:teamState.id
          }
        await  axios.post("http://localhost:8080/employee/addEmployeeToTeam",addTeamMates)
        setTeam([addTeamMates,...team])
        fetchEmployeeList()
          console.log(id)
      }

      const handleRemove = (id) => {
        const filterEmployee = employeeList.filter((empFilter) => empFilter.id !== id.id)
        setEmployeeList(filterEmployee)
        console.log(employeeList)
        console.log(id.id)
      }

    const fetchEmployeeList = async() => {
      const {data} = await Axios.get(`http://localhost:8080/employee/findEmployeeByTeam/${teamState.id}`)
      const employeeList = data
      setEmployeeList(employeeList)
      console.log(employeeList)
    }
    useEffect(() => {
      fetchEmployeeList()
    },[])
    const fetchCertification = async() => {
      const {data} = await Axios.get("http://localhost:8080/certificate/findAll")
      const certificates = data
      setCertificates(certificates) 
    }
    useEffect(()=> {
      fetchCertification()
    },[])
    const fetchSkill = async () => {
      const { data } = await Axios.get(
       "http://localhost:8080/skills/findAll"
      );
      const skill = data;
      setGetSkill(skill);
      console.log(skill);
    };
  
    useEffect(() => {
      fetchSkill();
    },[]);
  

    const handleExperience = (event, newValue) => {
      setExperience(newValue);
    };
    console.log(experience[0])

    const handleChange = (event) => {
      setskills(event.target.value)
    };
    console.log(skills)

    const handleCertification = (event) => {
        setCertification(event.target.value)
    };
    console.log(certification)
    const handleStartSalary = (event) => {
      setStartSalary(event.target.value)
    };

    const handleEndSalary = (event) => {
      setEndSalary(event.target.value)
    }

    const handleRecommendation = () => {
      const getEmployees = {
        skillIds:skills,
        certificateIds:certification,
        startExp:experience[0],
        endExp:experience[1],
        startSalary:0,
        endSalary:endSalary
      }
      const fetchRecomm = async () => {
        const { data } = await Axios.post(
         "http://localhost:8080/employee/findWithFilter",getEmployees
        );
        console.log(data)
        const getemployee = data;
        setGetEmployee(getemployee);
        console.log(getemployee);
      };
     fetchRecomm()
    }
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
                 <Header title="SELECT EMPLOYEES" subtitle="Employee Selection"/>
                </Box>
                
              </Box>
            {/* row 1*/}
            <Box
              gridColumn="span 12"
              backgroundColor={colors.navbar[100]}
              display="flex"
              alignItems="center"
              borderRadius="10px"
              justifyContent="center"
              sx={{height:"90px"}}>
                <Box>
                <FormControl sx={{ m: 1, width: 150,right:"100px"}}>
                <InputLabel id="demo-multiple-name-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={skills}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {getSkill.map((name) => (
            <MenuItem
              key={name.skillId}
              value={name.skillId}
              style={getStyles(name.skillName, skills, theme)}
            >
              {name.skillName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
     {/* <Box sx={{ width: 300}}>
        <Typography style={{marginRight:"500px"}}>Experience</Typography>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto"  sx={{right:"190px"}} onChange={handleExperience}/>
          </Box> */}
      <Box >
              <TextField fullWidth type={"number"} label="Salary Limit" onChange={handleEndSalary} sx={{ m: 1, width: 150,right:"100px"}} ></TextField>
      </Box>
      <Box>
                <FormControl sx={{ m: 1, width: 150,right:"100px"}}>
                <InputLabel id="demo-multiple-name-label">Certificate</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={certification}
          onChange={handleCertification}
          input={<OutlinedInput label="Certificate" />}
          MenuProps={MenuProps}
        >
          {certificates.map((name) => (
            <MenuItem
              key={name.certificateId}
              value={name.certificateId}
              style={getStyles(name.certificateName, certification, theme)}
            >
              {name.certificateName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
      <Box sx={{ width: 250 }}>
      <Typography style={{marginRight:"500px"}}>Experience</Typography>
      <Slider
        getAriaLabel={() => 'Experience'}
        value={experience}
        onChange={handleExperience}
        valueLabelDisplay="auto"
        sx={{right:"90px"}}
      />
    </Box>
    <Box>
      <Button variant="contained" sx={{left:"100px"}} onClick={handleRecommendation}>Filter</Button>
    </Box>
              </Box>
             
              {/* row 2*/ }
              <Box
                gridColumn="span 6"
                gridRow="span 4"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
                  <Box padding="10px">
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
          <DataGrid
                rows={employeeList}
                columns={columns}
                components={{Toolbar: GridToolbar}}
                getRowId={(rows) => rows.id}
            />
          </Box>
                  </Box>
              </Box>
              <Box
                gridColumn="span 6"
                gridRow="span 4"
                borderRadius="10px"
                backgroundColor={colors.navbar[100]}
              >
               <Box
                 padding="20px"
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
          <DataGrid
                rows={getemployee}
                columns={empColumn}
                components={{Toolbar: GridToolbar}}
                getRowId={(rows) => rows.id}
            /> 
        </Box>
                </Box>
              </Box>
        </Box>
    </Box>);      
};
export default Recommendation;