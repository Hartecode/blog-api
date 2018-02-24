const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require('../server');


const should = chai.should();

chai.use(chaiHttp);

describe('BlogPosts', function(){

	before(function() {
		return runServer();
	});

	after(function() {
	    return closeServer();
	});

	//get testing
	it('should list items on GET', function(){
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res){
			res.should.to.have.status(200);
	        res.should.to.be.json;
	        res.body.should.be.a('array');

	        res.body.should.have.length.to.be.at.least(1);

	        const expectedKeys = ['id','title', 'content', 'author', 'publishDate'];
	        res.body.forEach(function(item) {
	          item.should.to.be.a('object');
	          item.should.to.include.keys(expectedKeys);
	        });
		});
	});

	//post test
	it('should add an item on POST', function(){
		const newBlogPost = {
								title: 'server test', 
								content: 'this is a server testing content',
								author: 'Mocha Chai'
							};
		return chai.request(app)
			.post('/blog-posts')
			.send(newBlogPost)
			.then(function(res) {
			   res.should.have.status(201);
			   res.should.be.json;
			   res.body.should.be.a('object');
			   res.body.should.include.keys('id', 'title', 'content', 'author','publishDate');
			   res.body.title.should.equal(newBlogPost.title);
			   res.body.content.should.equal(newBlogPost.content);
			   res.body.author.should.equal(newBlogPost.author);
			});

	});

	//put test
	it('should update items on PUT', function(){
		const updateData = {
		    title: 'server testing update',
		    content: "This is an update server testing",
		}
		
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res){
				updateData.id = res.body[0].id;
				return chai.request(app)
					.put(`/blog-posts/${updateData.id}`)
					.send(updateData)
			})
			.then(function(res){
				res.should.to.have.status(204);
			});
	});

	//delete test
	it('should delete items on DELETE', function(){
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res){
				return chai.request(app)
					.delete(`/blog-posts/${res.body[0].id}`);
			})
			.then(function(res){
				res.should.to.have.status(204);
			});
	});


});