import React, {useState, useEffect} from 'react';

import { BasePropertyProps, } from 'admin-bro'
import { Label, Box, DropZone, DropZoneProps, DropZoneItem, Input } from '@admin-bro/design-system'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props
  const [uploadedPhoto, setUploadedPhoto] = useState()
    // useEffect(() => {
    //   setUploadedPhoto()
    // }, [props])

  
  const getBase64 = (file, cb)=> {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }
 

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    getBase64(files[0], (result) => {
      setUploadedPhoto(result)
      return result;
 })
    
    onChange(property.name, uploadedPhoto)
  }

  

  // const uploadedPhoto = record.params.profilePhotoLocation
  // const photoToUpload = record.params[property.name]

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
      <Input id='image' className='imageB64' value = {uploadedPhoto}></Input>
    </Box>
  )
}



export default Edit;