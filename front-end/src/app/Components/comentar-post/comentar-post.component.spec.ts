import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarPostComponent } from './comentar-post.component';

describe('ComentarPostComponent', () => {
  let component: ComentarPostComponent;
  let fixture: ComponentFixture<ComentarPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
