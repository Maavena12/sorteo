import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasPersonalizadoComponent } from './eliminatorias-personalizado.component';

describe('EliminatoriasPersonalizadoComponent', () => {
  let component: EliminatoriasPersonalizadoComponent;
  let fixture: ComponentFixture<EliminatoriasPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminatoriasPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminatoriasPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
