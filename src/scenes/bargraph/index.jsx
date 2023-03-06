import {Box} from "@mui/material"
import Header from "../../components/Header"

const BarGraph = () =>{
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="left" flexDirection="column">
        {/* <Header title="DASHBOARD" subtitle="Welcome to Dashboard"/> */}
        <iframe width="1220" height="800" 
        src="https://lookerstudio.google.com/embed/reporting/71d36202-169d-4de6-bcb4-ee01fb092877/page/p_zf2868ft3c"
         style={{border:0 }}></iframe>
        </Box>
    </Box>
}

export default BarGraph;