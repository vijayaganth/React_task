import React, { Component }  from 'react';
import TemplateForm from "./TemplateForm"
import SideNav from "./SideNav"

class Template extends Component {

    constructor(props){
        super(props);
        this.state = {
            insertVariable:""
        }
     }

    selectVariable = ( insertVariable ) => this.setState({ insertVariable });

    render(){

        const { insertVariable } = this.state; 
        
        return(
            <div className="wrapper">
                <TemplateForm insertVariable={insertVariable} />
                <SideNav selectVariable={this.selectVariable} />
            </div>
        );
    }
}

export default Template;