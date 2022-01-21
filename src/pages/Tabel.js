import React, { Component } from 'react';

class Tabel extends Component {
    state={data:[]}
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => this.setState({data:json}))
    }
    render() {
        const {data} = this.state
         const col = data[0]
         console.log(col)  
        return (
            <div>
                  <table className="table">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>title</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                      {  
                        data.map((d,index) =>(
                            <tr key={index}>
                            <td>{d.id}</td>
                            <td>{d.title}</td>
                           
                        </tr>
                        ))    
                   
                    }  
                    </tbody>
                    </table> 
            </div>
        );
    }
}

export default Tabel;