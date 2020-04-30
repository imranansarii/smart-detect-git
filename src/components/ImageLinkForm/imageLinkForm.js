import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmitChange }) => {
    return (
        <div className="imageLink">
            <p className="imgParagraph">
                {'This Smart Detctor will detct the faces in your picture. Give a try...'}
            </p>

            <div className="imageInputArea">
                <input type="text" placeholder="Place the url..." 
                onChange = {onInputChange}></input>
                <button className="imageButton" onClick={onSubmitChange}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;