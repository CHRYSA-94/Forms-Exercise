import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;
  formData = new Subject();
  show = false;
  data;

  genders: string[] = ['female','male']
  ageOptions:string [] = ['under 18','18-35','36-50', '50 +']
  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.myForm = new FormGroup ({
      'personalInformation' : new FormGroup ({
        'firstName': new FormControl(null),
        'lastName': new FormControl(null),
        'age': new FormControl(null)
      }),
      'gender': new FormControl('female'),
      'genderChoice' : new FormControl(null),
      'foods': new FormArray([])
    })


    this.myForm.get('personalInformation.firstName').valueChanges.pipe(debounceTime(1000)).subscribe( fN => console.log(fN))

    // this.myForm.patchValue({
    //   'personalInformation' : {
    //     'firstName': 'Anna',
    //     'lastName': 'Papadopoulou'
    //   }
    // })

    // this.myForm.setValue({
    //   'personalInformation' :{
    //     'firstName':'John',
    //     'lastName': 'Papadopoulos',
    //     'age':'18-35'
    //   },
    //   'gender': 'male',
    //   'genderChoice' : true,
    //   'foods': []
    // })
  }

  get foods() {
    return this.myForm.controls["foods"] as FormArray;
  }

  onAddFood() {
    const control= new FormControl (null,Validators.required);
    this.foods.push(control);

  }

  onSubmit() {

    console.log("form",this.myForm.value)
  }

}


