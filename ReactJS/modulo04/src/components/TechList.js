import React, { Component } from 'react';

class TechList extends Component {
    state = {
        newTech:'',
        techs:[
            'Node.js',
            'ReactJS',
            'React-Native'
        ]
    };

    handleInputChange = e => {
        
        this.setState({
            newTech:e.target.value
        })
        
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            techs:[...this.state.techs, this.state.newTech],
            newTech:''
        });
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>  
                {/* <p>{this.state.newTech}</p> */}
                <ul>
                    {this.state.techs.map(tech => <li key={tech}>{tech}</li>)}
                    <button type='button'>Remover</button>
                </ul>
                <input 
                    type="text" 
                    name="nova-tecnologia" 
                    id="nova-tecnologia" 
                    onChange={this.handleInputChange} 
                    value={this.state.newTech}/>

                <button type="submit">Enviar Novo</button>
            </form>
        );
    }
}

export default TechList;