const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{type: String,required:true, unique:true},
    firstname:{type:String,requires:true,unique:false},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user"],default:"user"}
})
const transSchema=new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  merchant: String,
  location: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "blocked"], default: "pending" },
  fraudScore: { type: Number, default: 0.0 },
  isFraud: { type: Boolean, default: false },
}, { timestamps: true });
const fraudAlertSchema = new mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  flaggedBy: { type: String, enum: ["model", "admin"], default: "model" },
  reason: String,
  actionTaken: { type: String, enum: ["blocked", "investigating", "allowed"], default: "investigating" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const User=new mongoose.model(userSchema);
const Transaction=new mongoose.model(transSchema);
const Fraud=new mongoose.model(fraudAlertSchema)
module.exports={
    User,
    Transaction,
    Fraud
}