import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import flv from 'flv.js';

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    if (this.player || !this.props.stream || !flv.isSupported()) return;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://192.168.1.11:8000/live/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentWillUnmount() {
    if (this.player) this.player.destroy();
  }

  render() {
    if (!this.props.stream) return <div>loading...</div>
    return (
      <div>
        <video
          ref={this.videoRef}
          style={{ width: '100%' }}
          controls
        >
          <source
            src={`http://192.168.1.11:8000/live/${this.props.match.params.id}/index.m3u8`}
            type='application/x-mpegURL'
          />
        </video>
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);
