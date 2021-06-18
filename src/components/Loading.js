import React, { useState } from 'react';

const Loading = (props) => {
    return(
        <div className={"loading-container " + (props.loading ? "active" : "" )}>
            <div className="b-loading">
                <img src="/nydia-loading-icon.gif" alt="loading-icon" />
            </div>
        </div>
    );
};

export default Loading;