import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoFinalLiguillaComponent } from './sorteo-final-liguilla.component';

describe('SorteoFinalLiguillaComponent', () => {
  let component: SorteoFinalLiguillaComponent;
  let fixture: ComponentFixture<SorteoFinalLiguillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorteoFinalLiguillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteoFinalLiguillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
