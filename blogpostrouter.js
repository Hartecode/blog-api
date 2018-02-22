const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

//blog post samples//
BlogPosts.create('start','This is the start of the blog','Sean Harte');
BlogPosts.create('go','This is the second test','Sean Harte');
BlogPosts.create('keeo going','This is the third test','Sean Harte');


router.get('/',(req, res) =>{
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredfeild = ['title','content', 'author'];
	//check if the right keys are in the request
	console.log(res.body);
	for(let i = 0; i < requiredfeild.lenght; i++){
		const feild = requiredfeild[i];
		if(!(feild in req.body)){
			const message = `Missing \`${feild}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredfeild = ['title','content', 'author', 'id'];
	for(let i = 0; i < requiredfeild.lenght; i++){
		const feild = requiredfeild[i];
		if(!(feild in req.body)){
			const message = `Missing \`${feild}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body.id) {
	    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
	    console.error(message);
	    return res.status(400).send(message);
	}
	console.log(`Updating shopping list item \`${req.params.id}\``);
	console.log(res.body);

	BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	});

	res.status(204).end();
});

router.delete('/:id', (req, res) => {
	console.log(req.params.id);
	BlogPosts.delete(req.params.id);
	console.log(`You have deleted post id:${req.params.id}`);
	res.status(204).end();
});


module.exports = router;