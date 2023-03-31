import { FormControl, InputLabel, Select,MenuItem, TextField, Button, useMediaQuery, TextareaAutosize } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useRef, useState } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Textarea } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "@mui/base";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/db";

export default function Overview(){
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [level, setLevel] = useState('');
    const [Certification, setCertification] = useState('');
    const [AddBulletOutcome, setAddBulletOutcome] = useState([<TextareaAutosize minRows={2} fullWidth variant="filled" style={{gridColumn: "span 4"}} placeholder="Outcome point"/>]);
    const [AddBulletCareer, setAddBulletCareer] = useState([<TextareaAutosize minRows={1} fullWidth variant="filled" style={{gridColumn: "span 4"}} placeholder="Possible Career point"/>]);
    const [Description, setDescription] = useState("");
    const [OutComeIntro, setOutComeIntro] = useState("");
    const [OutComePoint, setOutComePoint] = useState([]);
    const [CareerPoint, setCareerPoint] = useState([]);
    const [Count, setCount] = useState(1)
    const [open, setOpen] = useState(false);
    const [val,setVal]=useState([]);
   
    


      const location = useLocation()
      const id= location.state.courseID
      console.log(id)

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
const test=()=>{
  
   
}
      const handleFormSubmit = (values) => {
       
        console.log(values);
        const addToFireStore =async ()=>{
            const docRef = await addDoc(collection(db, "ATTI-Course-Categories", id, "ATTI-Courses"), {
              courseName: values.courseName,
              CourseDuaration: values.duration,
              SAQA:values.saqa,
              Credits:values.credits,
              NQF:level,
              Certification:Certification,
              CourseCover:"",
              
            });
            handleOpen()
         
            
           }
           addToFireStore()
      }

      const addBullet =()=>{
        setCount(Count+1)
        AddBulletOutcome.push( <TextareaAutosize minRows={2}
            fullWidth
            variant="filled"
            style={{gridColumn: "span 4"}}
            placeholder="Outcome point"
          
           />)
      }

      
      const removeBullet =()=>{
        val.pop()
      }

      
      const addBullet2 =()=>{
        AddBulletCareer.push( <TextareaAutosize minRows={1}
            fullWidth
            variant="filled"
            style={{gridColumn: "span 4"}}
            placeholder="Possible Career point"
           />)
      }

      
      const removeBullet2 =()=>{
        AddBulletCareer.pop()
      }
      const handleAdd=()=>{
        const abc=[...val,[]]
        setVal(abc)
    }
      const handleChangeInput=(onChangeValue,i)=>{
        const inputdata=[...val]
        inputdata[i]=onChangeValue.target.value;
        setVal(inputdata)
       }
       console.log(val,"data-")

    return(
        <Box Box sx={{width:"100%"}}>
        <h4>Overview</h4>

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
            <TextareaAutosize minRows={8}
             fullWidth
             variant="filled"
             style={{gridColumn: "span 4"}}
             placeholder="Course Description"
            />
          <TextareaAutosize minRows={3}
             fullWidth
             variant="filled"
             style={{gridColumn: "span 4"}}
             placeholder="Learning Outcome Introduction"
            />

            
            {val.map((data,i)=>{
            return(
             
                <TextareaAutosize minRows={2}
                fullWidth
                variant="filled"
                style={{gridColumn: "span 4"}}
                placeholder="Outcome point"
                value={data}
                onChange={e=>handleChangeInput(e,i)}
               />
            )
        })}
            <Button  type="submit" color="secondary" variant="contained" onClick={handleAdd}>Add Point</Button>
            <Button  type="submit" color="secondary" sx={{color:colors.redAccent[500]}} variant="contained" onClick={removeBullet}>Remove Point</Button>
              
            {AddBulletCareer.map((bullet)=>bullet)}
            <Button  type="submit" color="secondary" variant="contained" onClick={addBullet2}>Add Point</Button>
            <Button  type="submit" color="secondary" sx={{color:colors.redAccent[500]}} variant="contained" onClick={removeBullet2}>Remove Point</Button>
              
              
             
            
            </Box>

            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick={test} color="secondary" variant="contained">
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
