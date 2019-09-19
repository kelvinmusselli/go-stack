import React, {
    Component
} from 'react';

import facebook from '../assets/logo.png';
import profile from '../assets/profile.png';

class Header extends Component {

    render(){
        return(
            <header>
                <nav>
                    <h2 className="titleHeader">
                        <img className="facebook" src={facebook} alt="logo-facebook"/>
                    </h2>
                    <h2 className="meuPerfilHeader">
                        <span>Meu perfil</span>
                        
                        <img className="imgProfile" src={profile} alt="foto-do-perfil"/>
                    </h2>
                </nav>   
            </header>
        );
    }
};

export default Header;