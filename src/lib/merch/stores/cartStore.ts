import {writable} from "svelte/store"

type CartItem = {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
};

export const cartItems = writable<CartItem[]>([]);

// add to cart
export const addToCart = (product: CartItem) => {
    cartItems.update(items=>{
        const itemPosition = items.findIndex(
            item => item.id === product.id && item.size === product.size
        );
        if (itemPosition !== -1){
            const updatedItems = items.map((item, index)=>{
                if(index === itemPosition){
                    return {...item, quantity: item.quantity + 1};
                }
            });
            return updatedItems;
        }else{
            return [...items, {...product, quantity: 1}]
        }

    });
}
// remove from cart
export const removeFromCart = (id: string, size: string) =>{
    cartItems.update(items =>{
        const itemPosition = items.findIndex(
            item => item.id === id && item.size === size
        );
        if(itemPosition !== -1){
            if(items[itemPosition].quantity - 1 <= 0){
                items.splice(itemPosition, 1);
            }
            else{
                items[itemPosition].quantity -= 1;
            }       
        }
        return [...items];
    })
}