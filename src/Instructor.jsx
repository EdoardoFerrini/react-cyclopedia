import React from "react";

class Instructor extends React.Component{
    constructor(props){
        super(props)
    }


    componentDidMount = () =>{
        console.log("component did mount - instructor")
    }

    componentDidUpdate = () =>{
        console.log("component did update - instructor")
    }

    componentWillUnmount = () =>{
        console.log("component will unmount  - instructor")
    }

    render(){
        console.log("render  - instructor")
        return(
            <div>
                <div>
                    
                    Name: {this.props.instructor.name}
                    <br/>
                    Email: {this.props.instructor.email}
                    <br/>
                    Phone: {this.props.instructor.phone}
                    <br/>
                </div>
            </div>
        )
            
        
    }
}
export default Instructor