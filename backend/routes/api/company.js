import express from 'express';
const router = express.Router();
import companyController from '../../controllers/companyController.js';

/**
 * @route	GET api/companies
 * @desc	Get all companies
 * @access	Public
 */
router.get('/', companyController.getCompanies);

/**
 * @route	GET api/companies/:id
 * @desc	Get company by _id
 * @access	Private
 */
router.get('/:id', companyController.getCompanyById);

/**
 * @route	POST api/companies/new_company
 * @desc	Create a new company
 * @access	Private
 */
router.post('/new_company', companyController.newCompany);

/**
 * @route	POST api/companies/update_company
 * @desc	Update a company selected
 * @access	Private
 */
router.post('/update_company', companyController.updateCompany);

/**
 * @route	DELETE api/companies/delete_company
 * @desc	Delete a company selected
 * @access	Private
 */
router.delete('/delete_company/:id', companyController.deleteCompany);

/**
 * @route	POST api/companies/upload_file
 * @desc	Upload file and send to email as attached
 * @access	Private
 */
router.post('/upload_file', companyController.uploadFile);

export default router;
