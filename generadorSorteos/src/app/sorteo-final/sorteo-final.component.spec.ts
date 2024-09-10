import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoFinalComponent } from './sorteo-final.component';

describe('SorteoFinalComponent', () => {
  let component: SorteoFinalComponent;
  let fixture: ComponentFixture<SorteoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorteoFinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
