'use strict';
//connects to the database blogPosts
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog-posts';

//connects to the testing database
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-blog-posts';
exports.PORT = process.env.PORT || 8080;