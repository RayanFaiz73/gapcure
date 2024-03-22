import React from "react";
import ReactDom from "react-dom";

const PhotoPicker = ({ onChange }: {onChange: any;}) => {
    const component = (<input type="file" hidden id="photo-picker" onChange={onChange} />)
    return  ReactDom.createPortal(
        component,
        document.getElementById("photo-picker-element") as HTMLElement
    );
}


export default PhotoPicker;