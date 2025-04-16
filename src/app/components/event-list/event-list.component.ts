import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/events.service';
import { MyEvent } from '../../interfaces/myevent';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';

@Component({
  selector: 'app-event-list',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: MyEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents(); // Fetch events on component initialization
  }

  // Fetch events from the service
  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data; // Assign fetched data to the events array
      },
      (error) => {
        console.error('Error fetching events:', error); // Log any errors
      }
    );
  }

  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event) => event.id !== id);
    });
  }
}
