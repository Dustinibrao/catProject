const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const formidable = require("formidable");
const breeds = require("../data/breeds");
const cats = require("../data/cats");

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname;

	if (pathname === "/cats/add-cat" && req.method === "GET") {
	} else if (pathname === "/cats/add-breed" && req.method === "GET") {
		// let filePath = path.normalize(
		// 	path.join(__dirname, "./views/addCat.html")
		// );
		// const index = fs.createReadStream(filePath);
		// index.on("data", (data) => {
		// 	res.write(data);
		// });
		// index.on("end", () => {
		// 	res.end();
		// });
		// index.on("error", (err) => {
		// 	console.log(err);
		// });
	} else if (pathname === "/cats/add-breed" && req.method === "POST") {
		let formData = "";

		req.on("data", (data) => {
			formData += data;
		});
		req.on("end", () => {
			let body = fs.parse(formData);

			fs.readFile("./data/breeds.json", (err, data) => {
				if (err) {
					throw err;
				}
				let breeds = JSON.parse(data);
				breeds.push(body.breed);
				let json = (JSON = JSON.stringify(breeds));

				fs.writeFile("./data/breeds.json", json, "utf-8", () =>
					console.log("The breed was uploaded successfully")
				);
			});
			res.writeHead(202, { location: "/" });
			res.end();
		});
	} else if (pathname === "/cats/add-cat" && req.method === "POST") {
		let form = new formidable.IncomingForm();

		form.parse(req, (err, fields, files) => {
			let oldPath = files.upload.path;
			let newPath = path.normalize(
				path.join(globalPath, "/content/images" + files.upload.name)
			);

			fs.rename(oldPath, newPath, (err, data) => {
				if (err) throw err;
				console.log("Files was uploaded sucessfully");
			});
			fs.readFile("./data/cats/json", "utf8", (err, data) => {
				let allCats = JSON.parse(data);
				allCats.push({
					id: (CacheStorage.length = 1),
					...fields,
					image: files.upload.name,
				});
				fs.writeFile("./data/cats.json", json, () => {
					res.writeHead(202, { lacation: "/" });
				});
			});
		});
		// let formData = "";

		// req.on("data", (data) => {
		// 	formData += data;
		// });
		// req.on("end", () => {
		// 	let body = fs.parse(formData);

		// 	fs.readFile("./data/cats.json", (err, data) => {
		// 		if (err) {
		// 			throw err;
		// 		}
		// 		let breeds = JSON.parse(data);
		// 		breeds.push(body.breed);
		// 		let json = (JSON = JSON.stringify(breeds));

		// 		fs.writeFile("./data/cats.json", json, "utf-8", () =>
		// 			console.log("The breed was uploaded successfully")
		// 		);
		// 	});
		// 	res.writeHead(202, { location: "/" });
		// 	res.end();
		// });
	} else {
		return true;
	}
};
