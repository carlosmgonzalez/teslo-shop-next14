export interface Product {
	id: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: Size[];
	slug: string;
	tags: string[];
	title: string;
	gender: Gender;
}

export interface ProductDB {
	id: string;
	description: string;
	inStock: number;
	price: number;
	sizes: Size[];
	slug: string;
	tags: string[] | string;
	title: string;
	gender: Gender;
}

export interface ProductSeed {
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: Size[];
	slug: string;
	tags: string[];
	title: string;
	type: ValidTypes;
	gender: Gender;
}

export type Gender = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";
