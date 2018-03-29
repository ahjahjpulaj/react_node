import React from 'react';

export default class IfElse extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        if (this.props.condition){
            return this.props.ifComponent;
        }else{
            return this.props.elseComponent;
        }
    }
}