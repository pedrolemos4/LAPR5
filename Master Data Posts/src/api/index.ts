import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import post from './routes/postRoute';
import comentario from './routes/comentarioRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	post(app);
	comentario(app);
	
	return app
}