import React from 'react';


const Adv = ( { img, alt, text, link, id } ) => (
    <div className="margin-bottom-30" id={ id }>
        <div className="card">
            <img className="card-img-top" src={require('../../' + img )} alt= { alt } />
            <div className="card-body">
                <p className="card-text"> { text } </p>
            </div>
        </div>
    </div>
);

export default Adv;