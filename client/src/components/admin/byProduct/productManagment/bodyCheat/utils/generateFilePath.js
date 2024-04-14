import { v4 as uuidv4 } from "uuid";
export const generateFilePath=(file,path)=>{
    const uniqueId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const filePath = `${path}${uniqueId}.${fileExtension}`;
    return filePath
}
