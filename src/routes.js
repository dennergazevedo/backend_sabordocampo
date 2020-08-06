import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';

// MULTER
import multerConfig from './config/multer';

import AddressController from './app/controllers/AddressController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';

const upload = multer(multerConfig);

const routes = new Router();

// SESSION
routes.post('/sessions', SessionController.store);
routes.put('/update_token', SessionController.updateToken);

// ADDRESS CONTROLLER
routes.post('/register_address', AddressController.register);
routes.put('/update_address/:id', AddressController.update);
routes.get('/search_address/:id', AddressController.search);
routes.delete('/delete_address/:id', AddressController.delete);

// ORDER CONTROLLER
routes.post('/register_order', OrderController.register);
routes.put('/update_order/:id', OrderController.update);
routes.get('/search_order/:id', OrderController.search);
routes.delete('/delete_order/:id', OrderController.delete);

// USER CONTROLLER
routes.post('/register_user', UserController.register);
routes.put('/update_user/:id', UserController.update);
routes.put('/update_user_pass/:id', UserController.updatePass);
routes.get('/search_user/:id', UserController.search);
routes.delete('/delete_user/:id', UserController.delete);

// PRODUCT CONTROLLER
routes.post('/register_product', ProductController.register);
routes.put('/update_product/:id', ProductController.update);
routes.get('/search_product/:id', ProductController.search);
routes.get('/search_product_title/:title', ProductController.searchTitle);
routes.get('/search_all_product', ProductController.searchAll);
routes.delete('/delete_product/:id', ProductController.delete);

// FILE CONTROLLER
routes.post('/upload_file', upload.single('file'), FileController.imgur);
routes.get('/search_img/:id', FileController.searchimg);

// AUTENTICAÇÃO
routes.use(authMiddleware);

export default routes;
