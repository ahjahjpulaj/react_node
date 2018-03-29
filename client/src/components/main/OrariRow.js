import React from 'react';
import InputGroup from './InputGroup';
import IfElse from '../utility/IfElse';

class OrariRow extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        const { edit, onChange } = this.props;
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
                    value = { '' }
                    onChange = { this.props.handleChange } 
                    onBlur = { ()=> {} } 
                    validate = {false} 
                    error = {""}
                    />
                  }
                  elseComponent = {" Orario test ingresso "}>
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
                      value = { '' }
                      onChange = { this.props.handleChange } 
                      onBlur = { ()=> {} } 
                      validate = {false} 
                      error = {""}
                  />
                  }
                  elseComponent = {" Orario test uscita "}>
                </IfElse>
                </div>
              </div>
        );
    }


}

export default OrariRow;