import React from 'react';

import { BasePropertyProps, } from 'admin-bro'
import { Label, Box, DropZone, DropZoneProps, DropZoneItem } from '@admin-bro/design-system'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props

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
  let uploadedPhoto;

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    uploadedPhoto =  getBase64(files[0], (result) => {
      console.log(result);
      return result;
 })
    console.log(uploadedPhoto);
    
    onChange(property.name, uploadedPhoto)
  }

  

  // const uploadedPhoto = record.params.profilePhotoLocation
  // const photoToUpload = record.params[property.name]

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
    </Box>
  )
}



export default Edit;