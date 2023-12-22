import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Initialise a variable 'x' to 0.
    let x = 0;
    // Set up an interval that will execute the code inside the arrow function every 100 milliseconds.
    const interval = setInterval(() => {
      // Call a function 'getData' from the 'DataStreamer' object, passing a callback function as an argument.
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Inside the callback function, update the state of the component using 'setState'.
      // Set the 'data' property of the state to the received 'serverResponds' data.
      // Set the 'showGraph' property to 'true'.
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      // Increment the value of 'x'.
      x++;
      // If 'x' becomes greater than 1000, clear the interval to stop further executions.
      if (x > 1000){
        clearInterval(interval);
      }
    }, 100); // Interval set to 100 milliseconds.
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
