
    export const validation = (schema)=>{
        return(req , res , next)=> {
            let {success , error} = schema.safeparse(req.body)
                console.log({success , error});
                if(!success){
                    throw BadRequestException({message: "invalid data" , extra : error.issues})
                }
                next()
        }
    }