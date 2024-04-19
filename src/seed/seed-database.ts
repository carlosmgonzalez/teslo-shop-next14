import { Product, ProductImage } from "@prisma/client";
import prisma from "../libs/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
	// Delete previous records
	await Promise.all([
		prisma?.user.deleteMany(),
		prisma?.country.deleteMany(),
		prisma?.productImage.deleteMany(),
		prisma?.product.deleteMany(),
		prisma?.category.deleteMany(),
	]);

	const { categories, products, users } = initialData;

	// Users.
	await prisma.user.createMany({
		data: users,
	});

	// Countries
	await prisma.country.createMany({
		data: countries,
	});

	// Categories.
	const categoriesData = categories.map((category) => ({ name: category }));

	await prisma?.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany();

	const categoriesMap = categoriesDB.reduce(
		(map, category) => {
			map[category.name.toLowerCase()] = category.id;
			return map;
		},
		{} as Record<string, string>,
	);

	// Here we adapt the product information to the database schema,
	// We necessarily had to await each product in order to take its id and then
	// to make it a little more efficient we created an array of promises with the creation of the
	// images and then we did a Promises.All().
	products.forEach(async ({ type, images, ...data }) => {
		const arrImgPromises = [] as Promise<ProductImage>[];

		const productDB = await prisma.product.create({
			data: {
				...data,
				categoryId: categoriesMap[type],
			},
		});

		images.forEach((image) => {
			arrImgPromises.push(
				prisma.productImage.create({
					data: {
						url: image,
						productId: productDB.id,
					},
				}),
			);
		});

		await Promise.all(arrImgPromises);
	});

	console.log("executed seed");
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
