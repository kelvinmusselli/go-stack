import React from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline, MdDelete} from 'react-icons/md';
import { Container, ProductTable, Total} from './styles';

import { connect } from 'react-redux';


function Cart({ cart, dispatch }) {

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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1"/>
                  </button>
                  <input type="number" readOnly value={products.amount}/>
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1"/>
                  </button>
                </div>

              </td>
              <td>
                <strong>
                  R$ 258,80
                </strong>
              </td>
              <td>
              <button type="button" onClick={() => dispatch({
                type:'REMOVE_FROM_CART',
                id:products.id
              })}>
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
          <strong>R$ 1920,28</strong>
        </Total>


      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Cart);
