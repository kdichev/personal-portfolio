import React, { Component } from 'react';

class Data extends Component {
  render() {
    const {data} = this.props
    return (
      <div>
        {data.map(item => <p>{item}</p>)}
      </div>
    );
  }
}

export default Data
