import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createproduct, deleteProduct, getProduct, getSingleProduct, productCount, productFilter, productPage, productphoto, updateproduct } from "../Controllers/productController.js";
import formidable from 'express-formidable'
const router=express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createproduct)

//get products
router.get('/get-products',getProduct)
router.get('/get-products/:slug',getSingleProduct)
//get photo
router.get('/product-photo/:id',productphoto)
//delete product
router.delete('/delete-product/:id',deleteProduct)

router.post('/product-filters',productFilter)
//product-count
router.get('/product-count',productCount)

//product-per-page
router.get('/product-list/:page',productPage)

router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateproduct)

export default router;