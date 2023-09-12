import React from "react";
import style from "./MyInput.module.scss";

const MyInput = React.forwardRef((props: any, ref) => {
	return <input ref={ref} className={style.input} type="text" {...props} />;
});

export default MyInput;
