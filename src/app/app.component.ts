import { Component, OnInit } from '@angular/core';
import { PracticeService } from './services/practice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoading: boolean = true;
  public displayData: string = '';
  
  constructor(private practiceService: PracticeService) {}

  ngOnInit(): void {
    this.practiceService.practiceServiceCall().subscribe((response) => {
      this.displayData = response.data;
      this.isLoading = false;
    });
  }
}
