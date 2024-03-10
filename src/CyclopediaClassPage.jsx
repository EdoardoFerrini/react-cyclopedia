
import React from "react"
import { getRandomUser } from "./api"
import Instructor from "./Instructor"
class CyclopediaClassPage extends React.Component{
    constructor(props){
        super(props)
        this.state=JSON.parse(localStorage.getItem("cyclopediaState")) ||{
        instructor: undefined,
        studentList : [],
        studentCount : 0,
        hideInstructor: false,
        inputName: "",
        inputFeedback: "",
        }
    }

    componentDidMount = async () =>{
        console.log("Component Did Mount")
        if(JSON.parse(localStorage.getItem("cyclopediaState"))){
            //this.setState(JSON.parse(localStorage.getItem("cyclopediaState")))
        }else{
        const response = await getRandomUser();
        console.log(response)

        this.setState((prevState)=>{
            return{
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email, 
                    phone: response.data.phone_number
                }
            }
        })
    }
    }

    componentDidUpdate =async (prevProps,prevState) =>{
        console.log("Component Did Update")
        localStorage.setItem("cyclopediaState", JSON.stringify(this.state))
        console.log("Old State - " + prevState.studentCount)
        console.log("New State - " + this.state.studentCount)
        if(prevState.studentCount < this.state.studentCount){
            const response = await getRandomUser();
            this.setState((prevstate)=>{
                return{
                    studentList:[
                        ...prevState.studentList,{
                            name: response.data.first_name + " " + response.data.last_name
                        }

                    ]
                }
            })
        }
        else if(prevState.studentCount > this.state.studentCount){
            this.setState((prevstate)=>{
                return{
                    studentList:[]
                }
            })
        }
    }

    componentWillUnmount = () =>{
        console.log("Component Will Unmount")
    }

    handleAddStudent = () =>{
        this.setState((prevState)=>{
            return{
                studentCount: prevState.studentCount + 1
            }
        })
    }

    handleRemoveStudent = () =>{
        this.setState((prevState)=>{
            return{
                studentCount: 0
            }
        })
    }

    handleToggleInstructor = () =>{
        this.setState((prevState)=>{
            return{
                hideInstructor: !prevState.hideInstructor
            }
        })
    }

    render(){
        console.log("render component", this.state.hideInstructor)
        return(
            <div>
                <div className="p-3">
                    <span className="h4 text-success">Instructor</span>
                        <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} btn btn-success btn-sm`}
                            onClick={this.handleToggleInstructor}></i>
                        {!this.state.hideInstructor && this.state.instructor ? (<Instructor instructor={this.state.instructor} />):null}
                </div>
                <div className="p-3">
                    <span className="h4 text-success">Feedback</span>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Name..." 
                        value={this.state.inputName}
                        onChange={(e)=>{this.setState({inputName: e.target.value})}}>
                    </input>{" "}
                    Value: {this.state.inputName}
                    <br/>
                    <textarea 
                        placeholder="Feedback..."
                        value={this.state.inputFeedback}
                        onChange={(e)=>{this.setState({inputFeedback: e.target.value})}}>
                    </textarea>
                    {" "}
                    Value: {this.state.inputFeedback}
                </div>

                <div className="p3">
                <span className="h4 text-success">Students</span>
                <div>Student Count: {this.state.studentCount}</div>
                <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={this.handleRemoveStudent}>Remove All Student</button>
                {this.state.studentList.map((student, index)=>{
                    return(
                        <div className="text-white" key={index}>- {student.name}</div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default CyclopediaClassPage