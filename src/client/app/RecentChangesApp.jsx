import React from 'react';

var Heading = React.createClass({
  render: function () {
    var headingStyle = {
      backgroundColor: 'FloralWhite',
      fontSize: '19px'
    };
    return (<th style={headingStyle}> {this.props.heading} </th>);
  }
});
var Headings = React.createClass({
  render: function () {
    var headings = this.props.headings.map(function (name, index) {
      return (<Heading key={"heading-" + index} heading={name}/>);
    });

    return (<tr className='table-th'> {headings} </tr>);
  }
});
var Row = React.createClass({
  render: function () {
    var trStyle = {backgroundColor: 'aliceblue'};
    return (<tr style={trStyle}>
      <td> {this.props.changeSet.when} </td>
      <td> {this.props.changeSet.who} </td>
      <td> {this.props.changeSet.description} </td>
    </tr>);
  }
});
var Rows = React.createClass({
  render: function () {
    var rows = this.props.changeSets.map(function (changeSet, index) {
      return (<Row key={index} changeSet={changeSet}/>);
    });

    return (<tbody>{rows}</tbody>);
  }
});

var RecentChangesApp = React.createClass({

  getDefaultProps() {
    return {
      headings: ['Update at', 'Author', 'Change']
    };
  },

  getInitialState: function () {
    return {changeSets: []};
  },
  mapOpenLibraryDataToChangeSet: function (data) {
    return data.map(function (change, index) {
      return {
        "when": jQuery.timeago(change.timestamp),
        "who": change.author.key,
        "description": change.comment
      }
    });
  },
  componentDidMount: function () {
    $.ajax({
      url: 'http://openlibrary.org/recentchanges.json?limit=10',
      context: this,
      dataType: 'json',
      type: 'GET'
    }).done(function (data) {
      var changeSets = this.mapOpenLibraryDataToChangeSet(data);
      this.setState({changeSets: changeSets});
    });
  },

  render: function () {
    return (<table className='table'>
      <Headings headings={this.props.headings}/>
      <Rows changeSets={this.state.changeSets}/>
    </table>);
  }
});

export default RecentChangesApp;
