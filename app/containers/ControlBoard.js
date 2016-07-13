var React = require('react');
var PropTypes = React.PropTypes;

function ControlBoard (props){

    return(
      <div>
      <button type="button" onClick={props.onAdvance} className="btn btn-success">Play</button>
      <button type="button" onClick={props.onPause} className="btn btn-warning">Pause</button>
      <button type="button" onClick={props.onClear} className="btn btn-danger">Clear</button>
      <button type="button" onClick={props.onPulsar} className="btn">Pulsar</button>

      </div>
    )


}

ControlBoard.propTypes = {
  onAdvance : PropTypes.func.isRequired
}

module.exports = ControlBoard;
