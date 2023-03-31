import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/db";

export const ContextData =createContext();

export const ContextDataProvider =({children})=>{
const [Categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
      }, [])
      
      const getAllCategories =async ()=>{
        console.log("running")
        let newdata =[];
        try {
              const ref= collection(db,"ATTI-Course-Categories")
              const querySnapshot = await getDocs(ref);
              querySnapshot.forEach((doc) => {

               
                newdata.push(doc.data())
              });
              setCategories(newdata)
        } catch (error) {
          console.log(error)
        }
        
      }

      const deleteCategory =async (id)=>{
        console.log(id)
        await deleteDoc(doc(db, "ATTI-Course-Categories", id));
        getAllCategories()
      }
    return(
        <ContextData.Provider value={{Categories,deleteCategory,getAllCategories}}>{children}</ContextData.Provider>
    )
}