
import React from "react"
import { getRandomUser } from "./api"
import { useState, useEffect, useRef, useId } from "react"
import InstructorFunc from "./InstructorFunc"

const CyclopediaFuncPage = () =>{

    const [state, setState]= useState(()=>{
        return{
            instructor: undefined,
            studentList : [],
            studentCount : 0,
            hideInstructor: false,
        };    
        });

    const [inputName, setInputName] = useState(()=>{
        return ""
    });

    const [inputFeedback, setInputFeedback] = useState(()=>{
        return ""
    })

    const totalRender = useRef(0);
    const prevStudentCount = useRef(0);
    const feedbackInputRef = useRef(null);
    const id = useId()

    useEffect(()=>{
       totalRender.current= totalRender.current + 1;
        console.log("render: ",totalRender.current)
    });



    /*
    useEffect(()=>{
        console.log("This will be called on Initial/first Render/Mount")
    }, []);
    */

    useEffect(()=>{  
        const getUser = async()=>{
            const response = await getRandomUser();
            console.log(response)
            setState((prevState)=>{
                return{
                    ...prevState,
                    instructor: {
                        name: response.data.first_name + " " + response.data.last_name,
                        email: response.data.email, 
                        phone: response.data.phone_number
                    },
                };
            });
        };
        if(!state.hideInstructor){
            getUser();
        }
    }, [state.hideInstructor]);


    useEffect(()=>{
        const getUser = async()=>{
            const response = await getRandomUser();
            console.log(response)
            setState((prevState)=>{
                return{
                    ...prevState,
                    studentList:[
                        ...prevState.studentList,{
                            name: response.data.first_name + " " + response.data.last_name,
                        }
                    ]
                };
            });
        };
        if(prevStudentCount.current < state.studentCount){
            getUser();
        }
        else if(prevStudentCount.current > state.studentCount){
            setState((prevState)=>{
                return {...prevState, studentList:[]}
            })
        }
    }, [state.studentCount]);

    useEffect(()=>{
        console.log("Prev count",prevStudentCount.current)
        console.log("Curr count",state.studentCount)
        prevStudentCount.current= state.studentCount;
        console.log("Prev count",prevStudentCount.current)
        console.log("Curr count",state.studentCount)
     },[state.studentCount]);
    
    useEffect(()=>{
        console.log("This will be called on whenever value of hideinstructor changes")
        
    }, [inputName,inputFeedback]);

    useEffect(()=>{
        feedbackInputRef.current.focus();
        return()=>{

        }
    },[])

/*
    useEffect(()=>{
        console.log("This will be called on Initial/first Render/Mount")
        return()=>{
            console.log("This will be called on when component will be UNMOUNTED")
        }
    }, []);
*/
   
   const handleAddStudent = () =>{
        setState((prevState)=>{
            return{
                ...prevState,
                studentCount: prevState.studentCount + 1
            }
        })
    }

    const handleRemoveStudent = () =>{
        setState((prevState)=>{
            return{
                ...prevState,
                studentCount: 0
            }
        })
    }

    const handleToggleInstructor = () =>{
        setState((prevState)=>{
            return{
                ...prevState,
                hideInstructor: !prevState.hideInstructor
            }
        })
    }

        return(
            <div>
                <div className="p-3">
                    <span className="h4 text-success">Instructor</span>
                        <i className={`bi ${state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} btn btn-success btn-sm`}
                            onClick={handleToggleInstructor}></i>
                        {!state.hideInstructor && state.instructor ? (<InstructorFunc instructor={state.instructor} />):null}
                </div>
                <div className="p-3">Total Render: {totalRender.current}</div>
                <div className="p-3">
                    <span className="h4 text-success">Feedback</span>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Name..." 
                        value={inputName}
                        onChange={(e)=>{setInputName(e.target.value)}}
                        id={`${id}-inputName`}>
                    </input>{" "}
                    <label htmlFor={`${id}-inputName`}>Value: </label>
                    {inputName}
                    <br/>
                    <textarea 
                        placeholder="Feedback..."
                        value={inputFeedback}
                        ref={feedbackInputRef}
                        id={`${id}-inputFeedback`}
                        onChange={(e)=>{setInputFeedback(e.target.value)}}>
                    </textarea>
                    {" "}
                    <label htmlFor={`${id}-inputFeedback`}>Value: {inputFeedback}</label>
                    
                </div>

                <div className="p3">
                <span className="h4 text-success">Students</span>
                <div>Student Count: {state.studentCount}</div>
                <button className="btn btn-success btn-sm" onClick={handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={handleRemoveStudent}>Remove All Student</button>
                {state.studentList.map((student, index)=>{
                    return(
                        <div className="text-white" key={index}>- {student.name}</div>
                    )
                })}
                </div>
            </div>
        )

}

export default CyclopediaFuncPage