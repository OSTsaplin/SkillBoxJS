import React from "react";
import { getPropsPhoto } from "../unit/sys-proc";

const OneFotoMini = (props) => {
  const { item, idCurrentImg, photoOnClick, showFullPhoto } = props;
  let nmsClass = "foto realFoto";
  if (idCurrentImg == props.item.id) { nmsClass += " selectFoto"; }
  return (<div key={props.item.id} className={nmsClass} onClick={ev => photoOnClick(item)}>
            <div className="onlyPhoto"><img src={item.urlSmall} alt="only photo" width="210px" onClick={ev => showFullPhoto(item)} /></div>
            <span className="caption">Автор:</span><span className="valueInfo">{item.author}</span>&nbsp;&nbsp;
            <span className="caption">Лайков:</span><span className="valueInfo">{item.countLicke}</span><br />
            <span className="caption">Профиль:</span><span className="valueInfo"><a href={item.profile}>Ссылка на профиль автора</a></span><br />
            <span className="caption">Дата публикации:</span><span className="valueInfo">{item.data}</span>
          </div>);
}

export default OneFotoMini;
