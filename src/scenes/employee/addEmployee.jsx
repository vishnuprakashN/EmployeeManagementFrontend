import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";



const initialValues = {
    fname: "",
    lname: ""
};


const dateRegExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;


const userSchema = yup.object().shape({
    name: yup.string().required("required"),
    status: yup.string().required("required"),
    type: yup.string().required("required"),
    startDate: yup
    .string()
    .matches(dateRegExp, "Date is not valid")
    .required("required"),
    endDate: yup
    .string()
    .matches(dateRegExp, "Date is not valid")
    .required("required"),
    valuation: yup.number().required("required"),
})



const setProjectData = async (values) =>{

    try{
        axios.post("http://localhost:8080/project/add",values)
        .then(function (response) {
            console.log(response);
          });
    
    }catch (e){
        console.log(e);
    }
};

const AddEmployee = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        setProjectData(values);
        navigate('/projects');
    }

    const navigate = useNavigate();

    const StatusOptions = ['ONGOING','COMPLETED'];

    const TypeOptions = ['TM','PB','RT'];



    return(<Box m="20px">
        <Header title="CREATE PROJECT" subtitle="Create a New Project"/>
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box display="grid"
                         gap="30px" 
                         gridTemplateColumns="repeat(4, minmax(0, 1fr)) "
                         sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                         }}
                         >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 2"}}
                        />
                        {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Project Status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.status}
                            name="status"
                            error={!!touched.status && !!errors.status}
                            helperText={touched.status && errors.status}
                            sx={{ gridColumn: "span 2"}}
                        /> */}

                        <Autocomplete
                         disablePortal
                         id="projectstatus"
                         options={StatusOptions}
                         sx={{ gridColumn: "span 2" }}
                         onChange={(event, value) => values.status = value} 
                         renderInput={(params) => <TextField
                             {...params} label="Project Status" 
                             />}        
                        isOptionEqualToValue={(option, value) => value === option || value === ''}

                        />

                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New Project
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    </Box>)
}

export default AddEmployee;