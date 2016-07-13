var React = require('react');
var Board = require('./Board.js');

var Home = React.createClass({

  render: function(){
    return(
      <div className="container">
        <div className="col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
          <Board width={50} height={50} />
        </div>
      </div>
    )

  }

});

module.exports = Home;
