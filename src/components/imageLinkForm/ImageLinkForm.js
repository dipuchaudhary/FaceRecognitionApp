import React from "react";
import  "./ImageLink.css";
const ImageLinkForm = () => {
  return (
    <div className="f3">
      <p>
        {"This Magic brain will detect a faces in a pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input type="text" className="f4 pa2 w-70 center" placeholder="Image url" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
