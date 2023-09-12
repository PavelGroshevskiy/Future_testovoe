import React from "react";
import MyInput from "../../../../UI/MyInput/MyInput";
import style from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setInputSearch } from "../../store/findSlice";

const Search = () => {
	const [value, setValue] = React.useState("");

	const dispatch = useDispatch();
	const inputRef: any = React.useRef();

	const onSearchDebounce = React.useCallback(
		debounce((str) => {
			dispatch(setInputSearch(str));
		}, 500),
		[]
	);

	const onChangeInput = (e: any) => {
		setValue(e.target.value);
		onSearchDebounce(e.target.value);
	};

	return (
		<div className={style.search}>
			<svg
				className={style.iconSearch}
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title />
				<g data-name="1" id="_1">
					<path d="M221.12,389.43A173.22,173.22,0,0,1,98.25,338.61c-67.75-67.75-67.75-178,0-245.74s178-67.75,245.74,0A173.69,173.69,0,0,1,221.12,389.43Zm0-317.39a143.37,143.37,0,0,0-101.66,42c-56,56.06-56,147.26,0,203.32A143.77,143.77,0,1,0,322.78,114.08h0A143.35,143.35,0,0,0,221.12,72Z" />
					<path d="M221.12,332.16a116.42,116.42,0,1,1,82.36-34.06A116.1,116.1,0,0,1,221.12,332.16Zm0-202.86a86.44,86.44,0,1,0,61.15,25.29A86.22,86.22,0,0,0,221.12,129.3Z" />
					<path d="M414.82,450.44a40.78,40.78,0,0,1-29-12L302.89,355.5a15,15,0,0,1,21.22-21.22L407,417.21a11,11,0,1,0,15.55-15.55l-82.93-82.93a15,15,0,1,1,21.22-21.22l82.93,82.93a41,41,0,0,1-29,70Z" />
				</g>
			</svg>
			<MyInput
				placeholder="Поиск по книгам"
				value={value}
				ref={inputRef}
				onChange={onChangeInput}
			/>

			{value && (
				<svg
					onClick={() => {
						dispatch(setInputSearch(""));
						setValue("");
						inputRef.current?.focus();
					}}
					className={style.iconClose}
					data-name="Capa 1"
					id="Capa_1"
					viewBox="0 0 20 19.84"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
				</svg>
			)}
		</div>
	);
};

export default Search;
