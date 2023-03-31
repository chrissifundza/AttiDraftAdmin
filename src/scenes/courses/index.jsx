import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Cat from "./cat";
import { ContextData } from "../../context/Contextdata";

const Courses = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const {Categories,getAllCategories} = useContext(ContextData)
const AddCourse = ()=>{
    navigate("/addcourse")
   
}
  return (
    <Box m="20px">
      <Header title="ADD COURSES IN COURSE CATEGORY" subtitle="Click Course Category to Add" />


      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell >Accreditation Number</TableCell>
            <TableCell >Number of Courses</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Categories.map((cat)=> <Cat key={cat.CourseAccre} {...cat}/>)}
        </TableBody>
      </Table>
    </TableContainer>
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

export default Courses;
