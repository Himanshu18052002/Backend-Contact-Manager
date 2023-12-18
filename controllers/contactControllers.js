const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asynchandler( async(req,res)=>{
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
})

const getContactID = asynchandler(async(req,res)=>{

   const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(400);
    throw new Error("Not Found");
   }
    res.status(200).json(contact);
});

const postContact = asynchandler( async(req,res) =>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(200).json(contact);
})

const updateContact = asynchandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(400);
    throw new Error("Not Found");
   }
   if(contact.user_id.toString() !== req.user.id){
    res.status(400);
    throw new Error("User is not Authorized to change the contents");
   }
   const newContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
   );
    res.status(200).json(newContact);
});

const deleteContact = asynchandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("ID not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(400);
        throw new Error("User is not Authorized to change the contents");
       }
    await Contact.findByIdAndDelete(contact);
    res.status(200).json({message:"deleting requests"});
});;

module.exports = {getContacts,getContactID,postContact,updateContact,deleteContact};