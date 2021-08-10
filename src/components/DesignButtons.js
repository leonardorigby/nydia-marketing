const DesignButtons = (props) => {

    return(
        <div className="designBtns-container">
            <i className={"fas fa-th-list designButton " + (props.designStatus=="row" && "active")} onClick={() => props.changeDesignItems("row") }></i>
            <i className={"fas fa-th-large designButton " + (props.designStatus=="column" && "active")} onClick={() => props.changeDesignItems("column") }></i>
        </div>
    );
}

export default DesignButtons;