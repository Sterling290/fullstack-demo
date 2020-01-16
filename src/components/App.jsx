import React from 'react';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import exampleData from '../example-data/exampleData';

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'None',
      bugs: exampleData,
      everything:exampleData
    };
    this.filterHandler = this.filterHandler.bind(this);
  }

  filterHandler(filter) {
    console.log(filter)
    if(filter !== "None"){
      console.log(this.state.bugs)
      var currentData = this.state.bugs
      var result = currentData.filter(word =>word.threatLevel === filter);
      console.log(result)
      this.setState({bugs:result})
    }else if(filter === "None"){
      this.setState({bugs:this.state.everything})
    }
    
    //.then((something) =>{console.log(something)})
  }
  componentDidMount(){
     fetch("http://localhost:3000/api/data")
     .then(anything=> anything.json())
    .then(any => this.setState({bugs: any}))
    .then(()=>this.setState({everything:this.state.bugs}))
    .then(()=>(console.log(this.state)))
    
  }

  render() {
    return (
      <table>
        <Nav
          filterHandler={this.filterHandler}
        />
        {this.state.bugs.map((bug) => (
          <BugTile
            bugName={bug.bugName}
            bugDescription={bug.bugDescription}
            reportedBy={bug.reportedBy}
            createdDate={bug.createdDate}
            assignedTo={bug.assignedTo}
            threatLevel={bug.threatLevel}
            key={bug.bugName}
          />
        ))}
      </table>
    );
  }
}

export default App;
