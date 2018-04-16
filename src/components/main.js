import React, {Component} from 'react';
import $ from 'jquery';

import Header from './header';
import Player from '../page/player';
import {Router, Route} from 'react-router-dom';
import {MUSIC_LIST} from '../data/musiclist';
import MusicList from '../page/musiclist';
import Pubsub from 'pubsub-js';
import createHistory from 'history/createHashHistory';
const history = createHistory();


class Main extends Component {
	constructor(props) {
		super(props);
		this.state={
			musicList: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[4]
		};
	}

	playMusic(musicItem) {
		let player = $('#player')[0];
		player.src = musicItem.file;
		player.play();
		this.setState({
			currentMusicItem: musicItem
		});
	}
	playNext(type='next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicListLength = this.state.musicList.length;
		if(type==="next") {
			newIndex=(index+1)%musicListLength;
		} else {
			newIndex = (index-1+musicListLength)%musicListLength;
		}
		this.playMusic(this.state.musicList[newIndex]);
	}
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem);
	}

	componentDidMount() {
		this.playMusic(this.state.currentMusicItem);
		// 播放下一首
		$('#player').bind('ended', (e)=> {
			this.playNext();
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item=>(item!==musicItem))
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
			this.playNext();
		});
		Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
			this.playNext('prev');
		})
	}

	componentWillUnmount() {
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('PLAY_NEXT');
		Pubsub.unsubscribe('PLAY_PREV');
		$('player').unbind('ended');
	}

	render() {

		const Home=()=>(
			<Player currentMusicItem={this.state.currentMusicItem}/>
		);

		const List=()=>(
			<MusicList currentMusicItem={this.state.currentMusicItem}
			musicList={this.state.musicList} />
		);

		return (
			<Router history={history}>
				<div>
					<Header />
					<audio id="player"></audio>
					<Route exact path="/" component={Home}/>
					<Route path="/list" component={List}/>
				</div>
			</Router>
		)
	};
}

export default Main;