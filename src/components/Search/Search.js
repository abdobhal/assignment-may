import React, { useState, useEffect, useRef} from 'react';
import "./Search.css";
import _ from 'lodash';

const Search = (props) => {

	const [planetInfo, setPlanetInfo] = useState([]);
	const [isLoading, setLoadingStatus] = useState(false);
	const [noResults, setNoResults] = useState(false);
	let allCallsPlanetsData = [];

	const logoutClickHandler = () => {
		sessionStorage.isLoggedIn = false;
        props.history.push('/');
	}

	useEffect (()=>{
		if(!(sessionStorage.isLoggedIn === "true")) {
			props.history.push('/');	
		}
	},[]);

	const debouncedFn = useRef(
	  	_.debounce(async (e) => {
		let enteredValue = e.target.value;
		if(enteredValue.trim().length > 0) {
			let matchedResult = await handleSearchComputation(e.target.value);

			if(matchedResult.length) {
				setPlanetInfo(matchedResult);
				setLoadingStatus(false);
			} else {
				setLoadingStatus(false);
				setNoResults(true);
			}
		} else {
			setPlanetInfo([]);
		}
	  }, 800)
	).current;

	
	const handleSearch = async (e) => {

		e.persist();
		debouncedFn(e);
	}

	const handleSearchComputation = async (inputText, page=1) => {
		if(page === 1) {
			allCallsPlanetsData = [];
		}
		let prom;
		setNoResults(false);
		setLoadingStatus(true);

		await fetch(`https://swapi.dev/api/planets/?page=${page}`)
			.then((response)=> response.json())
			.then((data)=>{
				let matchedPlanet = data.results.filter((planet)=>{
					return planet.name.toLowerCase().indexOf(inputText.toLowerCase()) === 0
				})

				if(data.next !== null) {
					allCallsPlanetsData =[...allCallsPlanetsData, ...matchedPlanet];
					prom = handleSearchComputation(inputText, ++page);
				} else {
					prom = allCallsPlanetsData ;
				}
			})
			return prom;
		
	}


	const planetsList = planetInfo.map((planetData,index)=>{
		return (
			<li key={index + planetData.name}>
				<h4>Name: {planetData.name}</h4>
				<h6 className={planetData.population > 2000000 ? "dense" : ((planetData.population === "unknown" || planetData.population  < 20000) ? null : "light")}>Population: {planetData.population}</h6>
			</li>
		)
	});

	return (

		<div className="container search-page">
			<h1>Search page</h1>
			<a href="/#" className="logout-control" onClick={logoutClickHandler}>Logout</a>
			<input type="text" className="form-control" placeholder="Search planets here..." onChange={handleSearch} />
			
			{isLoading ? <p>Loading ...</p> : null}
			{noResults ? <p>No results found, please try again!</p> : null}

			<ul className="planets-list">
				{planetsList}
			</ul>

		</div>
	)

}

export default Search;