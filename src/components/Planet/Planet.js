import React from 'react';

const Planet = (props) => {
	return (
		<li>
			<h4>Name: {props.name}</h4>
			<h6 className={props.population > 2000000 ? "dense" : ((	props.population === "unknown" || props.population  < 	20000) ? null : "light")}>Population: {props.population}</h6>
		</li>
	)
}

export default Planet;