import React, {Component} from 'react';

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '692875803126-p34s9j0le225v0cs89tk7kdoootc65hg.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  renderAuthButton() {
    if(this.state.isSignedIn === null) {
      return null;
    } else if(this.state.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onSignInClick}>
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  };
}

export default GoogleAuth;
