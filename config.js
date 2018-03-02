'use strict';
//connects to the database blogPosts
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blogPosts';

exports.PORT = process.env.PORT || 8080;