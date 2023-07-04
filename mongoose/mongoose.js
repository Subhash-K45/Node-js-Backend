const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://k2subhash45:Subhash@cluster0.f8xfyd9.mongodb.net/")

const Product=mongoose.model("Products",{
    productID: { type: String, required: true,unique:true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean},
    rating: { type: Number },
    createdAt: { type: String,required:true},
    company: { type: String, required: true },
})

const User=mongoose.model("Users",{
    FirstName:String,
    LastName:String,
    Email:String,
    Password:String
})


module.exports={Product ,User}