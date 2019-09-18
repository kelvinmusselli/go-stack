import React, { Component } from 'react';

import TechItem from './Techitem';

class TechList extends Component {

    state = {
        newTech:'',
        techs:[]
    };

    //este componente é executado assim que o componenet é executado em tela
    componentDidMount(){
        const techs =  localStorage.getItem('techs');
        if(techs){
            this.setState({ techs:JSON.parse(techs) });
        }
    }

    //Executado sempre que houver alguma alteração no estado ou na props
    // e recebe as propriedas para manipular
    componentDidUpdate(prevProps, prevState) {
        // this.props            this.state
        if(prevState.techs !== this.state.techs){
            localStorage.setItem('techs', JSON.stringify(this.state.techs));
        }
    }

    // Executado quando o componente deixa de existir
    componentWillUnmount(){

    }


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