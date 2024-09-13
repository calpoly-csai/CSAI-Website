import { writable } from 'svelte/store';

type CartItem = {
	id: string;
	name: string;
	images: string[];
	price: number;
	quantity: number;
};

export const cartItems = writable<CartItem[]>([]);

//add to cart
export function addToCart(item) {
	cartItems.update((currentCart) => {
		const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

		if (existingItem) {
			return currentCart.map((cartItem) =>
				cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
			);
		} else {
			return [...currentCart, { ...item, quantity: 1 }];
		}
	});
}

// remove from cart -- entire item removed, regardless of quantity
export function removeFromCart(id) {
	cartItems.update((currentCart) => currentCart.filter((item) => item.id !== id));
}

// increase item quantity
export function increaseQuantity(id: string) {
	cartItems.update((currentCart) => {
		return currentCart.map((cartItem) =>
			cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
		);
	});
}

// decrease item quantity
export function decreaseQuantity(id: string) {
	cartItems.update((currentCart) => {
		return currentCart.map((cartItem) =>
			cartItem.id === id ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) } : cartItem
		);
	});
}
