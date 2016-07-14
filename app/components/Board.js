var React = require('react');
var update = require('react-addons-update');
var Plot = require('./Plot');
var ControlBoard = require('../containers/ControlBoard.js');
var Dimensions = require('react-dimensions')
var Templates = require('./Templates');



var Board = React.createClass({
  getInitialState: function(){
    return{
      boardArray: [],
      lifecycles: 0,
      isPlaying: false,
    
    }
  },
  getDefaultProps: function(){
    //Set board width and height if not given as props to this component
    return {
      //something messed up with width and height so that it has to be equal for now
      width:10,
      height:20
    }
  },
  componentWillMount: function(){
    //Fill the board with empty squares for now
    {
    for(var i=0;i<this.props.height;i++){
      var tempArray = [];
      for(var j=0;j<this.props.width;j++){
        if(Math.random()<.5){
          tempArray.push(1);
        }else{
          tempArray.push(0);
        }
      }
      this.state.boardArray.push(tempArray);
    }
  }
  var myTimeline = setInterval(this.handleAdvance,200)
  this.setState({timeline:myTimeline,isPlaying:true})
  },
  loadTemplate: function(name){
    var holdArray = [];
    if(name==="blank"){
      holdArray = Templates.blank;
    }else if(name==="pulsar"){
      holdArray = Templates.pulsar;
    }
    this.setState({boardArray:holdArray,lifecycles:0});
  },
  clearBoard: function(){
    this.handlePause();
    this.loadTemplate("blank");

  },
  pulsar: function(){
    this.handlePause();
    this.loadTemplate("pulsar");
  },
  dimensions: function(cols){
    var proposedWidth = Math.floor(this.props.containerWidth/cols);
    console.log("Container width: " + this.props.containerWidth);
    console.log("Cols: " + cols);
      return proposedWidth;

  },
  handleAddCol: function(){
    this.setState(function(oldState,props){
      return {
        boardArray: this.addCol(oldState.boardArray)
      }
    });
  },
  addCol: function(oldBoardArray){
      //Make a copy of the original array
      {
      var newBoardArray = [];
      for(var i=0;i<oldBoardArray.length;i++){
        var tempArray = [];
        for(var j=0;j<oldBoardArray[i].length;j++){
          tempArray.push(oldBoardArray[i][j]);
        }
        tempArray.push(0); //add an extra to the end of each internal array
      newBoardArray.push(tempArray);
      }

      return newBoardArray;
    }
  },
  handleAddRow: function(){
    this.setState(function(oldState,props){
      return {
        boardArray: this.addRow(oldState.boardArray)
      }
    });
  },
  addRow: function(oldBoardArray){
      //Make a copy of the original array
      {
      var newBoardArray = [];
      for(var i=0;i<oldBoardArray.length;i++){
        var tempArray = [];
        for(var j=0;j<oldBoardArray[i].length;j++){
          tempArray.push(oldBoardArray[i][j]);
        }
      newBoardArray.push(tempArray);
      }

      //Add one extra array of the proper length to the end of the outer array
      var tempArray = [];
      for(var k=0;k<oldBoardArray[0].length;k++){
        tempArray.push(0);
      }
      newBoardArray.push(tempArray);
      return newBoardArray;
    }
  },
  handleRemoveCol: function(){
    this.setState(function(oldState,props){
      return {
        boardArray: this.removeCol(oldState.boardArray)
      }
    });
  },
  removeCol: function(oldBoardArray){
      //Make a copy of the original array, but stop one outer row short
      {
      var newBoardArray = [];
      for(var i=0;i<(oldBoardArray.length);i++){
        var tempArray = [];
        for(var j=0;j<oldBoardArray[i].length-1;j++){
          tempArray.push(oldBoardArray[i][j]);
        }
      newBoardArray.push(tempArray);
      }
      return newBoardArray;
    }
  },
  handleRemoveRow: function(){
    this.setState(function(oldState,props){
      return {
        boardArray: this.removeRow(oldState.boardArray)
      }
    });
  },
  removeRow: function(oldBoardArray){
      //Make a copy of the original array, but stop one outer row short
      {
      var newBoardArray = [];
      for(var i=0;i<(oldBoardArray.length - 1);i++){
        var tempArray = [];
        for(var j=0;j<oldBoardArray[i].length;j++){
          tempArray.push(oldBoardArray[i][j]);
        }
      newBoardArray.push(tempArray);
      }
      return newBoardArray;
    }
  },
  nextBoardArray: function(oldBoardArray){
    //Creates next generation's board based on current generation
    {
      var newBoardArray = [];
      for(var i=0;i<oldBoardArray.length;i++){
        var tempArray = [];
        for(var j=0;j<oldBoardArray[i].length;j++){
          tempArray.push(this.checkResult(i,j));
        }
      newBoardArray.push(tempArray);
      }
      return newBoardArray;
    }
  },
  checkResult: function(x,y){
    //Given a square in the current board state, determine its future
    //in the next generation based on it's current living status
    //and how many neighbors it has
    {
      var neighbors = this.countNeighbors(x,y);
      if(this.state.boardArray[x][y]===1){
        //this square was alive
        if(neighbors<2){
          //not enough neighbors, kill this square
          return 0;
        }else if(neighbors<4){
          //2 or 3 neighbors, stay alive
          return 1;
        }else{
          //too many neighbors, kill this square
          return 0;
        }
      }else if(neighbors===3){
          //this square was dead but has exactly 3 neighbors, resurrect!
          return 1;
      }else{
          //this square was dead and does not have 3 neighbors, stay dead
        return 0;
      }
    }
  },
  countNeighbors: function(x,y){
    //Count the 8 neighbors a given square has (not including itself)
    {
      var debug = false;
      var count = 0;

      if(debug)console.log('Checking -1,-1');
      if(this.state.boardArray[this.checkWidth(x-1)][this.checkHeight(y-1)]===1) count++;
      if(debug)console.log('Checking 0,-1');
      if(this.state.boardArray[this.checkWidth(x)][this.checkHeight(y-1)]===1) count++;
      if(debug)console.log('Checking 1,-1');
      if(this.state.boardArray[this.checkWidth(x+1)][this.checkHeight(y-1)]===1) count++;
      if(debug)console.log('Checking -1,0');
      if(this.state.boardArray[this.checkWidth(x-1)][this.checkHeight(y)]===1) count++;
      if(debug)console.log('Checking 1,0');
      if(this.state.boardArray[this.checkWidth(x+1)][this.checkHeight(y)]===1) count++;
      if(debug)console.log('Checking -1,1');
      if(this.state.boardArray[this.checkWidth(x-1)][this.checkHeight(y+1)]===1) count++;
      if(debug)console.log('Checking 0,1');
      if(this.state.boardArray[this.checkWidth(x)][this.checkHeight(y+1)]===1) count++;
      if(debug)console.log('Checking 1,1');
      if(this.state.boardArray[this.checkWidth(x+1)][this.checkHeight(y+1)]===1) count++;

      if(debug)console.log("Column " + x + " Row " + y + " has " + count + " neighbors.");

      return count;
}
  },
  checkWidth: function(val){
    //See if width for the given coordinate is off the edge, and if so set it to
    //the opposite edge
    {
      if(val<0){
        return this.state.boardArray.length - 1;
      }else if(val>=this.state.boardArray.length){
        return 0;
      }else {
        return val;
      }
    }
  },
  checkHeight: function(val){
    //See if height for the given coordinate is off the edge, and if so set it to
    //the opposite edge
    {
      if(val<0){
        return this.state.boardArray[0].length- 1;
      }else if(val>=this.state.boardArray[0].length){
        return 0;
      }else {
        return val;
      }
    }
  },
  handlePlay: function(){
    //For now, just keep iterating generations
    var myTimeline = setInterval(this.handleAdvance,200)
    this.setState({timeline:myTimeline,isPlaying:true})
  },
  handleAdvance: function(){
    //Handle an individual generation, calling for a new board and incrementing the
    //lifecycles counter
    this.setState(function(oldState,props){
      return {
        lifecycles: oldState.lifecycles + 1,
        boardArray: this.nextBoardArray(oldState.boardArray)
      }
    });
  },
  handlePause: function(){
    clearInterval(this.state.timeline);
    this.setState({isPlaying:false})

  },
  toggle: function(a,b){
    //Use React's immutability helper to alter the state of a single Plot (square)
    var aNum = parseInt(a)
    var newArray = update(this.state.boardArray, {[a]: {[b]: {$apply: function(x) {if(x===0){return 1}else return 0;}}}});
    this.setState({boardArray:newArray});
  },
  render: function(){
    var sizeOfPlot = this.dimensions(this.state.boardArray[0].length);

    return(
      <div >

      <ControlBoard isPlaying={this.state.isPlaying} onAddRow={this.handleAddRow} lifecycles={this.state.lifecycles} onRemoveRow={this.handleRemoveRow} onAddCol={this.handleAddCol} onRemoveCol={this.handleRemoveCol} onAdvance={this.handlePlay} onPulsar={this.pulsar} onPause={this.handlePause} onClear={this.clearBoard}/>

      {this.state.boardArray.map(function(e,indE){
        var arr = e.map(function(q,indQ){
          return <Plot toggleFunc={this.toggle.bind(this,indE,indQ)} dim={sizeOfPlot} coordX={indE} coordY={indQ} status={q} />
        },this)
        arr.push(<div className="endRow" />);
        return arr
      },this)}

        </div>

    )
  }


});

module.exports = Dimensions()(Board);
