import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/events.service';
import { MyEvent } from '../../interfaces/myevent'; 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  imports: [CommonModule, MatCardModule]
})
export class EventDetailComponent implements OnInit {
  event: MyEvent | null = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe((data) => {
        this.event = data;
      });
    }
  }
}
