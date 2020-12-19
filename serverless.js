const { Component } = require('@serverless/core');
const React = require('react');
const { deploy } = require('./lib');

const DynamodbTable = React.forwardRef(({ name, ...props }, ref) =>
  React.createElement('aws-dynamodb', {
    ref,
    alias: name,
    name,
    region: 'ap-southeast-2',
    ...props
  })
);

class App extends Component {
  async default() {
    const ref = React.createRef();

    return await deploy(
      React.createElement(DynamodbTable, {
        ref,
        name: 'react-serverless'
      }),
      this
    );
  }
}

module.exports = App;
