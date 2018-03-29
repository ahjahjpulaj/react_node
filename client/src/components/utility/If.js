import React from 'react';

export default class If extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        if (this.props.condition){
            return <div>
                {this.props.children}
            </div>
        }else{
            return null;
        }
    }
}