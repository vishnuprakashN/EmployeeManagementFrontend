import {Box} from "@mui/material"
import Header from "../../components/Header"

const Dashboard = () =>{
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="left" flexDirection="column">
        <Header title="DASHBOARD" subtitle="Welcome to Dashboard"/>
        {/* <iframe width="1220" height="800" 
        src="https://lookerstudio.google.com/embed/reporting/de451bff-bdf6-4124-bca1-5a70e551627f/page/tEnnC" 
         style={{border:0}}></iframe> */}
        </Box>
    </Box>
}

export default Dashboard;