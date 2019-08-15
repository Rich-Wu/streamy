import React from 'react';
import Modal from '../Modal';
import {connect} from 'react-redux';
import {deleteStream} from '../../actions';
import history from '../../history';

const StreamDelete = (props) => {
  const cancel = () => history.push('/');

  const onSubmit = () => {
    props.deleteStream(props.match.params.id);
  };

  const renderActions = (
    <React.Fragment>
      <button className="button ui primary" onClick={onSubmit}>Delete</button>
      <button className="button ui" onClick={cancel}>Cancel</button>
    </React.Fragment>
  );

  return (
    <div>
      <Modal
        onSubmit={onSubmit}
        header='Delete Stream'
        content='Are you sure you wish to delete this stream?'
        action={renderActions}
        redirect={cancel}
      />
    </div>
  );
};

export default connect(null, {deleteStream})(StreamDelete);
