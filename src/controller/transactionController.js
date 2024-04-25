const Transaction = require("../modals/transactionSchema");

const createTransaction = async (req, res) => {
    try {
        const transaction = req.body;
        const generatedTransaction = new Transaction(transaction); 
        const savedTransaction = await generatedTransaction.save();
        res.status(201).send({
            success: true,
            message: "New Transaction created successfully",
            savedTransaction 
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in creating Transaction",
            error: error.message
        });
    }
};

const allTransaction = async (req, res) => {
    try {
        const { page = 1, limit = 10, transactionnumber,customer,noofitems } = req.query;
        const query = {};
        if (customer) {
            query.customer = { $regex: new RegExp(customer, 'i') };
        }
        if (transactionnumber) {
            const transactionnumberAsNumber = parseInt(transactionnumber);
            query.transactionnumber = transactionnumberAsNumber;
        }
        if (noofitems) {
            const noofitemsAsNumber = parseInt(noofitems);
            query.noofitems = noofitemsAsNumber;
        }
        
        const skip = (page - 1) * limit;
        const Transactions = await Transaction.find(query)
            .skip(skip)
            .limit(parseInt(limit));
        const totalTransactions = await Transaction.countDocuments(query);
        res.status(200).send({
            success: true,
            message: "Transaction retrieved successfully",
            Transactions,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalTransactions / limit),
                totalTransactions,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving product",
            error: error.message
        });
    }
};

const singleTransaction =async(req,res) =>{
    try {
        const {userid} = req.params;
        const singleTransaction = await Transaction.findById(userid);
        res.status(200).send({
            success: true,
            message: "Transaction retrieved successfully",
            singleTransaction,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving Transaction",
            error: error.message
        });
    }
};

const updateTransaction =async(req,res) =>{
    try {
        const {userid} = req.params;
        const transaction = req.body;
        const updateTransaction = await Transaction.findByIdAndUpdate(userid,transaction,{new:true});
        res.status(200).send({
            success: true,
            message: "Transaction updated successfully",
            updateTransaction,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving Transaction",
            error: error.message
        });  
    }
};

const deleteTransaction = async(req,res) =>{
    try {
        const {userid} = req.params;
        const deleteTransaction = await Transaction.findByIdAndDelete(userid);
        res.status(200).send({
            success: true,
            message: "Transaction deleted successfully",
            deleteTransaction,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in retrieving Transaction",
            error: error.message
        });  
    }
};

module.exports = {
    createTransaction, 
    allTransaction,
    singleTransaction,
    updateTransaction,
    deleteTransaction 
};