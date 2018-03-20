import React, {Fragment, PureComponent} from 'react';
import logo from '../logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

class App extends PureComponent {

  handleFiles = (event) => {
    const file = event.target.files[0];
    //TODO: validate file extension *.properties only
    this.fileName = file.name;

    this.readFileToString(file)
      .then(data => {
        console.log(data);
        this.data = data;
        console.log(this.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  exportToFile = () => {
    if (!this.fileName || !this.data) {
      //TODO: show notification
      return;
    }

    const exportData = `data:text/plain;charset=utf-8,${this.data}`;
    const encodedUri = encodeURI(exportData);
    const download = document.createElement('a');

    download.setAttribute('href', encodedUri);
    download.setAttribute('download', this.fileName);

    download.click();
  };

  constructor(props) {
    super(props);

    this.fileName = '';
    this.data = '';
  }

  readFileToString(fileBlob) {
    if (!fileBlob) return;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        resolve(e.target.result);
      };
      reader.onerror = error => {
        reject(error);
      };

      reader.readAsText(fileBlob, 'utf8');
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar
          title="Menu Bar"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <input type="file" id="input" onChange={this.handleFiles} accept=".properties"/>
          <RaisedButton label="Export" primary={true} onClick={this.exportToFile}/>
        </div>
      </Fragment>
    );
  }
}

export default App;
