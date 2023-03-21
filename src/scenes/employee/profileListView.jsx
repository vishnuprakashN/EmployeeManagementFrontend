import {Box, Button, Typography,InputLabel,FormControl,Select,MenuItem } from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {mockDataContacts} from "../../data/mockData";
import Header from "../../components/Header";
import { boxSizing, color } from "@mui/system";
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


function ProfileListView() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employeeView, setEmployeeView] = useState("");
  const [openEmployeeList, setOpenEmployeeList] = useState(false);
  const [openProfileList, setOpenProfileList] = useState(false);
  const navigate = useNavigate();
  const handleEmployeeView = (event) => {
    setEmployeeView(event.target.value);
  };
  const handleEmployeeDashboard = () => {
    setOpenEmployeeList(true);
    setOpenProfileList(false);
  };
  const handleProfileList = () => {
    setOpenProfileList(true);
    setOpenEmployeeList(false);
  };

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
            <Header title="EMPLOYEES" />
            <Box width={"85%"} marginBottom={"8%"}>
            <FormControl  variant="standard" fullWidth>
              <InputLabel >Employee View</InputLabel>
              <Select
                label="Employee View" onChange={handleEmployeeView} sx={{borderRadius:"10px"}}
              >
                <MenuItem value={"Employee Dashboard"} onClick={handleEmployeeDashboard}>Employee Dashboard</MenuItem>
                <MenuItem value={"Profile List"} onClick={handleProfileList}>Profile List</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </Box>
          <Box>
            <Button type="button" color="secondary" variant="contained"
            >
              ADD EMPLOYEE
            </Button>
          </Box>

        </Box>
        {/* row 1*/}
        

        {openEmployeeList && (
          <>
          {navigate("/employee")}
          </>
        )}
            {datas.map((item) => {
              return (
                <Box
                  gridColumn="span 3"
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
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={require('../../assets/rosee.jpg')}
                      style={{ cursor: "pointer", borderRadius: "50%", margin: "15px" }} /></Box>
                  <Box>
                    <Typography
                      varient="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      fontSize="17px"
                      sx={{ m: "0 0 0 0" }}
                    >{item.name}</Typography>
                    <Typography varient="h5" color={colors.greenAccent[500]}>
                      {item.designation}
                    </Typography>
                  </Box>
                </Box>
              );
            })}


      </Box>
    </Box>);

}


export default ProfileListView;