import React from 'react';

export default function CustomerList(props){
  return (
    <React.Fragment>
      <h2>React App + REST Server</h2>
      <div className="boxed" >
          <h4>Customer List</h4>
          <table id="customer-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Pass</th>
              </tr>
            </thead>
            <tbody>
              { 
                props.customers.map(function(customer) {
                  return (<tr key={customer.id}
                    className={ (customer.id === props.formObject.id )?'selected': ''}
                    onClick={()=>props.handleListClick(customer)} 
                    >
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.password}</td>
                    </tr>);
                })
              }
            </tbody>
          </table>
      </div>
    </React.Fragment>
    
  );
}
  