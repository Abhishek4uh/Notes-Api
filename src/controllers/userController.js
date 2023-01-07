const userModel=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const SECRET_KEY= process.env.SECRET_KEY
const SECRET_KEY= "abhishek";

const signup=async(req,res)=>{

    //existing user , hashed password ,user creation ,token generate;

    const{username, password,email}= req.body;

    try{

        const existinUser= await userModel.findOne({email:email});

        if(existinUser){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedpass= await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            password:hashedpass,
            username:username
        });

        const token=jwt.sign({email : result.email , id: result._id},SECRET_KEY);

        res.status(201).json({user:result, token: token});

    }catch(error){

        console.log(error);
        res.status(501).json({message:"Something went wrong!"});
    }


}

const signin= async(req,res)=>{


    //existing user or not,  match password
    const{email,password}= req.body;

    try{
        const existinUser= await userModel.findOne({email:email});
        if(!existinUser){
            return req.status(404).json({message:"User not found"});
        }

        const matchedPass= await bcrypt.compare(password,existinUser.password);

        if(!matchedPass){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token=jwt.sign({email : existinUser.email , id: existinUser._id},SECRET_KEY);

        res.status(200).json({user:existinUser, token: token});


    }
    catch(error){
        console.log(error);
        res.status(501).json({message:"Something went wrong!"});
    }

}

module.exports={signup,signin};