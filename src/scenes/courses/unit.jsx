import { FormControl, InputLabel, Select,MenuItem, TextField, Button, useMediaQuery, TextareaAutosize } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Textarea } from "@mui/joy";

export default function Unit(){
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [level, setLevel] = useState('');
    const [Certification, setCertification] = useState('');
    const [AddBulletOutcome, setAddBulletOutcome] = useState([<TextareaAutosize minRows={1} fullWidth variant="filled" style={{gridColumn: "span 4"}} placeholder="Unit Standard Point"/>]);
    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleChangeCertification = (event) => {
        setCertification(event.target.value);
      };

      const handleFormSubmit = (values) => {
        console.log(values);
      }

      const addBullet =()=>{
        AddBulletOutcome.push( <TextareaAutosize minRows={1}
            fullWidth
            variant="filled"
            style={{gridColumn: "span 4"}}
            placeholder="Unit Standard Point"
           />)
      }

      
      const removeBullet =()=>{
        AddBulletOutcome.pop()
      }

     


    return(
        <Box Box sx={{width:"100%"}}>
        <h4>Unit Standards</h4>

        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box 
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4",width:"100%" },
              }}
            >
            <TextareaAutosize minRows={3}
             fullWidth
             variant="filled"
             style={{gridColumn: "span 4"}}
             placeholder="Unit Standard Introduction"
            />
         

            {AddBulletOutcome.map((bullet)=>bullet)}
            <Button  type="submit" color="secondary" variant="contained" onClick={addBullet}>Add Point</Button>
            <Button  type="submit" color="secondary" sx={{color:colors.redAccent[500]}} variant="contained" onClick={removeBullet}>Remove Point</Button>
              
           
              
             
            
            </Box>

            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Course Overview
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
    )
}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};
