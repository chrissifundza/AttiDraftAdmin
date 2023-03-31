import { useTheme } from "@emotion/react";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { ContextData } from "../../context/Contextdata";
import { tokens } from "../../theme";
export default function SignleCategory({CoureCat,CourseAccre}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {deleteCategory} = useContext(ContextData)
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

                onClick={()=>deleteCategory(CourseAccre)}>
                View 
              </Box>
              <Box
                backgroundColor={colors.redAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                sx={{cursor:"pointer"}}

                onClick={()=>deleteCategory(CourseAccre)}
              >
                Delete
              </Box></div>
          </TableCell>
         
        </TableRow>
    


)
}