import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imgUrl, box, gender }) => {
    return (
        <div className="imgBox">
            <div className="img-content">
                <img id="inputImage" src={imgUrl} alt='' width="500px" height="auto" />
                {box.map((item, index) => (
                    <div className='bounding-box' style={{ top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol, color : "blue", fontWeight : "bold", fontSize : "20px" }} key={index}>{item.genderName}</div>
                ))}

            </div>
        </div>
    );
}

export default FaceRecognition;