import React from "react";

const DropDownBtn = (props) => {
  const { ALi, addImg, idCurrentLi, unsplashAct, idImg } = props;

  if ((ALi.length == 0)||(unsplashAct == 0)) {
    return null
  } else {
    return <div className="galleryBtn">
              <button className="galleryBtn" onClick={ev => addImg(idCurrentLi, idImg)} disabled={idImg=="-1"}>Добавить фото в</button>
              <select className="galleryBtn" disabled={(idImg == "-1") ? "disabled" : ""}>
              {
                ALi.map(item => {
                    if (item.id == idCurrentLi) {
                      return <option key={item.id} onClick={ev => addImg(item.id, idImg)} selected>{item.caption}</option>
                    } else {
                      return <option key={item.id} onClick={ev => addImg(item.id, idImg)}>{item.caption}</option>
                    }
                  }
                )
              }
              </select>
           </div>
  }
}

export default DropDownBtn;
