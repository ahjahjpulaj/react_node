import React from 'react';
import InputGroup from './InputGroup';

class TimesheetRow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div className="row piano-row">
            <div className="col-2">
            <InputGroup 
                fieldname = {'numeroOre'} 
                placeholder = { 'N. Ore' } 
                type = { 'number' }
                onChange = {(e) => this.handleChange(e)} 
                onBlur = { ()=> {} } 
                validate = {false} 
                error = {""}
            />
            </div>
            <div className="col-9">
            <InputGroup 
                fieldname = {'description'} 
                placeholder = { 'Descrizione attività' } 
                type = { 'text' }
                onChange = { (e) => this.handleChange(e) } 
                onBlur = { ()=> {} } 
                validate = {false} 
                error = {""}
            />
            </div>
            <div className="col-1">
            <button type="button" className="btn btn-add-row" 
                onClick={ (e) => this.addRow(e) }>
                <i className="material-icons">add</i>
            </button>
            </div>
        </div>
    );
    }

    }
    
    export default TimesheetRow;