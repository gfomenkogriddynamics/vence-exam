import { Component, inject, signal } from '@angular/core';
import { TABLE_HEADERS, TABLE_KEYS } from './table.component.consts';
import { EventsFacadeService } from '../../services/events-facade.service';
import { AnimalEvent } from '../../models';
import { FormsModule } from '@angular/forms';
import { FocusOnRenderDirective } from '../../directives/focus-on-render.directive';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, FocusOnRenderDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  eventsFacadeService = inject(EventsFacadeService);

  events = this.eventsFacadeService.events;
  isLoading = this.eventsFacadeService.isLoading;

  tableKeys = TABLE_KEYS;
  tableHeaders = TABLE_HEADERS;

  _editableCell = signal<{ eventId: number; key: keyof AnimalEvent } | null>(null)
  editableCell = this._editableCell.asReadonly();

  _isAddingNewRow = signal(false);
  isAddingNewRow = this._isAddingNewRow.asReadonly();

  inputValue = '';
  newRowValue: Record<string, string> = {};

  ngOnInit(): void {
    this.eventsFacadeService.getList();
  }

  enterEditMode(event: AnimalEvent, key: keyof AnimalEvent): void {
    if (key === 'eventId') {
      return;
    }

    this._editableCell.set({ eventId: event.eventId, key })

    this.inputValue = event[key] as string;
  }

  leaveEditMode(e: Event): void {
    e.stopPropagation();

    this._editableCell.set(null)
  }

  saveCell(e: Event, event: AnimalEvent, key: keyof AnimalEvent): void {
    this.eventsFacadeService.editEvent(event.eventId, {
      key,
      value: this.inputValue
    })

    this.leaveEditMode(e);
  }

  deleteRow(id: number): void {
    this.eventsFacadeService.deleteEvent(id);
  }

  enterAddNewRowMode(): void {
    this._isAddingNewRow.set(true);
  }

  leaveAddNewRowMode(): void {
    this._isAddingNewRow.set(false);
    this.newRowValue = {};
  }

  saveRow(): void {
    this.eventsFacadeService.addEvent(this.newRowValue);
    this.leaveAddNewRowMode();
  }
}
