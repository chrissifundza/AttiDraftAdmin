import { FormControl, InputLabel, Select,MenuItem, TextField, Button, useMediaQuery, TextareaAutosize } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function Instructor(){
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [level, setLevel] = useState('');
    const [Certification, setCertification] = useState('');
    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleChangeCertification = (event) => {
        setCertification(event.target.value);
      };

      const handleFormSubmit = (values) => {
        console.log(values);
      }
    return(
        <Box Box sx={{width:"100%"}}>
        <h4>Instructor</h4>

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Instructor's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
               <FormControl sx={{ gridColumn: "span 2" }}>
            <InputLabel id="demo-simple-select-label">Instructor's Rank</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={level}
                variant="filled"
                label="Instructor's Rank"
                onChange={handleChangeLevel}
            >
                <MenuItem value={"Senior Facilitator"}>Senior Facilitator</MenuItem>
                <MenuItem value={"Intermediate Facilitator"}>Intermediate Facilitator</MenuItem>
                <MenuItem value={"Junior Facilitator"}>Junior Facilitator</MenuItem>
               
            </Select>

            </FormControl>

            <TextareaAutosize minRows={4}
             fullWidth
             variant="filled"
             style={{gridColumn: "span 4", width:"100%"}}
             placeholder="Brief Summary"
            />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Facebook Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Twitter Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="Accreditation Number"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />

         <TextField
                fullWidth
                variant="filled"
                type="text"
                
                label="LinkedIn Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="Accreditation Number"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />

<TextField
                fullWidth
                variant="filled"
                type="text"
                
                label="YouTube Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="Accreditation Number"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />
           
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Instructor Profile Image"
                onBlur={handleBlur}
                onChange={handleChangeCertification}
                value={values.address1}
                name="Accreditation Icon"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Instructor
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
