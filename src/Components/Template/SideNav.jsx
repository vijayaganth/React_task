import React, { Component }  from 'react';

class SideNav extends Component {

    constructor(props){
       super(props);
       this.state = {
           variableList: [
               "stone_name", "material_type", "stone_1_pcs", "stone_1_weight", "stone_2_pcs", "stone_2_pcs", "stone_2_weight", "stone_1_cut"
           ]
       }
    }

    selectVariable = (e) => this.props.selectVariable(e)

    render(){

        const { variableList } = this.state;

        return(
            <div className="side-nav">
                <h2>Template variable</h2>
                <p>Use these variable in place of data which changes for every variant.</p>

                <ul>
                    {variableList.map((element, index)=>{
                        return <li key={index} onClick={()=>this.selectVariable(element)}>{element}</li>
                    }) }
                </ul>
            </div>
        );
    }
}

export default SideNav;