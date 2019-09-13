import React, { Component }  from 'react';
import CKEditor from "ckeditor4-react";
import formFileds from "./fields.json"
import { Button, InputText, TextArea, SelectInput } from "./../Common";

class TemplateForm extends Component {

    constructor(props){
       super(props);
       this.state = {
            template_category: null,
            template_category_blur: false,
            template_name:'',
            title:"",
            subtitle:"",
            feature_one:"",
            feature_two:"",
            feature_three:"",
            feature_four:"",
            feature_five:"",
            search_term:"",
            subject_one:"",
            subject_two:"",
            subject_three:"",
            product_description:"",
            blurID:"",
            submit: false,
            currentID:"",
            currentValue:"",
            selectionStart:"0",
            data:"",
            editorIns:null
        }
    }

    componentDidUpdate(prevProps) {
        const { currentID, currentValue, selectionStart, editorIns } = this.state;
        const { insertVariable } = this.props;

        let startText = "", endText = "", updateText = "", middleVariable = "";
        
        if(insertVariable!==prevProps.insertVariable && "template_name" !== currentID && currentID!=="") { 
            startText = currentValue.replace("&nbsp;", " ").substring(0, selectionStart)
            endText = currentValue.replace("&nbsp;", " ").substring(selectionStart, currentValue.length);
            middleVariable = " {#"+insertVariable+"} "
            updateText = startText+middleVariable+endText;
            this.setState({ [currentID]:updateText });
            const getID = document.getElementById(currentID);
            const selectionLength = selectionStart+middleVariable.length
            
            if(currentID !== 'product_description') {
                setTimeout(()=> {
                    getID.focus();
                    getID.selectionStart = selectionLength;
                    getID.selectionEnd = selectionLength;
                },100);
            } else {
                editorIns.focus();
            }     
        }
    }

    handleSelectChange = template_category => this.setState({ template_category });

    handleChange = e => this.getCurrentValue(e);

    handleFocus = e => this.getCurrentValue(e);

    getCurrentValue = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value, 
            currentID:e.target.name, 
            currentValue: e.target.value,
            selectionStart: e.target.selectionStart
        });
    }

    handleBlur = e => this.setState({ blurID:e.target.id })

    handleSelectBlur = () => this.setState({ template_category_blur: true })

    handleClick = () => {
        this.setState({ submit:true })
        const { template_category, template_name, title, product_description } = this.state;
        if((template_category !== null && template_name.length > 4) && (title.length===0 || title.length>=5) && (product_description.length===0 || product_description.length>=100)) {
            alert("Template created successfully!")
        } else {
            alert("Something went wrong!")
        }
    }

    onEditorChange = ( evt ) => {
        if(typeof evt.editor.getSelection().getRanges()[0] !== "undefined") {        
            var cursorValue = evt.editor.getData().length;
            cursorValue = typeof evt.editor.getSelection().getRanges()[0] !== "undefined" && evt.editor.getSelection().getRanges()[0].startOffset+3 
            
            this.setState({ 
                currentID: "product_description",   
                product_description: evt.editor.getData(),
                currentValue: evt.editor.getData(),
                selectionStart: cursorValue,
                editorIns:evt.editor
            });
        }
    }    

    render(){
        
        const { product_description, blurID, submit, template_category_blur } = this.state;
        
        return(
            <div className="template-form">
                <div className="template-form__header">
                    <h1>New Template</h1>
                    <Button text="Create Template" click={this.handleClick} />
                </div>
                <div className="template-form__body">
                    <div className="form-block">
                        {formFileds.template_fields.map((el,idx)=>{
                            if(el.element==="input" && el.type === "text") {
                                return <InputText key={idx} name={el.name} value={this.state[formFileds.template_fields[idx].name]} labelText={el.label} hint={el.hint} handleChange={this.handleChange} inputID={el.inputID} placeHolder={el.placeHolder} isRequired={el.isRequired} submit={submit} minlength={el.minlength} blurID={blurID} handleBlur={this.handleBlur} handleFocus={this.handleFocus} error_text={el.error_text} />
                            } else if(el.element==="input" && el.type === "select") {
                                return <SelectInput
                                            key={idx}
                                            selectedOption={this.state[formFileds.template_fields[idx].name]}
                                            handleSelectChange={this.handleSelectChange}
                                            options={el.options}
                                            placeholder={el.placeHolder}
                                            isSearchable={false}
                                            labelText={el.label}
                                            isRequired={el.isRequired} 
                                            submit={submit}
                                            minlength={el.minlength} 
                                            template_category_blur={template_category_blur} 
                                            handleBlur={this.handleSelectBlur} 
                                            error_text={el.error_text}
                                        />
                            } else return ""
                        })}
                    </div>

                    <div className="form-block">
                        <h4>PRODUCT INFO</h4>
                        <h2>Product Template Info</h2>
                        <p>You can use the "variables" on the right panel to inject data into your template and customize your product info templates with data from your product variants, custom attributes and additional attributes. One challenging aspect of product templates is that, to render correctly across all variants and products, we must make sure the variables used in the templates are available in all of those products and its variants.</p> <br />

                        {formFileds.title_fields.map((el,idx)=>{
                            if(el.element==="input" && el.type === "text") {
                                return <InputText key={idx} name={el.name} value={this.state[formFileds.title_fields[idx].name]} labelText={el.label} hint={el.hint} handleChange={this.handleChange} inputID={el.inputID} placeHolder={el.placeHolder} isRequired={el.isRequired} submit={submit} minlength={el.minlength} blurID={blurID} handleBlur={this.handleBlur} handleFocus={this.handleFocus} error_text={el.error_text} />
                            } else return ""
                        })}
                        
                        <div className="form-row">
                            <label className="form-label">
                                <span className="form-label-hint">min 100. character</span>
                            </label>
                            <CKEditor
                                data={product_description}
                                config={ {
                                    toolbar: [ { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] }, { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
                                    { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] }, ]
                                } }
                                onChange={this.onEditorChange}
                                onFocus={this.onEditorChange}
                            />

                            {((product_description !== "" && product_description.length < 100) && submit) && <div className="error-text">minmum 100 character or make it empty</div>}
                        </div>

                        {formFileds.feature_fields.map((el,idx)=>{
                            if(el.element==="input" && el.type === "text") {
                                return <InputText key={idx} name={el.name} value={this.state[formFileds.feature_fields[idx].name]} labelText={el.label} hint={el.hint} handleChange={this.handleChange} inputID={el.inputID} placeHolder={el.placeHolder} isRequired={el.isRequired} submit={submit} minlength={el.minlength} blurID={blurID} handleBlur={this.handleBlur} handleFocus={this.handleFocus} error_text={el.error_text} />
                            } else if (el.element==="input" && el.type === "textarea") {
                                return <TextArea key={idx} name={el.name} value={this.state[formFileds.feature_fields[idx].name]} labelText={el.label} hint={el.hint} handleChange={this.handleChange} inputID={el.inputID} placeHolder={el.placeHolder} isRequired={el.isRequired} submit={submit} minlength={el.minlength} blurID={blurID} handleBlur={this.handleBlur} handleFocus={this.handleFocus} error_text={el.error_text} />
                            } else return ""
                        })}
                        
                    </div>
                    <div className="submit-block">
                        <Button text="Create Template" click={this.handleClick} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateForm;