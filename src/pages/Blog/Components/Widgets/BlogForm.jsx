import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../../Config';
import LoadingModal from '../../../../ReUseableComponent/LoadingModal';
import { addDoc, collection } from 'firebase/firestore';
import DefaultLayout from '../../../../layout/DefaultLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingModal1 from '../../../../ReUseableComponent/LaodingModal1';
import Dropzone from 'react-dropzone';
import moment from 'moment/moment';
import { toast } from 'react-toastify';


export default function BlogForm() {
    const [value, setValue] = useState('');
    const [page,setPage] = useState();
    const [key,setKey] = useState();
    const [link,setLink] = useState();
    const [title,setTitle] = useState();
  
    const handleImageUpload = (imageUrl) => {
      console.log(imageUrl)
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
  
      quill.insertEmbed(range.index, 'image', {
        src: imageUrl,
        alt: 'Image',
      });
      setValue(value + `<img src='${imageUrl}' />`)
    };
  
    useEffect(() => {
      console.log(value)
    }, [])
  
  
    const quillRef = React.useRef();
  
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    };
  
    const HandleUploadToFirestore = async () =>{
      const docRef = await addDoc(collection(db, "Blogs"), {
        value,
        title,
        time:moment().format("MMM Do YY")
        
      });
      console.log("Document written with ID: ", docRef.id);
      toast("Content Added Success !")
    }
  
   
  
  
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'link',
      'image',
    ];


    return (
         
            <Box className="container mx-auto p-4 w-full">
                    <div className="">
                        <div className="flex w-full py-2 gap-2 lg:flex-row md:flex-col sm:flex-col">
                            <ImageDropzone handleImageUpload={handleImageUpload} />
                            <Input onChange={(e)=>setTitle(e.target.value)} placeholder='Enter Title' borderRadius={10} paddingLeft={10}/>
                            <Button onClick={HandleUploadToFirestore} className='border border-white rounded-md px-4 py-2 bg-white '>Add Data</Button>

                        </div>

                        <ReactQuill

                            ref={(el) => {
                                quillRef.current = el;
                            }}
                            formats={formats} modules={modules} theme="snow" style={{ height: 500, backgroundColor: '#fff' }} value={value} onChange={setValue} />

                    </div>
                
            </Box>

    )
}


const ImageDropzone = ({ handleImageUpload }) => {
    const handleDrop = async (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file)
  
      const storageRef = ref(storage, `content/${file.name}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      await getDownloadURL(ref(storage, storageRef))
        .then((url) => {
          console.log(url)
          handleImageUpload(url)
  
        })
        .catch((error) => {
          // Handle any errors
        });
  
  
    };
  
    return (
      <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className='px-5 py-2 bg-white rounded-md'>
            <input {...getInputProps()} className='cursor-pointer' />
            <p>Upload or Drag File</p>
          </div>
        )}
      </Dropzone>
    );
  };