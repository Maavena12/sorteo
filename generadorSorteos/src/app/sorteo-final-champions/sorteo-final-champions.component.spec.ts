import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoFinalChampionsComponent } from './sorteo-final-champions.component';

describe('SorteoFinalChampionsComponent', () => {
  let component: SorteoFinalChampionsComponent;
  let fixture: ComponentFixture<SorteoFinalChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorteoFinalChampionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteoFinalChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
