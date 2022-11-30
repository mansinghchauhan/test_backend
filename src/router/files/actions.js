import { File } from "../../models";
export const UPLOAD_IMAGE = async (req, res) => {
  try {
    //   const file_name = "./uploads/post-images" + req.file.filename;
    // let lastIndexof = req.file.filename.lastIndexOf(".");
    // let ext = req.file.filename.substring(lastIndexof);
    console.log(req.file.filename);
    const file_name = "/uploads/" + req.file.filename;
    let file = await File.create({ filePath: file_name });
    return res.status(201).json({
      success: true,
      message: "file has been upoloadedd",
      file,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const UPLOAD_IMAGES = async (req, res) => {
  try {
    const { video, audio, image } = req.files;
    const filesList = await addFilesToDb([...video, ...audio, ...image]);
    return res.status(200).json({
      filesList,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const addFilesToDb = async (files) => {
  const fileList = await Promise.all(
    files.map(async (f) => {
      const fileName = "/uploads/" + f.filename;
      let file = await File.create({ imagePath: fileName });
      return file;
    })
  );
  return fileList;
};
export const GET_FILE_BY_AUTHOR= async(req,res)=>{
  try {
    console.log("hello")
    const { page, limit } = req.query;

    const opts = {
      page: page || 1,
      limit: limit || 10,
    };

    const file = await File.paginate({}, opts);

    return res.status(200).json(file);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const GET_FILE_BY_ID= async(req,res)=>{
  try {
  

   const file = await File.findById({_id: req.params.id});
if(!file)
{
  return res.status(403).json({
    message:"not found",
    success:false
  })
}
    return res.status(200).json(file);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const FILE_DELETE= async(req,res)=>{
  
  try {

console.log(req.params.id)
   const file = await File.findByIdAndDelete({_id: req.params.id});
   if(!file)
  {
  return res.status(403).json({
    message:"not found",
    success:false
  })
}
    return res.status(200).json({
      message:"successfully deleted",
      success:true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};