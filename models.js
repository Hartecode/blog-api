'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, require: true},
  content: {type: String},
  author: {
    firstName: String,
    lastName: String
  }
  created: new Date()
});

blogSchema.virtual('authorString').get(function(){
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});


blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorString,
    created: this.created
  };
}

const BlogPosts = mongoose.model('BlogPosts', blogSchema);

module.exports = {BlogPosts};