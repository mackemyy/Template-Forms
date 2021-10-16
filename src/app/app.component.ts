import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm!: NgForm;
  title = 'SIGN UP FORM';
  title2 = 'YOUR DATA';
  isValidForm = false;
  phonePattern = "^((\\+91-?)|0)?[0-9]{10}$";
  defaultQuestion="bff";
  secretAnswer='';
  maskedPassword= '';
  genders = ['Male', 'Female', 'LGBTQ', 'Prefer not to say'];
  user = {
    username: '',
    password: '',
    email: '',
    phone: '',
    secret: '',
    answer: '',
    gender: '',
    job: '',
    jobDes: '',
    salary: '',
  }

  onSubmit() {
    this.isValidForm = false;
    if(this.signUpForm.invalid) {
      return;
    }
    else {
      this.isValidForm = true;
      this.user.username = this.signUpForm.value.credentials.username;
      this.user.password = this.hashPassword();
      this.user.email = this.signUpForm.value.userInfo.email;
      this.user.phone = this.signUpForm.value.userInfo.phone;
      this.user.secret = this.signUpForm.value.otherInfo.secret;
      this.user.answer = this.secretAnswer;
      this.user.gender = this.signUpForm.value.otherInfo.gender;
      this.user.job = this.signUpForm.value.jobInfo.job;
      this.user.jobDes = this.signUpForm.value.jobInfo.jobDes;
      this.user.salary = this.signUpForm.value.jobInfo.salary;
      this.signUpForm.reset();
    }
  }

  suggestUsername() {
    const suggestedName = 'thisUsername_isUnique';
    this.signUpForm.form.patchValue({
      credentials: {
        username: suggestedName
      },
    });
  }

  hashPassword() {
    this.maskedPassword = this.signUpForm.value.credentials.password;
    return "*".repeat(this.maskedPassword.length);
  }
}
