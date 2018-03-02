'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, require: true},
  content: {type: String},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date, default: Date.now}
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

//this conects to the collection which will be used
const BlogPosts = mongoose.model('Posts', blogSchema);

module.exports = {BlogPosts};