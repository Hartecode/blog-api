const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const bodyParser = require('body-parser');


const {BlogPosts} = require('./models');

router.use(bodyParser.json());

//get posts
router.get('/',(req, res) =>{
	BlogPosts
		.find()
		.then(posts => {
			res.json(posts.map(post => post.serialize()));
		})
		.catch( err => {
			console.error(err);
			res.status(500).json({ message: 'Internal server error'});
		});
});

// can also request by ID
router.get('/:id', (req, res) => {
  BlogPosts
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/', (req, res) => {
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

	BlogPosts
	    .create({
	      title: req.body.title,
	      content: req.body.content,
	      author: req.body.author,
	    })
	    .then(post => res.status(201).json(post.serialize()))
	    .catch(err => {
	      console.error(err);
	      res.status(500).json({ message: 'Internal server error' });
    });
});


// router.put('/:id', jsonParser, (req, res) => {
// 	const requiredfeild = ['title','content', 'author', 'id'];
// 	for(let i = 0; i < requiredfeild.lenght; i++){
// 		const feild = requiredfeild[i];
// 		if(!(feild in req.body)){
// 			const message = `Missing \`${feild}\` in request body`;
// 			console.error(message);
// 			return res.status(400).send(message);
// 		}
// 	}

// 	if (req.params.id !== req.body.id) {
// 	    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
// 	    console.error(message);
// 	    return res.status(400).send(message);
// 	}
// 	console.log(`Updating shopping list item \`${req.params.id}\``);
// 	console.log(res.body);

// 	BlogPosts.update({
// 		id: req.params.id,
// 		title: req.body.title,
// 		content: req.body.content,
// 		author: req.body.author
// 	});

// 	res.status(204).end();
// });

// router.delete('/:id', (req, res) => {
// 	console.log(req.params.id);
// 	BlogPosts.delete(req.params.id);
// 	console.log(`You have deleted post id:${req.params.id}`);
// 	res.status(204).end();
// });


module.exports = router;