import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import '../styles/components/SideBarField.css';

const SideBarField = (props) => {
    return (
        
        <div>
            {
            props.exact
            ?   <NavLink exact className="link" activeClassName="active" to={props.link}>
                    <div className="b-col">
                    <div className="b-link">
                    <div className="b-icon">
                        <i className={"fas fa-" + (props.icon) + " icon-menu"}></i>
                        </div>
                        <span>{props.name}</span>
                    </div>
                    </div>
                </NavLink>

            :   <NavLink className="link" activeClassName="active"  to={props.link}>
                    <div className="b-col">
                    <div className="b-link">
                    <div className="b-icon">
                    <i className={"fas fa-" + (props.icon) + " icon-menu"}></i>
                        </div>
                        <span>{props.name}</span>
                    </div>
                    </div>
                </NavLink>
            }
        </div>
        

    );

}

export default SideBarField;