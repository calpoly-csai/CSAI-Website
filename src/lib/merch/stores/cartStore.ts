import { writable } from 'svelte/store';

type CartItem = {
	id: string;
	name: string;
	images: string[];
	price: number;
	quantity: number;
	size: string;
};

export const cartItems = writable<CartItem[]>([]);

export function clearCart() {
	cartItems.set([]);
}

//add to cart
export function addToCart(item: CartItem) {
	cartItems.update((currentCart) => {
		const existingItem = currentCart.find(
			(cartItem) => cartItem.id === item.id && cartItem.size === item.size
		);

		if (existingItem) {
			console.log(item.size);
			return currentCart.map((cartItem) =>
				cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
			);
		} else {
			return [...currentCart, { ...item, quantity: 1 }];
		}
	});
}

// remove from cart -- entire item removed, regardless of quantity
export function removeFromCart(id: string, size: string) {
	cartItems.update((currentCart) =>
		currentCart.filter((item) => item.id !== id || item.size !== size)
	);
}

// increase item quantity
export function increaseQuantity(id: string, size: string) {
	cartItems.update((currentCart) => {
		return currentCart.map((cartItem) =>
			cartItem.id === id && cartItem.size === size
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	});
}

// decrease item quantity
export function decreaseQuantity(id: string, size: string) {
	cartItems.update((currentCart) => {
		const updatedCart = currentCart.map((cartItem) =>
			cartItem.id === id && cartItem.size === size
				? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
				: cartItem
		);
		// filter out items with quantity 0
		return updatedCart.filter((cartItem) => cartItem.quantity > 0);
	});
}
