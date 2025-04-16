import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/events.service';
import { MyEvent } from '../../interfaces/myevent'; 
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatDatepickerModule }  from '@angular/material/datepicker';
import { MatNativeDateModule }  from '@angular/material/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class EventFormComponent implements OnInit {
  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  isEditMode = false;
  eventId: string | null = null;

  constructor(
    private eventService: EventService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEditMode = true;
      this.eventService.getEventById(this.eventId).subscribe((event: MyEvent) => {
        this.eventForm.patchValue(event);
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event = this.eventForm.value as MyEvent;
      if (this.isEditMode && this.eventId) {
        this.eventService.updateEvent(this.eventId, event).subscribe(() => {
          this.router.navigate(['/home/events']);
        });
      } else {
        this.eventService.createEvent(event).subscribe(() => {
          this.router.navigate(['/home/events']);
        });
      }
    }
  }
}
