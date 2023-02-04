import mongoose from 'mongoose';
const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nit: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
