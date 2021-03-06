import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues, this.props.userId);
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) return <div>loading...</div>
    return (
      <div>
        <h3>Edit Your Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit} 
          initialValues={
            {
              title: this.props.stream.title,
              description: this.props.stream.description
            }
          }/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
