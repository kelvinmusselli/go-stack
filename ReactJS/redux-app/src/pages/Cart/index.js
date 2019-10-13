import React from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline, MdDelete} from 'react-icons/md';
import { Container, ProductTable, Total} from './styles';

import { connect } from 'react-redux';
import * as  CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {

    function increment(product){
      updateAmountRequest(product.id, product.amount + 1);
    }

    function decrement(product){
      updateAmountRequest(product.id, product.amount - 1);
    }


  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th/>
            <th>Produto</th>
            <th>Qtd</th>
            <th>SUBTOTAL</th>
            <th/>
          </tr>
        </thead>
        <tbody>

          { cart.map(products => (
            <tr key={products.id}>
              <td>
                <img src={products.image} alt={products.titel}/>
              </td>
              <td>
                <strong>{products.titel}</strong>
                <span>{products.priceFormated}</span>
              </td>
              <td>

                <div>
                  <button type="button" onClick={() => decrement(products)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1"/>
                  </button>
                  <input type="number" readOnly value={products.amount}/>
                  <button type="button" onClick={()=> increment(products)}>
                    <MdAddCircleOutline size={20} color="#7159c1"/>
                  </button>
                </div>

              </td>
              <td>
                <strong>
                  {products.subtotal}
                </strong>
              </td>
              <td>
              <button type="button" onClick={() => removeFromCart(products.id)}>
                <MdDelete size={20} color="#7159c1"/>
              </button>
              </td>
            </tr>

          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>Total</span>
          <strong>R$ {total}</strong>
        </Total>


      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total:formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  },0))
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
    mapStateToProps,
    CartActions
  )(Cart);
