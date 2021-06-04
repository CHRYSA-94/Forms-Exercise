
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
  idValue: string
  nameChanges = new BehaviorSubject<boolean>(false)

  genders: string[] = ['female', 'male']
  ageOptions: string[] = ['under 18', '18-35', '36-50', '50 +']
  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {

    this.idValue = Math.random().toPrecision(5)

    this.myForm = new FormGroup({
      'personalInformation': new FormGroup({
        'id': new FormControl(this.idValue, [Validators.required]),
        'firstName': new FormControl(null, [Validators.required,Validators.maxLength(10)]),
        'lastName': new FormControl(null, [Validators.minLength(3)]),
        'age': new FormControl(null)
      }),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('female'),
      'genderChoice': new FormControl(null),
      'foods': new FormArray([])
    })
    // },{updateOn: 'submit'}) // otan thelw na ginetai to validation sto submit. ! to submit ginetai kanonika


    console.log("pristine",this.myForm.get('personalInformation.firstName').pristine)
    this.myForm.get('personalInformation.firstName').valueChanges.pipe(debounceTime(1000)).subscribe(value => {

      if (this.myForm.get('personalInformation.firstName').valid && !this.myForm.get('personalInformation.id').touched  ) {
        this.idValue += value
        this.nameChanges.next(true)

        console.log(this.idValue)
      }

    })

    this.nameChanges.subscribe((val) => val ? this.changeId : false)


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

  get changeId() {
    return this.myForm.patchValue({
      'personalInformation': {
        'id': this.idValue
      }
    })
  }

  onAddFood() {
    const control = new FormControl(null, Validators.required);
    this.foods.push(control);

  }

  onSubmit() {

    console.log("form", this.myForm)
    // this.myForm.reset()
  }

}


