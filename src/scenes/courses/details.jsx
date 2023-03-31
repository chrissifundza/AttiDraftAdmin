import { FormControl, InputLabel, Select,MenuItem, TextField, Button, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/db";
import { collection, addDoc } from "firebase/firestore"; 
import { ClickAwayListener, useSnackbar } from "@mui/base";
import { CustomSnackbar } from "./style";
import { Check } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
export default function Details(){
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [level, setLevel] = useState('');
    const [Certification, setCertification] = useState('');
    const [Cover, setCover] = useState('');
    const [HideProgress, setHideProgress] = useState(false);
    const [ProgressCover, setProgressCover] = useState('');
    const [open, setOpen] = useState(false);
    const navigate =useNavigate()
    const location = useLocation()
   const id= location.state.courseID
    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleChangeCertification = (event) => {
        setCertification(event.target.value);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };
    
      const { getRootProps, onClickAway } = useSnackbar({
        onClose: handleClose,
        open,
        autoHideDuration: 5000,
      });
      const handleFormSubmit = (values) => {
        console.log(values);

        
    const storageRef = ref(storage,`Courses/${Cover.name+ new Date()}`) ;
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
      const addToFireStore =async ()=>{
        const docRef = await addDoc(collection(db, "ATTI-Course-Categories", id, "ATTI-Courses"), {
          courseName: values.courseName,
          CourseDuaration: values.duration,
          SAQA:values.saqa,
          Credits:values.credits,
          NQF:level,
          Certification:Certification,
          CourseCover:downloadURL1,
          
        });
        handleOpen()
     
        
       }
       addToFireStore()
    });
}
);
      }
    return(
        <Box Box sx={{width:"100%"}}>
        <h4>Details</h4>

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
                label="Course Name"
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
                label="Duration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="number"
                label="SAQA ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.saqa}
                name="saqa"
                error={!!touched.saqa && !!errors.saqa}
                helperText={touched.saqa && errors.saqa}
                sx={{ gridColumn: "span 2" }}
              />

         <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Credits"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.credits}
                name="credits"
                error={!!touched.credits && !!errors.credits}
                helperText={touched.credits && errors.credits}
                sx={{ gridColumn: "span 2" }}
              />

            <FormControl sx={{ gridColumn: "span 2" }}>
            <InputLabel id="demo-simple-select-label">NQF Level</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={level}
                variant="filled"
                label="NQF Level"
                onChange={handleChangeLevel}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
            </Select>
            </FormControl>

             
            <FormControl sx={{ gridColumn: "span 2" }}>
            <InputLabel id="demo-simple-select-label">Certification</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Certification}
                label="Certification"
                variant="filled"
                onChange={handleChangeCertification}
            >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
               
            </Select>
            </FormControl>
            <div style={{ gridColumn: "span 2" }}>
            
            Course Cover <br/> <input className="inputC" file={Cover}  onChange={(e)=>setCover(e.target.files[0])} type="file" />
                </div>
                <div className="ProgressCover" style={{ gridColumn: "span 2" }}>
                 { HideProgress &&  <progress className="uploader" value={ProgressCover} max="100">0%</progress> } {HideProgress&& <span>{ProgressCover } %</span>}
                </div>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save New Course
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>Uploaded Successfuly   <Check sx={{position:"absolute", right:"10px"}} /> </CustomSnackbar>
        </ClickAwayListener>
      ) : null}
        </Box>
    )
}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    courseName: yup.string().required("required"),
    duration: yup.string().required("required"),
  saqa: yup.string().required("required"),
  credits: yup.string().required("required"),
 
});
const initialValues = {
    courseName: "",
    duration: "",
    saqa: "",
    credits: "",

};
