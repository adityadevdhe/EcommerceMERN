import bcrypt from 'bcrypt';
export const hashPassword=async(password)=>{
    try{
        const salt=10;
        const hashedPass=await bcrypt.hash(password,salt);
        return hashedPass;
    }catch(error){
        console.log(error);
    }
};

export const comparePassword=async(password,hashedPass)=>{
    return bcrypt.compare(password,hashedPass);
}