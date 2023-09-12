import React from "react";

const Button = React.forwardRef(({ children, ...props }, ref) => {
	return (
		<button ref={ref} {...props}>
			{children}
		</button>
	);
});

export default Button;
