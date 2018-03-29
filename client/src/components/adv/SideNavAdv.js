import React, { Component } from 'react';
import adv from "../../img/adv/adv.json";

import Adv from "./Adv";

const path = "img/adv/";

let array = adv.adv;

let advertising = [];

for(let i = 0; i< 4; i++){
    let newArray = array.splice(Math.floor(Math.random()*array.length),1);
    advertising.push(newArray[0]);
}

const advertisingComponent = advertising.map(elem => {
    return <Adv img= { path+elem.img } alt={ elem.alt } text={ elem.text } link= {elem.link} id = {elem.id}/>
})

const SideNavAdv = () => (
    <div>
        {advertisingComponent}
    </div>
);

export default SideNavAdv;
