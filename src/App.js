import React from 'react';
import 'bulma/css/bulma.css'
import './App.css';
import axios from 'axios';
import Notification from './components/Notification';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonIsClicked: false,
      dropdownIsClicked: false,
      NotificationIsShown: false,
      channels:[],
      shareTo:'',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
        buttonIsClicked: !state.buttonIsClicked
    }));
  }

  closeModal = () => {
    this.setState(state => ({
      buttonIsClicked: false
    }));
  }

  toggleDropdown = () => {
    this.setState(state => ({
      dropdownIsClicked: !state.dropdownIsClicked
    }));
  }

  renderChannels() {
    return this.state.channels.map(this.state.channels, (channel, key) => {
      return (
        <li className="list-group-item" key={key}>
            {channel.name}
        </li>
      );
    });
  }

  showMessage = () => {
    this.setState(state => ({
      NotificationIsShown: true
    }));
    //make message disappear after 3 seconds
    setInterval(() => {
      this.setState(state => ({
        NotificationIsShown: false
      }));
    }, 3000);
  }

  shareToSlack = () => {
    axios.post('https://test-api.loop11.com/v1/slack/',{
      "channel": this.state.shareTo
    })
    this.closeModal();
    this.showMessage();
  }

  handleChange(event){
    this.setState({ shareTo: event.target.value });
  }

  componentDidMount(){
    axios.get('https://test-api.loop11.com/v1/slack/')
    .then(({ data })=> {
      this.setState(
        { channels: data.channels }
      );
    })
    .catch((err)=> {})
  }


  render() {
    return (
      <div className="App">
        <div className={!this.state.NotificationIsShown ? 'hiding' : '' }>
          <Notification channel={this.state.shareTo}></Notification>
        </div>
        <header className="App-header">
          <button onClick={this.handleClick} className="button is-primary is-medium is-fullwith">Click</button>
          {/* modal */}
          <div className={ this.state.buttonIsClicked  ? 'modal is-active' : 'modal' }>
            <div className="modal-background" onClick={ this.closeModal }></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title text-left">Share video clip</p>
                    <button className="delete" aria-label="close" onClick={ this.closeModal }></button>
                </header>
                <section className="modal-card-body">
                    <p>Select slack channel</p>
                    <p className="title is-5">To share this clip, add email address separated by commas, then click 'Send'.</p>
                    {/* dropdown options */}
                    <div className="select is-medium">
                      <select value={this.state.shareTo} onChange={this.handleChange} >
                        {/* { channels } */}
                        { this.state.channels.map( (channel,key) => (
                            <option value={channel.name} key={key}>{channel.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    {/* end of dropdown options */}

                </section>
                <footer className="modal-card-foot">
                  <button className="button is-primary is-fullwidth" disabled={ this.state.shareTo === '' } onClick={this.shareToSlack}>Share with slack</button>
                </footer>
            </div>
          </div>
          {/* end of modal code */}
        </header>
      </div>
    );
  }
}

export default App;
