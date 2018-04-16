import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/header.css';

class Header extends Component {
	render() {
		return (
			<div className="components-header row">
				
				<Link to="/"><img src={logo} width="40" alt="musicplayer logo" className="-col-auto"/></Link>
				<Link to="/"><h1 className="caption">React Music Player</h1></Link>
				
			</div>
		);
	}
}

export default Header;