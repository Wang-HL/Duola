// import Koa from 'koa';
// import Router from 'koa-router';
// import path from 'path';
// import koaStatic from 'koa-static';
// import logger from 'koa-logger';
// import views from 'koa-views';
// import env from 'node-env-file';
// import mongoose from 'mongoose';

const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const env = require('node-env-file');
const mongoose = require('mongoose');

const commodityRouter = require('./router/commodityRouter');


/**
 * node env config
 *
 * set process.env = '../.env'file
 */
env(`${__dirname}/.env`);

/**
 * connect mongodb with env config
 *
 * you must have a file call '.env' in your /
 *
 * if you have auth, you should open your db with config => auth=true
 */
const { DB_HOST, DB_PORT, DB_SOURCE, DB_USER, DB_PASS, AUTH_SOURCE } = process.env;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_SOURCE}`, {
  // auth: {
  //   user: DB_USER,
  //   password: DB_PASS,
  // },
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 500,
  keepAlive: true,
  poolSize: 2,
}, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('db is ready');
  }
});

/**
 * get host and port from '.env' file
 */
const host = process.env.HOST_IP;
const port = process.env.HOST_PORT;

const app = new Koa();

/**
 * router doesn't exist then get into this router
 */
const router = Router();

app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, './dist')));
app.use(views(path.join(__dirname, './dist')));

// app.use(unlockRouter.routes());
router.get('/*', async (ctx) => {
  await ctx.render('index');
});
app.use(router.routes());

app.on('error', async (err, ctx) => {
  console.error(ctx.url);
  console.error(err);
  console.error(err.stack);
});

/**
 * routers
 */
app.use(commodityRouter.routes());


app.listen(port, host);
console.log(`server start at port ${port}`);

module.exports = app;