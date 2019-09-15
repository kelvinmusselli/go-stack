import React, { Component } from 'react';

import TechItem from './Techitem';

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

    handleDelete = (tech) =>{
        // ele removerá o que estiver diferente do que está dentro
        this.setState({ techs: this.state.techs.filter( t => t !== tech) });   
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>  
                {/* <p>{this.state.newTech}</p> */}
                <ul>
                    {this.state.techs.map(tech => (  
                        <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)} />
                        // <li key={tech}>
                        //     {tech}
                        //     <button onClick={() => this.handleDelete(tech)} 
                        //         type='button'>Remover</button>
                        // </li>
                    ))}
                    <TechItem/>
                    
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