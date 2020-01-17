import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import Modl from './Modl.jsx';
import exampleData from '../example-data/exampleData';
import '../styles/App.scss';
//___style______________________________________________________
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
//_________________________________________________________

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'None',
      bugs: exampleData,
      everything: exampleData,
      modalIsOpen: false
    };

    this.filterHandler = this.filterHandler.bind(this);
    //__binding current with changes_____________________
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  //_________Methods_____________________________________
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  //_________________________________________________________
  filterHandler(filter) {
    console.log(filter)
    if (filter !== "None") {
      console.log(this.state.bugs)
      var currentData = this.state.bugs
      var result = currentData.filter(word => word.threatLevel === filter);
      console.log(result)
      this.setState({ bugs: result })
    } else if (filter === "None") {
      this.setState({ bugs: this.state.everything })
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/data")
      .then(anything => anything.json())
      .then(any => this.setState({ bugs: any }))
      .then(() => this.setState({ everything: this.state.bugs }))
      .then(() => (console.log(this.state)))

  }

  render() {
    return (
      <div>
        {/* ____this is hard coded modal_____________________________________ */}
        <button onClick={this.openModal}>Open Modal</button>
        <div>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>add user</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              bugName: <input id = "one" /> <br />
              bugDescription: <input  id = "two"/><br />
              reportedBy:<input id = "three"  /><br />
              createdDate:<input  id = "four" /><br />
              assignedTo: <input id = "five"/><br />
              threatLevel: <input id = "six"/><br />
              </form>
              <button onClick={() => {
                var form = new FormData();
                //   form.append("bugName", document.getElementById("one").value)
                //   form.append("bugDescription", document.getElementById("two").value)
                //   form.append("reportedBy", document.getElementById("three").value)
                //   form.append("createdDate", document.getElementById("four").value)
                //  form.append( "assignedTo", document.getElementById("five").value)
                //   form.append("threatLevel", document.getElementById("six").value)
                console.log(form)
               //_________________________________________________
               var obj = {
                "bugName": document.getElementById("one").value,
                "bugDescription": document.getElementById("two").value,
                "reportedBy": document.getElementById("three").value,
                "reportedBy": document.getElementById("three").value,
                "createdDate": document.getElementById("four").value,
                "assignedTo": document.getElementById("five").value,
                "threatLevel": document.getElementById("six").value,
               }
               console.log(obj.json())
                // form.append("json",JSON.stringify(obj))

                fetch("http://localhost:3000/api/data", {
                  body: JSON.stringify(obj),
                  method: 'Post',
                  headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
                  // headers: {
                  //   'Accept': 'application/json',
                  //   'Content-Type': 'application/json'
                  // }
                })
               .then((response) =>response.json())
                .then((data) => {
                 console.log('Success:', data);
                 })
                  //.then((response) => response.json())
                //   //queries.create(obj)
                //     .then(res.send(obj))
                // })
              }}>submit</button>

            
          </Modal>
        </div>
        {/* ___________________________________________________ */}
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
      </div>
    );
  }
}
//ReactDOM.render(<App />, appElement)
export default App;
