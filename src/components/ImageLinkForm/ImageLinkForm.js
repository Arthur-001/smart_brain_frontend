import React, { useState } from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!url) {
            // setErrorMessage("Enter a URL");
            window.alert("Enter a URL")
        } 
        // else if (!/^https?:\/\/.+\.(jpg|jpeg)$/i.test(url)) {
        //     window.alert("Picture is not JPG")
        //     // setErrorMessage("Picture is not JPG");
        // } 
        else {
            // Do your form submission here
            onButtonSubmit();
            setErrorMessage("");
        }
    };

    const clickEnter = (event) => {
        if (event.key === 'Enter')
          handleSubmit(event);
      }

    return (
        <div>
            <p className="f3 white">{'Detect face from image'}</p>
            <div className="center">
                <div className="form-container round_shapes">
                    <div className="form center pa4 br3 shadow-5 ">
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <input
                            className="f4 pa2 w-70 center"
                            type={'text'}
                            onChange={ (event) => {
                                setUrl(event.target.value);
                                onInputChange(event);
                            }}
                            onKeyDown={clickEnter}
                            value={url}
                        />
                        <button
                            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                            onClick={handleSubmit}
                        >
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;