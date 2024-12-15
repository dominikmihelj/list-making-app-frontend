// home.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boards: any[] = [];
  newBoardName: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.dataService.getBoards().subscribe((data) => {
      this.boards = data;
    });
  }

  addBoard(): void {
    if (this.newBoardName.trim()) {
      this.dataService.createBoard({ name: this.newBoardName }).subscribe(() => {
        this.newBoardName = '';
        this.loadBoards();
      });
    }
  }

  deleteBoard(boardId: number): void {
    this.dataService.deleteBoard(boardId).subscribe(() => {
      this.loadBoards();
    });
  }
}
