import { Component } from '@angular/core';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
  <h2 [appHighlight]="'yellow'">Something Yellow</h2>
  <h2 appHighlight>The Default (Gray) </h2>
  <h2>No Highlight</h2>
  <input #box [appHighlight]="box.value" value="cyan"/>`
})
class TestComponent {}

fdescribe('HighlightDirective', () => {
  let fixture: any;
  let des: any;
  let bareH2: any;
  beforeEach(async() => {
    fixture = await TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight]'));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  })

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    console.log(bgColor)
    expect(bgColor).toBe('yellow');
  });

  it('should color 2d <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  })

  it('should bind <input> background to value color', () => {
    const input = des[2].nativeElement as HTMLInputElement;
    console.log(input)
    expect(input.style.backgroundColor)
      .withContext('initial backgroundColor')
      .toBe('cyan');
    
      input.value = 'green';

      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.style.backgroundColor)
        .withContext('changed backgroundColor')
        .toBe('green');
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  })
});
