import axios from "axios";
import { base_url, config } from "../../utills/axiosConfig";

const postQuery=async(contactData)=>{
    const response=await axios.post(`${base_url}enquiry`, contactData);
    if(response.data){
        return response.data
    }
};
// const getBlog=async(id)=>{
//     const response=await axios.get(`${base_url}blog/${id}`);
//     if(response.data){
//         return response.data
//     }
// };

export const contactService={
    postQuery,
    // getBlog,
 
}