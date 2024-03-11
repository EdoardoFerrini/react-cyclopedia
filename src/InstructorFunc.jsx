import React from "react";
import { useEffect } from "react";
const InstructorFunc = ({instructor}) =>{
    

    useEffect(()=>{
        return()=>{
            console.log("Instructor - UNMOUNTED")
        }
    }, []);

        return(
            <div>
                <div>
                    
                    Name: {instructor.name}
                    <br/>
                    Email: {instructor.email}
                    <br/>
                    Phone: {instructor.phone}
                    <br/>
                </div>
            </div>
        )
}
export default InstructorFunc