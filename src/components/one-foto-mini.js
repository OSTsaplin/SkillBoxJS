import React from "react";

const OneFotoMini = (props) => {
  const { item, idCurrentImg, photoOnClick, showFullPhoto, unsplashAct } = props;
  let nmsClass = "foto realFoto";
  if (idCurrentImg == item.id) { nmsClass += " selectFoto"; }
  return (<div key={item.id} className={nmsClass} onClick={ev => photoOnClick(item, unsplashAct)}>
            <div className="onlyPhoto"><img src={item.urlSmall} alt="only photo" width="210px" onClick={ev => showFullPhoto(item)} /></div>
            <span className="caption">Автор:</span><span className="valueInfo">{item.author}</span>&nbsp;&nbsp;
            <span className="caption">Лайков:</span><span className="valueInfo">{item.countLicke}</span><br />
            <span className="caption">Профиль:</span><span className="valueInfo"><a href={item.profile}>Ссылка на профиль автора</a></span><br />
            <span className="caption">Дата публикации:</span><span className="valueInfo">{item.data}</span>
          </div>);
}

export default OneFotoMini;
