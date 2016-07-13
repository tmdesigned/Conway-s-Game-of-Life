var React = require('react');
var PlotStyle = require('../theme/plots.scss');


var Plot = React.createClass({
  getDefaultProps:function(){
    //0-dead, 1-alive
    return{
      status:0
    }
  },
  render: function(){

    return(
      <PlotSquare dim={this.props.dim} toggleFunc={this.props.toggleFunc} coordX={this.props.coordX} coordY={this.props.coordY} status={this.props.status} />
    )
  }

})

function PlotSquare(props){

  var dimensionString = props.dim;
  var dimensionObj = {
    'width':dimensionString,
    'height':dimensionString
  }
  if(props.status){
    return(
      <div className="livingSquare" style={dimensionObj} onClick={props.toggleFunc}></div>
    )
  }else{
    return(
      <div className="deadSquare" style={dimensionObj} onClick={props.toggleFunc}></div>
    )
  }
}

module.exports = Plot;
