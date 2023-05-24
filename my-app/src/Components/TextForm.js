import React, { useState } from "react";

export default function TextForm(props) {
    const handleUpClick = ()=>{
        // console.log("Upper Case was clicked"+text);
        let newText = text.toUpperCase();
        setText(newText)
        if(newText.length>0){
        props.showAlert('Converted to UpperCase','success')
        }
        else{
            props.showAlert('No text to convert','warning');
        }
    }
    const handleLowClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText);
        if(newText.length>0){
            props.showAlert('Converted to LowerCase','success')
            }
            else{
                props.showAlert('No text to convert','warning');
            }
        

    }
    const handleClear = ()=>{
        let newText = '';
        setText(newText);
        props.showAlert('Text Cleared','success')

    }
    const handleCopy = ()=>{
        if(text.length>0){
            navigator.clipboard.writeText(text);
            props.showAlert('Copied','success')

            }
            else{
                props.showAlert('No text to copy','warning');
            }
        

    }
    const extractEmails = () => {
        // props.showAlert('Emails Extracted','success');
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

        }
    const  downloadTxtFile = () => {
            const element = document.createElement("a");
            const file = new Blob([document.getElementById('MyBox').value], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "myFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            props.showAlert('downaload Started','success')

          }
    const handleSpace = ()=>{
        let temp=text;
        temp=temp.replace(/\s+/g, ' ');
        setText(temp);
        
        if(text.length>0){
            props.showAlert('Extra Space Cleared','success')
            }
            else{
                props.showAlert('No text to remove space','warning');
            }


    }      
    const handleOnChange = (event)=>{
        // console.log("On Change");
        setText(event.target.value);
    }
  const [text, setText] = useState("");
//  text = 'hswhjfjejf'; Wrong way to change the state
// setText('behejjsjfnrg'); //Right way to change text
  return (
    <>
    <div className="container">
      <h1 className={`text-${props.Mode==='light'?'dark':'light'}`}>{props.heading}</h1>
      <div className="mb-3">
        <textarea className="form-control" style={{backgroundColor: props.Mode==='light'?'#6c757d':'#adb5bd', color: props.Mode === 'dark'?'white':'white'}} id="MyBox" rows="8" value={text} onChange={handleOnChange}></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpClick}>Convert To Uppercase</button>
      <button className="btn btn-primary mx-2 " onClick={handleLowClick}>Convert To Lowercase</button>
      <button className="btn btn-primary mx " onClick={handleSpace}>Remove Extra Spaces</button>
      <button className="btn btn-danger  my-2 mx-2" onClick={handleClear}>Clear Text</button>
      <button className="btn btn-dark mx-2 " onClick={handleCopy}>Copy</button>
      <button className="btn btn-dark mx-2 " onClick={extractEmails}>Extract Emails</button>
      <button className="btn btn-dark mx " onClick={downloadTxtFile}>Download Text</button>

    </div>
    <div className="container my-2">
        
        <h1 className={`text-${props.Mode==='light'?'dark':'light'}`}>Your Text Summary</h1>
        <div className="container bg-secondary  ">
        <p className={`text-${props.Mode==='light'?'light':'light'}`}>{text.split(" ").length} words and {text.length} characters</p>
        <p className={`text-${props.Mode==='light'?'light':'light'}`}>{0.008*text.split(" ").length} Minutes Read</p>
        </div>
       
        <h2 className={`text-${props.Mode==='light'?'dark':'light'}`}>Preview</h2>
        <p className={`text-${props.Mode==='light'?'dark':'light'}`}>{text.length>0?text:"Enter something to preview here"}</p>
        <h2 className={`text-${props.Mode==='light'?'dark':'light'}`}>Emails</h2>
        <textarea className="form-control" style={{backgroundColor: props.Mode==='light'?'#6c757d':'#adb5bd',color: props.Mode === 'dark'?'white':'white'}} id="" rows="2" value={extractEmails()}></textarea>
        {/* <button className="btn btn-dark  my-2 " onClick={handleCopyemail}>Copy</button> */}
    </div>
    </>
  );
}
