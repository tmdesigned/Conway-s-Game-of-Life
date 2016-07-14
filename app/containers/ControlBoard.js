var React = require('react');
var PropTypes = React.PropTypes;

function ControlBoard (props){

    return(

        <div>
          <button type="button" onClick={props.isPlaying ? props.onPause : props.onAdvance}
            className="btn btn-success">{props.isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>

        <button type="button" onClick={props.onClear} className="btn btn-danger marginLeft">Clear</button>
        <div className="btn-group paddingLeft">
          <button type="button" onClick={props.onRemoveRow} className="btn">-</button>
          <button type="button" className="btn disabled">Row</button>
          <button type="button" onClick={props.onAddRow} className="btn">+</button>
        </div>
        <div className="btn-group paddingLeft">
          <button type="button" onClick={props.onRemoveCol} className="btn">-</button>
          <button type="button" className="btn disabled">Col</button>
          <button type="button" onClick={props.onAddCol} className="btn">+</button>
        </div>
        <div className="btn-group paddingLeft">
          <button type="button" className="btn disabled">Examples</button>
          <button type="button" onClick={props.onGliders} className="btn marginLeft">1</button>
          <button type="button" onClick={props.onPulsar} className="btn marginLeft">2</button>
          <button type="button" onClick={props.onGliderGun} className="btn marginLeft">3</button>

        </div>
        <div className="displayText">Lifecycles: {props.lifecycles}
        </div>

      </div>
    )


}

ControlBoard.propTypes = {
  onAdvance : PropTypes.func.isRequired
}

module.exports = ControlBoard;
