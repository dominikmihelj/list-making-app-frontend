import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardId!: number;
  board: any = { name: '', lists: [] };
  lists: any[] = [];
  newListName: string = '';
  newCardNames: { [listId: number]: string } = {};
  editingStates: { [cardId: number]: { editing: boolean; description: string } } = {};

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.boardId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBoard();
  }

  loadBoard(): void {
    this.dataService.getBoard(this.boardId).subscribe((board) => {
      this.board = board;

      this.board.lists.forEach((list: any) => {
        this.newCardNames[list.id] = '';

        this.dataService.getCardsForList(this.boardId, list.id).subscribe((cards) => {
          list.cards = cards;

          list.cards.forEach((card: any) => {
            if (!this.editingStates[card.id]) {
              this.editingStates[card.id] = {
                editing: false,
                description: card.description || ''
              };
            }
          });
        });
      });
    });
  }

  addCard(listId: number): void {
    const cardName = this.newCardNames[listId]?.trim();
    if (cardName) {
      const newCard = { name: cardName, description: '' };
      this.dataService.createCard(this.boardId, listId, newCard).subscribe(() => {
        this.newCardNames[listId] = '';
        this.loadBoard();
      });
    }
  }

  deleteCard(listId: number, cardId: number): void {
    this.dataService.deleteCard(this.boardId, listId, cardId).subscribe(() => {
      this.loadBoard();
    });
  }

  addList(): void {
    if (this.newListName.trim()) {
      this.dataService.createList(this.boardId, { name: this.newListName }).subscribe(() => {
        this.newListName = '';
        this.loadBoard();
      });
    }
  }

  deleteList(listId: number): void {
    this.dataService.deleteList(this.boardId, listId).subscribe(() => {
      this.loadBoard();
    });
  }

  toggleEdit(cardId: number): void {
    const editingState = this.editingStates[cardId];
    if (editingState) {
      editingState.editing = !editingState.editing;
    }
  }

  saveDescription(listId: number, cardId: number): void {
    const updatedDescription = this.editingStates[cardId].description;

    this.dataService.updateCard(this.boardId, listId, cardId, { description: updatedDescription }).subscribe(() => {
      this.editingStates[cardId].editing = false;
      this.loadBoard();
    });
  }
}
