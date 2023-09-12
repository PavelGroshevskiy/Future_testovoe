import React from "react";
import style from "./FindResultCount.module.scss";

const FindResultCount = ({ countResult }: any) => {
	return <h4 className={style.result}>Найдено всего {countResult}</h4>;
};

export default FindResultCount;
