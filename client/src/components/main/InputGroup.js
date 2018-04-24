import React from 'react';

class InputGroup extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { fieldname, placeholder, type, onChange, onBlur, validate, error } = this.props;
        return (
            <div className="input-group mb-30">
                        <input
                            className={ this.props.error ? "form-control error" : "form-control" }
                            placeholder={this.props.placeholder}
                            name={this.props.fieldname}
                            defaultValue={this.props.defaultValue}
                            type={ this.props.type }
                            onChange={ this.props.onChange }
                            onBlur={ this.props.onBlur }
                        />
                        { this.props.error ? <span className="error"> { this.props.error } </span> : ''}
            </div>
        );
    }


}

export default InputGroup;