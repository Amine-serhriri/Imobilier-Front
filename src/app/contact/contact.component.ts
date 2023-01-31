import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactType, Feedback} from "../Model/feedback";

import {FeedbackService} from "../services/feedback.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],

})
export class ContactComponent implements OnInit {
  feedbackForm!:FormGroup;
  feedback!:Feedback;




  contactType=ContactType;
  feedbacksubmission! :Feedback

  formsErrors={
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  @ViewChild('fform') feedbackFormDirective: any;

  constructor(private fb:FormBuilder,
              private feedbackService:FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {

    this.feedbackForm=this.fb.group({
      firstname: this.fb.control('',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]),
      lastname: this.fb.control('',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]),
      telnum: this.fb.control(0,[Validators.required,]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      agree: false,
      contacttype: 'None',
      message: ''
    })
    this.feedbackForm.valueChanges
      .subscribe(data=>this.onValueChanged(data))
    this.onValueChanged()//reset validation message
  }

  onSubmit() {
    this.feedback=this.feedbackForm.value
    this.feedbackService.submitFeedBack(this.feedback).subscribe(
      data=> {
          this.feedbacksubmission=data
        }
       )


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''

    })
    console.log(this.feedback)
    this.feedbackFormDirective.resetForm();

  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formsErrors) {
      if (this.formsErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        // @ts-ignore
        this.formsErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          // @ts-ignore
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              // @ts-ignore
              this.formsErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
