import { Box } from "@mui/material"
import React from "react"
import Header from "../../components/Header";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material";
import { useLocation } from "react-router-dom";
const FilteredEmployees = () => {
  return(
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="150px"
        gap="10px"
      >
        <Box
          gridColumn="span 12"
          backgroundColor={"#FFFFFF"}
          display="flex"
          alignItems="center"
          borderRadius="10px"
          padding="20px 20px 20px 20px"
          justifyContent="space-between">
            <Box>
             <Header title="FILTERED EMPLOYEES" subtitle={"Recommended Employees"} />
             </Box>
          </Box>
          
      </Box>
    </Box>
  )
}
export default FilteredEmployees