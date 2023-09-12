import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (
	<ContentLoader
		speed={2}
		width={200}
		height={400}
		viewBox="0 0 200 400"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="23" y="222" rx="3" ry="3" width="88" height="6" />
		<rect x="27" y="294" rx="3" ry="3" width="52" height="6" />
		<rect x="22" y="12" rx="0" ry="0" width="138" height="196" />
		<rect x="24" y="242" rx="0" ry="0" width="132" height="35" />
	</ContentLoader>
);

export default Skeleton;
