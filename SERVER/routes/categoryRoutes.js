import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, deleteCategory, getcategory, singleCategory, updateCategory } from '../Controllers/categoryController.js';
const router=express.Router();
//Create Category
router.post('/create-category',requireSignIn,isAdmin,categoryController);
//Update Catgory
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategory)

//get all routes
router.get('/getallCategor',getcategory)
//get single category
router.get('/getsingle/:slug',singleCategory)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategory)

export default router;