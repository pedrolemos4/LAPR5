import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerPostComponent } from './fazer-post.component';

describe('FazerPostComponent', () => {
  let component: FazerPostComponent;
  let fixture: ComponentFixture<FazerPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FazerPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
