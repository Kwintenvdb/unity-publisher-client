import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import { router } from './api';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());

// Serving static assets
const root = path.join('../', 'frontend', 'build');
app.use(serve(root));
app.use(ctx => {
    ctx.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});
