import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired=false }) => {
  const inputRef = useRef();
  const {
    field: { ref, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    rules: { required: isRequired },
  });

  return (
    <FormControl isInvalid={invalid} isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={HamburgerIcon} />}
        />
        <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} inputRef={ref} style={{ display: 'none' }}></input>
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current.click()}
          value={value}
        />
      </InputGroup>
      <FormErrorMessage>
        {invalid}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FileUpload;