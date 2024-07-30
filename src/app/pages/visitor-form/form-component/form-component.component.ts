import { ChangeDetectionStrategy,ChangeDetectorRef,Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';

import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { DataserviceService } from "../../../core/services/visitor-form-service/dataservice.service"
import { Purpose } from "../../../core/models/purpose.interface"
import { GetIdAndName  } from '../../../core/models/getIdAndName.interface';
import {CustomKeyboardEvent} from '../../../core/models/custom-keyboard-event.interface.'
import { DeviceChangeEvent } from '../../../core/models/VisitorFormModels/IDeviceChangeEvent';
import { PurposeChangeEvent } from '../../../core/models/VisitorFormModels/IPurposeChangeEvent';
import {  Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { MatDialog } from '@angular/material/dialog';
import { CapturePhotoDialogComponentComponent } from '../capture-photo-dialog-component/capture-photo-dialog-component.component';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,FormsModule,ReactiveFormsModule,NgClass,AutoCompleteModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponentComponent {
 
  addvisitorForm: FormGroup;  
  showItemOtherInput: boolean = false;

  contacts: string[] = [];
  filteredContacts: string[] = [];
  selectedContact: string[]  | null = null;

  purposes: Purpose[] = [];
  filteredPurposes: Purpose[] = [];
  selectedPurpose: Purpose | undefined ;

  Devices: GetIdAndName [] = [];
  filteredDevice: GetIdAndName [] = [];
  selectedDevice: GetIdAndName  | null = null;

  permissionStatus : string="";
  camData:any = null;
  capturedImage : any ='';
  trigger : Subject<void> = new Subject();
 

  constructor(private apiService: DataserviceService,public dialog: MatDialog,
    private fb: FormBuilder,private router: Router,private cdr: ChangeDetectorRef) 
  {
    this.addvisitorForm = this.fb.group({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      personInContact: new FormControl('', Validators.required),
      purposeofvisit: new FormControl('', Validators.required),
      
      purposeofvisitId: new FormControl('', Validators.required),
      items: this.fb.array([this.createItemFormGroup()]), // Initialize with one item
      policy: new FormControl('', Validators.required)
    });
  }


// get $trigger():Observable<void>{
//   return this.trigger.asObservable();
// }

// checkPermission(){
//   navigator.mediaDevices.getUserMedia({video:{width:500,height:500}}).then((response)=>
//   {
//     this.permissionStatus ='Allowed';
//     this.camData = response;
//     console.log(this.camData);
//   }).catch(err=>{
//     this.permissionStatus = 'Not Allowed';
//     console.log(this.permissionStatus);
    
//   })
// }

// capture(event:WebcamImage){
//   console.log("captured event",event);
//   this.capturedImage = event.imageAsDataUrl;
    
// }

// captureImage(){
//   this.trigger.next();
// }

openDialog(): void {
  const dialogRef = this.dialog.open(CapturePhotoDialogComponentComponent);

  dialogRef.afterClosed().subscribe((result: WebcamImage | null) => {
    if (result) {
      this.capturedImage = result.imageAsDataUrl;
      console.log("captured event", this.capturedImage);
    }
  });
}







  // ngOnInit() {   
  //  this.loadContactPerson();
  //  this.loadVisitPurpose();
  //  this.loadDevicesCarried();
 
  // }


 loadContactPerson(){
  this.apiService.getContactPerson()
      .subscribe((response :string[]) => {
        console.log("Contact Person Response:", response);
      this.contacts = response;
    });  
 } 

  filterContact(event: AutoCompleteCompleteEvent) {
    let query = event.query.toLowerCase();
    this.filteredContacts = this.contacts
    .filter(contact => contact.toLowerCase().includes(query))
    .sort((a, b) => a.localeCompare(b));
    console.log(this.filteredContacts);
    
  }

  loadVisitPurpose(){
    this.apiService.getVisitPurpose()
      .subscribe((response :Purpose[]) => {
        console.log("API Response:", response);
      this.purposes = response;
    });
   }  
    filterPurpose(event: AutoCompleteCompleteEvent) {
      let query = event.query.toLowerCase();
      this.filteredPurposes = this.purposes
      .filter(purpose => purpose.purposeName.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.purposeName.localeCompare(b.purposeName));
       console.log(this.filteredPurposes);
       
    }
    
    loadDevicesCarried(){
      this.apiService.getDevice()
      .subscribe((response: GetIdAndName []) => {
        console.log("API Response:", response);
      this.Devices = response;
    });
     }  
      filterItem(event: AutoCompleteCompleteEvent) {
        let query = event.query.toLowerCase();
        this.filteredDevice = this.Devices
        .filter(Device => Device.name.toLowerCase().includes(query))
        .sort((a, b) => {
            if (a.name.toLowerCase() === 'none') return 1;
            if (b.name.toLowerCase() === 'none') return -1;
            return a.name.localeCompare(b.name);
        });
         console.log(this.filteredDevice);
         
      }

      get items(): FormArray {
        return this.addvisitorForm.get('items') as FormArray;
      }
    
      createItemFormGroup(): FormGroup {
        return this.fb.group({
          Device: new FormControl('', Validators.required),
          DeviceSerialnumber: new FormControl(''),
          selectedDevice:'',
          selectedDeviceId: '', // Store the item ID
          showItemOtherInput: false
        });
      }
    
      onItemChange(event: DeviceChangeEvent, index: number): void {
        console.log('onSelect event:', event);
        const value = event.value;
      
        // Check if the selected device is "none"
        const isNone = value.deviceName.toLowerCase() === 'none' || value.deviceId === null; // Adjust the condition as necessary
      
        // Get the form group for the current item
        const currentItem = this.items.at(index) as FormGroup;
      
        // Update the form group values
        currentItem.patchValue({
          selectedDevice: value.deviceName,
          selectedDeviceId: value.deviceId, // Store the item ID
          showItemOtherInput: !isNone && !!value // Set to false if "none" is selected, otherwise true
        });
      
        // Set or clear the required validator for the DeviceSerialnumber control
        const serialNumberControl = currentItem.get('DeviceSerialnumber');
        if (serialNumberControl) { // Check if serialNumberControl is not null
          if (value.deviceName === 'Laptop') {
            serialNumberControl.setValidators([Validators.required]);
          } else {
            serialNumberControl.clearValidators();
          }
          serialNumberControl.updateValueAndValidity();
        }
      
        console.log(currentItem.value.selectedDeviceId);
        console.log(currentItem.value.showItemOtherInput);
      }
      
      onKeyUpHandlerDevice(event: KeyboardEvent, i: number) {
        if (event.key === 'Enter') {
          const customEvent: CustomKeyboardEvent = {
            key: event.key,
            target: {
                value: (event.target as HTMLInputElement).value.trim()
            }
        };
        this.onItemBlur(customEvent, i);
        }
      }
    
      onItemBlur(event:CustomKeyboardEvent, index: number): void {
        console.log('onBlur event:', event);
        const value = (event.target as HTMLInputElement).value.trim();
    
        // Check if the device name is empty or not provided
        if (!value) {
            return;
        }
    
        // Check if the entered device exists in the list
        const existingDevice = this.Devices.find(device => device.name.toLowerCase() === value.toLowerCase());
        console.log("existing device on blur", existingDevice);
    
        // Get the form group for the current item
        const currentItem = this.items.at(index) as FormGroup;
    
        if (!existingDevice) {
            // Device does not exist in the list, add it via API
            this.apiService.addDevice({ deviceName: value }).subscribe(
                (response: GetIdAndName ) => {
                    console.log("Device added successfully:", response);
    
                    // Update local devices list and form values
                    this.Devices.push({ id: response.id, name: value });
                    currentItem.patchValue({
                        selectedDevice: value,
                        selectedDeviceId: response.id, // Update form with the new device ID
                        showItemOtherInput: true // Set to true to show the serial number input
                    });
    
                    // Trigger change detection
                    this.cdr.detectChanges();
    
                    console.log("new device", currentItem.value.selectedDeviceId);
                },
                (error) => {
                    console.error('Error adding device:', error);
                    // Handle error as needed
                }
            );
        }
    }
     
     
     
     
      addItem(): void {
        this.items.push(this.createItemFormGroup());
      }

      onKeyUpHandlerPurpose(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            const inputElement = event.target as HTMLInputElement;
            const value = inputElement.value;
          //   const autoCompleteEvent: PurposeChangeEvent = {
          //      // Assuming event is the original event you want to pass
          //    purposeName: value 
          // };
          this.onPurposeChange(value);
        }
    }

    // isItemEntered(index: number): boolean {
    //   return this.items?.at(index)?.get('Device')?.value?.trim() !== '';
    // }
    onPurposeChange(event: any): void {
      let value: string;
    
      // Check if the event is an AutoCompleteSelectEvent
      if (event && event.originalEvent && event.originalEvent instanceof Event && event.item && event.item.purposeName) {
        value = event.item.purposeName;
      } else if (event && typeof event === 'string') {
        value = event;
      } else {
        value = event?.purposeName || '';
      }
      console.log('Purpose entered:', value);

  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return; // Handle empty value case
  }
  
      // Check if the entered purpose exists in the list
      const existingPurpose = this.purposes.find(purpose => purpose.purposeName.toLowerCase() === trimmedValue.toLowerCase());
      console.log("existing purpose", existingPurpose);
  
      if (existingPurpose) {
          // Purpose exists in the list, update form values
          this.addvisitorForm.patchValue({
              selectedPurpose: existingPurpose.purposeName,
              purposeofvisitId: existingPurpose.purposeId // Store the purpose ID in the form control
          });
          console.log(this.addvisitorForm.value.purposeofvisitId);
      } else {
          // Purpose does not exist in the list, add it via API
          this.apiService.addPurpose(value).subscribe(
              (response: Purpose) => {
                  console.log("Purpose added successfully:", response);
  
                  // Update local purposes list and form values
                  this.purposes.push({ purposeId: response.purposeId, purposeName: trimmedValue });
                  this.addvisitorForm.patchValue({
                      selectedPurpose: trimmedValue,
                      purposeofvisitId: response.purposeId // Update form with the new purpose ID
                  });
  
                  console.log("new purpose", this.addvisitorForm.value.purposeofvisitId);
              },
              (error) => {
                  console.error('Error adding purpose:', error);
                  // Handle error as needed
              }
          );
      }
  }
  

      onSubmit(): void {
        const purposeName = this.addvisitorForm.get('purposeofvisit')?.value;
        this.onPurposeChange(purposeName); // Ensure purpose is checked/added before submitting
    
        console.log(this.addvisitorForm.value);
        if (this.addvisitorForm.valid) {
          const formData = this.addvisitorForm.value;

           
    // Add captured webcam image data to the payload
        const imageData = this.capturedImage; // Adjust this line to match how you store the image data

    
          // Determine visitorPayload based on conditions
          let visitorPayload: any;
          if (formData.items.length === 0 || formData.items.every((item: any) => !item.selectedDeviceId)) {
            // Condition 1: No devices selected or all devices have no selectedDeviceId
            visitorPayload = {
              name: formData.name,
              phoneNumber: formData.phoneNumber,
              personInContact: formData.personInContact,
              purposeOfVisitId: formData.purposeofvisitId,
              imageData: imageData
            };
          } else {
            // Condition 2: Devices are selected
            visitorPayload = {
              name: formData.name,
              phoneNumber: formData.phoneNumber,
              personInContact: formData.personInContact,
              purposeOfVisitId: formData.purposeofvisitId,
              selectedDevice: formData.items.map((item: any) => ({
                DeviceId: item.selectedDeviceId,
                serialNumber: item.DeviceSerialnumber
              })),
              imageData: imageData
            };
          }
    
          console.log(visitorPayload);
    
          // Call API service with visitorPayload
          this.apiService.createVisitorAndAddItem(visitorPayload).subscribe(
            (response) => {
              console.log('Visitor and item added successfully:', response);
              alert("Added Successfully");
              this.router.navigate(['/thankyou']);
              // Optionally, redirect to a different page or refresh data
            },
            (error) => {
              console.error('Error adding visitor and item:', error);
              // Handle error as needed
            }
          );
        } else {
          console.error('Form is invalid.');
    
          // Optionally, handle invalid form state, such as displaying error messages to the user
          // or logging additional details for debugging.
        }
      }
    


  }

 

 
