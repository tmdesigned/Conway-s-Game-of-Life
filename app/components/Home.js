var React = require('react');
var Board = require('./Board.js');

var Home = React.createClass({

  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-xs-12 col-sm-12" id="headerDiv">
              <span className="lead">Conway's Game of Life</span>
              <p className="text-info">A project demonstrating React by Taylor Morgan | <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"><small>What is this game?</small></a></p>
            </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
            <Board width={40} height={20} />
            </div>
        </div>
      </div>
    )

  }

});

module.exports = Home;
