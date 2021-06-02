import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;

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
  }

  get foods() {
    return this.myForm.controls["foods"] as FormArray;
  }

  onAddFood() {
    const control= new FormControl (null,Validators.required);
    this.foods.push(control);

    // To bug pou eixa htan sto katw kwdika. Tis grammes 37-39 den tis eixa valei katholou kai sto html grami 76
    // adi gia foods.controls eixa grapsei myForm.get('foods').value. to kollima itan oti den borousa na grapsw
    // panw apo ena gramma sinexomeno sto input pou mou evgaze .eprepe kathe fora na kanw klik gia na grapsw ena akoma gramma

    // const control= new FormControl (null,Validators.required);
    // (<FormArray>this.myForm.get('foods')).push(control);
  }

  onSubmit() {
    console.log(this.myForm)
  }
}


