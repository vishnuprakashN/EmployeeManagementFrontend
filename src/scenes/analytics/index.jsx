import {Box} from "@mui/material"
import Header from "../../components/Header"

const Analytics = () =>{
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="left" flexDirection="column">
        {/* <Header title="DASHBOARD" subtitle="Welcome to Dashboard"/> */}
        <iframe width="1220" height="800" 
        src="https://lookerstudio.google.com/embed/reporting/56cd4484-c9cb-4475-a343-025bb0dc7659/page/vP2GD" 
         style={{border:0 }}></iframe>
        </Box>
    </Box>
}

export default Analytics;