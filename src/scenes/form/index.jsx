import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/db";
import { useContext, useEffect, useState } from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { ClickAwayListener, useSnackbar } from "@mui/base";
import { CustomSnackbar } from "./style";
import { Check } from "@mui/icons-material";
import { ContextData } from "../../context/Contextdata";
import SignleCategory from "./singleCat";

const Form = () => {
  const [Cover, setCover] = useState('')
  const [IconCover, setIconCover] = useState('')
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [ProgressCover, setProgressCover] = useState('')
  const [IconProgressCover, setIconProgressCover] = useState('')
  const [HideProgress, setHideProgress] = useState(false)
  const [HideProgress2, setHideProgress2] = useState(false)
  const theme = useTheme();
  
  const {Categories,getAllCategories} = useContext(ContextData)
  console.log(Categories)
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

  const handleOpen = () => {
    setOpen(true);
  };


  const handleFormSubmit = (values) => {
    console.log(values);


    const storageRef = ref(storage,`Categories/${Cover.name+ new Date()}`) ;
    const uploadTask = uploadBytesResumable(storageRef, Cover);

    uploadTask.on('state_changed', 
  (snapshot) => {
 
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setHideProgress(true)
    if (progress==100){
      setTimeout(() => {
        setHideProgress(false)
      }, 3000);
    }
    console.log('Upload is ' + progress + '% done');
    setProgressCover(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
console.log(error)
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL1) => {
      console.log('File available at', downloadURL1);

      const storageRef = ref(storage,`Categories/${IconCover.name+ new Date()}`) ;
      const uploadTask = uploadBytesResumable(storageRef, IconCover);
  
      uploadTask.on('state_changed', 
    (snapshot) => {
   
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setHideProgress2(true)
      if (progress==100){
        setTimeout(() => {
          setHideProgress2(false)
        }, 1000);
      }
      console.log('Upload is ' + progress + '% done');
      setIconProgressCover(progress)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
  console.log(error)
    }, 
    () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL2) => {
        console.log('File available at', downloadURL2);
       const addToFireStore =async ()=>{
        const docRef = await setDoc(doc(db, "ATTI-Course-Categories", values.accreditation), {
          CoureCat: values.courseName,
          CourseAccre: values.accreditation,
          CategoryCover:downloadURL1,
          Accreditation:downloadURL2
        });
        handleOpen()
        values.courseName="";
        values.accreditation="";
      
        getAllCategories()
       }
       addToFireStore()
      });
    }
  );

    });
  }
);
  };


  return (
    <Box m="20px">
      <Header title="CREATE A COURSE CATEGORY" subtitle="Create a New Course Category" />

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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.courseName}
                name="courseName"
                error={!!touched.courseName && !!errors.courseName}
                helperText={touched.courseName && errors.courseName}
                sx={{ gridColumn: "span 2" }}
              />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Accreditation Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accreditation}
                name="accreditation"
                error={!!touched.accreditation && !!errors.accreditation}
                helperText={touched.accreditation && errors.accreditation}
                sx={{ gridColumn: "span 2" }}
              />
                <div style={{ gridColumn: "span 2" }}>
            
            Category Cover <br/> <input className="inputC" file={Cover}  onChange={(e)=>setCover(e.target.files[0])} type="file" />
                </div>
                
                <div className="ProgressCover" style={{ gridColumn: "span 2" }}>
                 { HideProgress &&  <progress className="uploader" value={ProgressCover} max="100">0%</progress> } {HideProgress&& <span>{ProgressCover } %</span>}
                </div>

          <div style={{ gridColumn: "span 2" }}>
            
      Category Icon<br/> <input className="inputC" file={IconCover}  onChange={(e)=>setIconCover(e.target.files[0])} type="file" />
          </div>
             
          <div style={{ gridColumn: "span 2" }}>
          { HideProgress2 &&  <progress className="uploader" value={IconProgressCover} max="100">0%</progress> } {HideProgress2&& <span>{IconProgressCover } %</span>}
          </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <br/>
      <hr/>
<h2>List of Categories</h2>

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
        {Categories.map((cat)=> <SignleCategory key={cat.CourseAccre} {...cat}/>)}
        </TableBody>
      </Table>
    </TableContainer>
    

            
   
         
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>Uploaded Successfuly   <Check sx={{position:"absolute", right:"10px"}} /> </CustomSnackbar>
        </ClickAwayListener>
      ) : null}
            
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  courseName: yup.string().required("required"),
 
  accreditation: yup.string().required("required"),

   

});
const initialValues = {
  courseName: "",
  accreditation: "",
 
  
};

export default Form;
