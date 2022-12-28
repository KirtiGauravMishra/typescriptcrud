import Bill from '../models/bill';

import { Response, Request } from 'express';

export const createBill = async (req: Request, res: Response) => {
  try {
    const { description, category, amount } = req.body;
    const newBill = await Bill.create({ description, amount, category });

    res.status(200).json(newBill);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBills = async (req: Request, res: Response) => {
  try {
    const bills = await Bill.find();
    const categories = await Bill.find().select({ category: 1, _id: 0 });
    res.status(200).json({ bills, categories });
  } catch (error) {
    console.log(error);
  }
};
export const getBillsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const bills = await Bill.find({ category });
    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
  }
};
export const updateBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const billUpdated = await Bill.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(billUpdated);
  } catch (error) {
    console.log(error);
  }
};
export const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById({ _id: id });

    await bill?.remove();
    res.status(200).json({ msg: 'Deleted Successfully' });
  } catch (error) {
    console.log(error);
  }
};
