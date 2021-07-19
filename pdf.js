const express = require('express');
const pdf = require('html-pdf');
const app = express();
const multipart = require('connect-multiparty');
const fs = require('fs');
const multipartMiddleware = multipart();

app.post('/pdf', multipartMiddleware, (req, res, next) => {
	const file = req.files.file;
	fs.readFile(file.path, 'utf8', function (err, html) {
		if (err) {
			console.log("error")
		}
		var htmlpdf = html
		pdf.create(htmlpdf).toStream(function (err, stream) {
			if (err) {
				console.log("error")
			}
			res.writeHead(200, {
				'Content-Type': 'application/force-download',
				'Content-disposition': 'attachment; filename=output.pdf'
			});

			stream.pipe(res);
		});

	});
});

app.listen(3000, () => {
	console.log(`Listening on 3000`);
});
