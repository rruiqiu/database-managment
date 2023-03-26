import './App.css';
import Getdata from './Getdata';
import SubmitForm from './SubmitForm';


function App () {
  return (
    <div className="App">
      <h1>Database management</h1>
      <SubmitForm />
      <Getdata />
    </div>
  );
}

export default App;
