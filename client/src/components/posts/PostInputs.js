import React from "react";
const CreatePostInputs = (props) => {
  if (props.textarea === true) {
    return <textarea {...props.input} required={props.required} id={props.id} className={props.className}></textarea>;
  } else {
    return <input {...props.input} required={props.required} id={props.id} className={props.className} autoComplete={props.autocomplete} />;
  }
};
export default CreatePostInputs;
