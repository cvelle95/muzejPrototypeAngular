import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EksponatComponent } from './eksponat.component';

describe('EksponatComponent', () => {
  let component: EksponatComponent;
  let fixture: ComponentFixture<EksponatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EksponatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EksponatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
