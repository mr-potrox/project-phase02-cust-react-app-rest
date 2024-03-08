import React from 'react';

export default function CustomerList(props){
  return (
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
  );
}
  