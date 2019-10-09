import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { ProductList } from './styles';
import { connect } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

class Home extends Component {

  state = {
    products: [],

  }

  async componentDidMount(){
    const response = await api.get('products');

    //PASSANDO FORMATAÇÃO DE VALORES CONFORME O ARQUIVO FORMAT NA PASTA UTILS
    const data =  response.data.map(product => ({
        ...product,
        priceFormated:formatPrice(product.price)

    }));

    this.setState({
      products:data
    });

  }

  handleAddProduct = product => {
    const { addToCart } = this.props;

    addToCart(product);

    // const { dispatch } = this.props;

    // dispatch(CartActions.addToCart(product));

  };

  render(){

    const { products } =  this.state;

    return (
      <ProductList>
        { products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title}/>

              <strong>{product.title}</strong>
              <span>{product.priceFormated}</span>

              <button type="button" onClick={() => this.handleAddProduct(product)}>
                <div>
                  <MdAddShoppingCart size={16} color="#FFF"/> 3
                </div>

                <span>Adicionar ao Carrinho</span>

              </button>
            </li>
            )
          )
        }
      </ProductList>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
