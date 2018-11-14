import React from 'react';

export default class Notification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        showNotification: this.props.show,
    };
  }

  closeNotification = () => {
    this.setState(state => ({
        showModal: !state.showModal,
    }));
    // this.state.showModal = !this.props.show;
  }


  render() {
    return (
        <div>
            <div className="notification is-primary has-text-centered">
            {/* <button className="delete"></button> */}
                Video clip shared to {this.props.channel}
            </div>
        </div>
    );
  }
}

// export default App;
