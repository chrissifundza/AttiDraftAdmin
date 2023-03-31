import { useTheme } from "@emotion/react";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../context/Contextdata";
import { tokens } from "../../theme";
export default function Cat({CoureCat,CourseAccre}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {deleteCategory} = useContext(ContextData)
    const navigate=useNavigate();
    const addCourse = (id)=>{
       
        navigate("/addcourse",{state:{courseID:id}})
    }
return(

   
        <TableRow
          key={CourseAccre}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {CoureCat}
          </TableCell>
          <TableCell >{CourseAccre}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell align="right">  
          <div className="actionCat"> <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                sx={{cursor:"pointer"}}

                onClick={()=>addCourse(CourseAccre)}>
                Add Courses 
              </Box>
            </div>
          </TableCell>
         
        </TableRow>
    


)
}