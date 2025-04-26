
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    const formData = new FormData()

    // append image with form data
    formData.append("image", imageFile)

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        console.log("Image Upload : upload image utils:  Response : ", response);
        
        return response.data;


    } catch (error) {
        console.log("Error while uploading image:" ,error)
        throw error;
    }
}

export default uploadImage;