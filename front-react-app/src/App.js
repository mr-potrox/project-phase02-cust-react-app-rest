import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById, validateEmail } from './memdb.js'
import './App.css';
// Importing th CustomerList component from ./components/CustomerList.js
import CustomerList from './components/CustomerList.js'
// Importing th CustomerAddUpdateForm component from ./components/CustomerAddUpdateForm.js
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm.js'
 

function App(props) {
  
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  const [isValidEmail, setIsValidEmail] = useState(true);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, [formObject], []);
  // Declare the getCustomers() method.
  const getCustomers =  function(){
    getAll(setCustomers);
  }

  // Declare the handleListClick() method.
  const handleListClick = function(item){
    // Checking if the user selected the same record from
    // the customer list  twice or more
    if (formObject.hasOwnProperty('id') && item.id !== formObject.id) {
      setFormObject(item);
    }else{
      // Cleaning up the adding form
      setFormObject(blankCustomer);
    }
  }  

  // Declare the handleInputChange() method.
  const handleInputChange = function (event) {
    const name = event.target.name;
    if (name == 'email' && !validateEmail(formObject.email)) {
      setIsValidEmail(false);
    }else{
      setIsValidEmail(true);
    }
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    // Cleaning up the add/edit form
    setFormObject(newFormObject);
  }

  // Declare the onCancelClick() method.
  let onCancelClick = function () {
    // Cleaning up the add/edit form
    setFormObject(blankCustomer);
  }
  // Declare the onDeleteClick() method.

  let onDeleteClick = function () {
    if (formObject.name.length === 0 && 
      formObject.email.length === 0 &&
      formObject.password.length === 0) {
      alert('You must select at least one record from the customer list before you try to delete');
    }
    else{
      if(formObject.id >= 0){
      // Deleting the selected register from the Customelist
        deleteById(formObject.id, formObject);
      }
      // Cleaning up the add/edit form
      setFormObject(blankCustomer);
    }
  }
  
  // Declare the onSaveClick() method.
  let onSaveClick = function () {
    
  // adding the nonempty records validation to avoid 
  // the insertion of the blank record.
  if (formObject.name.length === 0 && 
    formObject.email.length === 0 &&
    formObject.password.length === 0) {
    alert('You must fill at least one field before you save the form');
  }
  else{
    // Adding the email validation to avoid inserting wrong data.
    if (formObject.email.length !== 0 && !validateEmail(formObject.email)) {
      alert("Enter correct email address!");
    } 
    else{
      // Adding the new record send it by the user
      if (mode === 'Add') {
        // Adding the new register.
        let nextid = customers.length;
        post(formObject, nextid);
      }
      if (mode === 'Update') {
        // Saving the new data for the register that is being updated
        put(formObject.id, formObject);
      }
      // Cleaning up the adding form
      setFormObject(blankCustomer);
    }
  }
}


  return (
    <React.Fragment>
      {/* Render the CustomerList */}
      <CustomerList customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}/>
      <div className="boxed">
        {/* Render the CustomerAddUpdateForm */}
      <CustomerAddUpdateForm formObject={formObject}
        mode={mode}
        isValidEmail={isValidEmail}
        handleInputChange={handleInputChange}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}/>
      </div>
    </React.Fragment>
  );
}


export default App;
