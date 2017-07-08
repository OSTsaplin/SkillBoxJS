import React from "react";
import { indexOfByID } from '../unit/sys-proc';
// import {unsplash} from "../unit/sys-proc";

const FavorePn = (props) => {
  const { favoreState, getListImg, addLi, renameLi, clearLi, deleteLi, deleteALL, getUnsplashImg } = props;  // , getUnsplashImg
  const ALi = favoreState.ALi;
  const btnDisable = favoreState.btnDisable;
  const currentLi = favoreState.currentLi;
  const unsplashClass = favoreState.unsplashActive == 0 ? "" : "unsplashActive";
  const j = indexOfByID(ALi, currentLi);
  const nmsPart = unsplashClass != '' ? '' :  ((currentLi < 0)||(j < 0) ? '': ' "'+ALi[j].caption+'"');

  return (
    <aside className='share favore'>
      <ul>
        <li className={unsplashClass} onClick={ev => getUnsplashImg(1)}>Галерея <b>Unsplash</b></li>
        {
          ALi.map((item) => {
            const id = item.id;
            return (<li key={"li"+id} className={(currentLi == id ? "blueLi": "")} onClick={ev => getListImg(item,1)}>{item.caption+" ("+item.count+")"}</li>)
          })
        }
      </ul>
      <div className="favorBtnDiv">
        <button className="btn" id="btnAddPart" onClick={ev => addLi()}>Добавить раздел</button>
        <button className="btn" id="btnRenamePart" onClick={ev => renameLi()} disabled={btnDisable}>Переименовать раздел{nmsPart}</button>
        <button className="btn" id="btnClrPart" onClick={ev => clearLi()} disabled={btnDisable}>Очистить раздел{nmsPart}</button>
        <button className="btn" id="btnDelPart" onClick={ev => deleteLi()} disabled={btnDisable}>Удалить раздел{nmsPart}</button>
        <button className="btn" id="btnDelALL" onClick={ev => deleteALL()}>Удалить все разделы</button>
      </div>
    </aside>
  )
}

export default FavorePn;
