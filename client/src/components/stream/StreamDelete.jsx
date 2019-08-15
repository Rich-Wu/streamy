import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import {deleteStream, fetchStream} from '../../actions';
import history from '../../history';

class StreamDelete extends Component {
  cancel = () => history.push('/');

  onSubmit = () => {
    this.props.deleteStream(this.props.match.params.id, this.props.userId);
  };

  renderActions = (
    <React.Fragment>
      <button className="button ui primary" onClick={this.onSubmit}>Delete</button>
      <Link className="button ui" to="/">Cancel</Link>
    </React.Fragment>
  );

  renderContent = () => {
    if (!this.props.stream) return "Are you sure you wish to delete this stream?";
    return `Are you sure you wish to delete "${this.props.stream.title}"?`;
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return (
      <Modal
        onSubmit={this.onSubmit}
        header='Delete Stream'
        content={this.renderContent()}
        action={this.renderActions}
        redirect={this.cancel}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);
