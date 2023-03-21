import { Box,TextField ,FormControl,FilledInput,InputAdornment, Typography,InputLabel,Select,MenuItem, Dialog, DialogContent, DialogActions, Button} from "@mui/material"
import React from "react"
const AddUsers = ({onClose}) => {
 
  return(
    <>
    <Dialog open={true}>
      <DialogContent>
        
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}
export default AddUsers