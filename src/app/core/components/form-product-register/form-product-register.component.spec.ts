import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductRegisterComponent } from './form-product-register.component';

describe('FormProductRegisterComponent', () => {
  let component: FormProductRegisterComponent;
  let fixture: ComponentFixture<FormProductRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProductRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProductRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
