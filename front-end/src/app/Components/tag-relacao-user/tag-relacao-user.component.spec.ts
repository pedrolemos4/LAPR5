import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRelacaoUserComponent } from './tag-relacao-user.component';

describe('TagRelacaoUserComponent', () => {
  let component: TagRelacaoUserComponent;
  let fixture: ComponentFixture<TagRelacaoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagRelacaoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRelacaoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
