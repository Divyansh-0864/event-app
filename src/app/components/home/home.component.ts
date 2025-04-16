import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EventService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { MyEvent } from '../../interfaces/myevent'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterOutlet, RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private router = inject(Router);
  private eventService = inject(EventService);

  events: MyEvent[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  // Load all events
  loadEvents(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  // Logout functionality
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

   // Navigate to Create Event form
  createEvent(): void {
    this.router.navigate(['/home/events/new']);
  }

  // Navigate to Edit Event form
  editEvent(id: string): void {
    this.router.navigate([`/home/events/${id}/edit`]);
  }

  // Delete event
  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event) => event.id !== id);
    });
  }
}
