import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Details from "./details";
import Overview from "./overview";
import Unit from "./unit";
import Instructor from "./instructor";
import Classes from "./classes";
const AddCourses = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [Details1, setDetails1] = useState("#ffffff");
  const [Overview1, setOverview1] = useState("");
  const [Unit1, setUnit1] = useState("");
  const [Instructor1, setInstructor1] = useState("");
  const [Classes1, setClasses1] = useState("");
  const [ActiveTab, setActiveTab] = useState(<Details/>)

const Back = ()=>{
    navigate("/courses")
}

const clickedTab = (t)=>{

    if (t=="details"){
        setActiveTab(<Details/>)
        setDetails1("#ffffff")
        setOverview1("")
        setUnit1("")
        setInstructor1("")
        setClasses1("")
    }

    if (t=="overview"){
        setActiveTab(<Overview/>)
        setDetails1("")
        setOverview1("#ffffff")
        setUnit1("")
        setInstructor1("")
        setClasses1("")
    }
    
    if (t=="unit"){
        setActiveTab(<Unit/>)
        setDetails1("")
        setOverview1("")
        setUnit1("#ffffff")
        setInstructor1("")
        setClasses1("")
    }

    if (t=="instructor"){
        setActiveTab(<Instructor/>)
        setDetails1("")
        setOverview1("")
        setUnit1("")
        setInstructor1("#ffffff")
        setClasses1("")
    }

    if (t=="classes"){
        setActiveTab(<Classes/>)
        setDetails1("")
        setOverview1("")
        setUnit1("")
        setInstructor1("")
        setClasses1("#ffffff")
    }
}

  return (
    <Box m="20px">
        <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                sx={{cursor:"pointer",width:"50px",marginBottom:"15px"}}
                onClick={Back}
              >
               Back
              </Box>
      <Header title="New Course" subtitle="Fill in all sections before you can submit" />

      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:"100%"
       
      }}
    >
      <ButtonGroup sx={{width:"100%", color:"#fff"}} color="secondary"  size="large" aria-label="large button group">
        <Button  sx={{width:"100%", color:`${Details1}`}} key="one" onClick={()=>clickedTab("details")} >Course Details</Button>
        <Button  sx={{width:"100%",  color:`${Overview1}`}} key="two"  onClick={()=>clickedTab("overview")}>Course Overview</Button>
        <Button  sx={{width:"100%",  color:`${Unit1}`}} key="three"  onClick={()=>clickedTab("unit")}>Course Unit Standards</Button>
        <Button  sx={{width:"100%",  color:`${Instructor1}`}} key="three"  onClick={()=>clickedTab("instructor")}>Course Instructor</Button>
        <Button  sx={{width:"100%",  color:`${Classes1}`}} key="three"  onClick={()=>clickedTab("classes")}>Course Classes</Button>
      </ButtonGroup>

    </Box>

    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:"100%",
      
       
      }}
    >
        {ActiveTab}
    </Box>
    </Box>
  );
};

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

export default AddCourses;
