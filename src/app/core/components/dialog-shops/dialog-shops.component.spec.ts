import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShopsComponent } from './dialog-shops.component';

describe('DialogShopsComponent', () => {
  let component: DialogShopsComponent;
  let fixture: ComponentFixture<DialogShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
