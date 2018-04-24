import React from 'react';
import InputGroup from './InputGroup';
import IfElse from '../utility/IfElse';

class OrariRow extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div className="row">
              <div className="col-2">
                <p>Ingresso</p>
              </div>
              <div className="col-4">
                <IfElse 
                  condition = {this.props.edit} 
                  ifComponent = {
                    <InputGroup 
                    fieldname = {'in'} 
                    placeholder = { 'Ingresso' } 
                    type = { 'time' }
                    defaultValue = { this.props.row[0] }
                    onChange = { this.props.onChange } 
                    onBlur = { ()=> {} } 
                    validate = {false} 
                    error = {""}
                    />
                  }
                  elseComponent = { <p>{this.props.row[0]}</p> }>
                </IfElse>
                </div>
                <div className="col-2">
                  <p>Uscita</p>
                </div>
                <div className="col-4">
                <IfElse 
                  condition = {this.props.edit} 
                  ifComponent = {
                    <InputGroup 
                      fieldname = {'out'} 
                      placeholder = { 'Uscita' } 
                      type = { 'time' }
                      defaultValue = { this.props.row[1] }
                      onChange = { this.props.onChange } 
                      onBlur = { ()=> {} } 
                      validate = {false} 
                      error = {""}
                  />
                  }
                  elseComponent = { <p>{this.props.row[1]}</p> }>
                </IfElse>
                </div>
              </div>
        );
    }


}

export default OrariRow;