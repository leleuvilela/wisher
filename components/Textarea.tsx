import React from 'react';
import { Textarea as ChakraTextArea, InputProps as ChakraTextAreaProps } from '@chakra-ui/core'

const Textarea: React.FC<ChakraTextAreaProps> = (props) => {
  return (
    <ChakraTextArea
      height="50px"
      backgroundColor="gray.800"
      focusBorderColor="purple.500"
      borderRadius="sm"
      {...props}
    />
  )
}

export default Textarea;