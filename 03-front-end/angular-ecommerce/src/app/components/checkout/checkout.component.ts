import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { AbidiShopFormService } from 'src/app/services/abidi-shop-form.service';
import { CartService } from 'src/app/services/cart.service';
import { AbidiShopValidators } from 'src/app/validators/abidi-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  checkoutFormGroup!: FormGroup;
  totalPrice: number= 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[];
  billingAddressStates: State[];

  constructor(private formBuilder: FormBuilder,
              private abidiShopFormService: AbidiShopFormService ,
              private cartService: CartService){}
  
  ngOnInit(): void {
    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required , Validators.minLength(2),AbidiShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('',[Validators.required , Validators.minLength(2),AbidiShopValidators.notOnlyWhitespace]),
        email: new FormControl('',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),AbidiShopValidators.notOnlyWhitespace])}),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required ,
             Validators.minLength(2),
             AbidiShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required ,
          Validators.minLength(2),
          AbidiShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required ,
                    Validators.minLength(2),
                    AbidiShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('',[Validators.required,AbidiShopValidators.validateCreditCardNumber]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });


    //populate credit card month 
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " +startMonth)

    this.abidiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data ;
      }
    );
    //populate the credit card years 
      this.abidiShopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrieve credit card years: " +JSON.stringify(data));
          this.creditCardYears = data;
        }
      );

      //populate countries 
       this.abidiShopFormService.getCountries().subscribe(
        data =>{
          console.log("Retrieved countries: " + JSON.stringify(data));
          this.countries = data;
        }
       );

  }
  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    //subscribe to cartService.totalQuantity
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')};
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')};
  get email(){return this.checkoutFormGroup.get('customer.email')};
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')};
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')};
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')};
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')};
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')};

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')};
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')};
  get billingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')};
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')};
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')};
  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')};
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')};
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')};
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')};






  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    
      //bug fix code 
      this.billingAddressStates = this.shippingAddressStates;
    }else{

      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }
  onSubmit(){
    console.log("Handling the submit button");
    if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);

  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year , then start with the current month
    
    let startMonth: number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1 ;
    }
    this.abidiShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data ; 
      }
    );
  }
  

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code : ${countryCode}`);
    console.log(`${formGroupName} country name : ${countryName}`);

    this.abidiShopFormService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data; 
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }
}
