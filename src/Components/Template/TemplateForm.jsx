import React, { Component }  from 'react';
import CKEditor from "ckeditor4-react";
import { Button, InputText, TextArea, SelectInput } from "./../Common";

class TemplateForm extends Component {

    constructor(props){
       super(props);
       this.state = {
            template_options: [
                { value: 'template_category_one', label: 'Template_category_one' },
                { value: 'template_category_two', label: 'Template_category_two' },
                { value: 'template_category_three', label: 'Template_category_three' },
                { value: 'template_category_four', label: 'Template_category_four' },
                { value: 'template_category_five', label: 'Template_category_five' }
            ],
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
            data:""
        }
    }

    componentDidUpdate(prevProps) {
        const { currentID, currentValue, selectionStart } = this.state;
        const { insertVariable } = this.props;

        let startText = "", endText = "", updateText = "";
        if(insertVariable!==prevProps.insertVariable && "template_name" !== currentID) { 
            startText = currentValue.substring(0, selectionStart)
            endText = currentValue.substring(selectionStart, currentValue.length);
            updateText = startText+" #"+insertVariable+" "+endText;
            this.setState({ [currentID]:updateText })
        }
    }

    handleSelectChange = template_category => this.setState({ template_category });

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value, 
            currentID:e.target.name, 
            currentValue: e.target.value,
            selectionStart: e.target.selectionStart
        });
    };

    handleBlur = e => this.setState({ blurID:e.target.id })

    handleSelectBlur = () => this.setState({ template_category_blur: true })

    handleClick = () => {
        this.setState({ submit:true })
        const { template_category, template_name } = this.state;
        if(template_category !== null && template_name.length > 4) {
            alert("template created")
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
                selectionStart: cursorValue
            });
        }
    }

    render(){

        const { template_options, template_category, template_name, title, subtitle, feature_one, feature_two, feature_three, feature_four, feature_five, search_term, subject_one, subject_two, subject_three, product_description, blurID, submit, template_category_blur } = this.state;
        
        return(
            <div className="template-form">
                <div className="template-form__header">
                    <h1>New Template</h1>
                    <Button text="Create Template" click={this.handleClick} />
                </div>
                <div className="template-form__body">
                    <div className="form-block">
                        <SelectInput
                            selectedOption={template_category}
                            handleSelectChange={this.handleSelectChange}
                            options={template_options}
                            placeholder="Select Category"
                            isSearchable={false}
                            labelText="Template Category"
                            isRequired={true} submit={submit} minlength="0" template_category_blur={template_category_blur} handleBlur={this.handleSelectBlur} error_text="This is mandatory field"
                        />
                        <InputText name="template_name" value={template_name} labelText="Template Name" hint="min 5 character" handleChange={this.handleChange} inputID="template_name" placeHolder="" isRequired={true} submit={submit} minlength="5" blurID={blurID} handleBlur={this.handleBlur} error_text="This is mandatory field and minmum 5 character" />
                    </div>

                    <div className="form-block">
                        <h4>PRODUCT INFO</h4>
                        <h2>Product Template Info</h2>
                        <p>You can use the "variables" on the right panel to inject data into your template and customize your product info templates with data from your product variants, custom attributes and additional attributes. One challenging aspect of product templates is that, to render correctly across all variants and products, we must make sure the variables used in the templates are available in all of those products and its variants.</p> <br />
                        <InputText name="title" value={title} labelText="Title" hint="min 5 character" handleChange={this.handleChange} inputID="title" placeHolder="" isRequired={false} submit={submit} minlength="5" blurID={blurID} handleBlur={this.handleBlur} error_text="minmum 5 character or make it empty" />

                        <InputText name="subtitle" value={subtitle} labelText="Subtitle" hint="" handleChange={this.handleChange} inputID="subtitle" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />
                        
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
                                onBlur={this.onEditorBlur}
                            />

                            {((product_description !== "" && product_description.length < 100) && submit) && <div className="error-text">minmum 100 character or make it empty</div>}
                        </div>

                        <InputText name="feature_one" value={feature_one} labelText="Feature #1" hint="" handleChange={this.handleChange} inputID="feature_one" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="feature_two" value={feature_two} labelText="Feature #2" hint="" handleChange={this.handleChange} inputID="feature_two" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="feature_three" value={feature_three} labelText="Feature #3" hint="" handleChange={this.handleChange} inputID="feature_three" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="feature_four" value={feature_four} labelText="Feature #4" hint="" handleChange={this.handleChange} inputID="feature_four" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="feature_five" value={feature_five} labelText="Feature #5" hint="" handleChange={this.handleChange} inputID="feature_five" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <TextArea name="search_term" value={search_term} labelText="Search Term" hint="" handleChange={this.handleChange} inputID="search_term" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="subject_one" value={subject_one} labelText="Subject Matter #1" hint="" handleChange={this.handleChange} inputID="subject_one" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="subject_two" value={subject_two} labelText="Subject Matter #2" hint="" handleChange={this.handleChange} inputID="subject_two" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />

                        <InputText name="subject_three" value={subject_three} labelText="Subject Matter #3" hint="" handleChange={this.handleChange} inputID="subject_three" placeHolder="" isRequired={false} submit={submit} minlength="0" blurID={blurID} handleBlur={this.handleBlur} error_text="" />
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