import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoemComponent } from './update-poem.component';

describe('UpdatePoemComponent', () => {
  let component: UpdatePoemComponent;
  let fixture: ComponentFixture<UpdatePoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePoemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
