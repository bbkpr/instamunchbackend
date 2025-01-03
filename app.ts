import 'dotenv/config';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { readFileSync } from 'fs';
import { resolvers } from './src/graphql/resolvers';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
var createError = require('http-errors');

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import { InstaMunchContext } from './src/graphql/context';

const hbs = require('hbs');
let cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes');
var usersRouter = require('./src/routes/users');

var app = express();

// Set up Apollo GraphQL
const apolloServer = new ApolloServer<InstaMunchContext>({
  typeDefs,
  resolvers,
});
startStandaloneServer(apolloServer, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
}).then((res) => {
  console.log('Apollo GraphQL Server ready at http://localhost:4000');
});


app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
} as ErrorRequestHandler);

module.exports = app;
