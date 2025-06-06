import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./product-card.component.scss";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {ProductCartContainer, Footer, Name, Price} from './product-card.styles'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onclick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
