import sendMail from '../mail/mailer.js';
import CompanyModel from '../models/companyModel.js';
const CompanyController = {};

CompanyController.getCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    if (companies) {
      res.status(200).json({ companies });
    } else {
      res.status(404).json('Company not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

CompanyController.getCompanyById = async (req, res) => {
  try {
    const company = await CompanyModel.findOne({ _id: req.params.id });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json('Company not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

CompanyController.newCompany = async (req, res) => {
  const { name, address, nit, phone } = req.body;

  const nitExists = await CompanyModel.findOne({ nit });

  if (nitExists) {
    return res.status(400).json([{ msg: 'Nit already exist!', param: 'nit' }]);
  }

  try {
    const company = new CompanyModel({
      name,
      address,
      nit,
      phone,
    });

    await company.save();

    res.status(200).send({ msg: 'Company created successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

CompanyController.updateCompany = async (req, res) => {
  const { _id, name, address, nit, phone } = req.body;

  const { nit: nitCurrent } = await CompanyModel.findById(_id);

  if (nitCurrent !== nit) {
    const nitExists = await CompanyModel.findOne({ nit });

    if (nitExists) {
      return res
        .status(400)
        .json([{ msg: 'Nit already exist!', param: 'nit' }]);
    }
  }

  try {
    const company = await CompanyModel.findById(_id);

    if (company) {
      company.name = name;
      company.address = address;
      company.nit = nit;
      company.phone = phone;

      await company.save();
      res.status(200).send({ msg: 'Company updated successfully!' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

CompanyController.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await CompanyModel.findById(id);

    if (company) {
      await company.remove();
      res.status(200).send({ msg: 'Company deleted!' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

CompanyController.uploadFile = async (req, res, next) => {
  const file = req.files.File;
  const { to, subject, body } = req.body;

  try {
    await sendMail(to, subject, body, file);
    res.status(200).send({ msg: 'File send!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

export default CompanyController;
