import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaList } from './historia-list';

describe('HistoriaList', () => {
  let component: HistoriaList;
  let fixture: ComponentFixture<HistoriaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaList],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
