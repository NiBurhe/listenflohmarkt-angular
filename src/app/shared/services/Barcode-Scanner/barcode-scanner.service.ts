import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { convertFromEn, keyToEn } from './barcode-scanner.utils';
import { BarcodeScannerStatus } from './barcode-scanner.enums';

@Injectable()
export class BarcodeScannerService {
  private barcodeSubject = new Subject<string>();
  barcode$ = this.barcodeSubject.asObservable();
  private statusSubject = new Subject<BarcodeScannerStatus>();
  status$ = this.statusSubject.asObservable();

  private input: string = '';
  private isReading: boolean = false;
  private isEnglishScanner: boolean = false;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('keydown', this.keydownHandler.bind(this));
    });
    this.statusSubject.next(BarcodeScannerStatus.READY);
  }

  private keydownHandler(event: KeyboardEvent): void {
    if (event.key !== "Shift" && this.read(event.key)) {
      event.preventDefault();
    }
    this.statusSubject.next(
      this.isReading ? BarcodeScannerStatus.READING : BarcodeScannerStatus.READY
    );
  }

  public reset(): void {
    this.isReading = false;
    this.input = '';
    this.statusSubject.next(BarcodeScannerStatus.READY);
  }

  private read(char: string): boolean {
    console.log(char)
    let preventDefault = false;
    if (this.isReading) {
      const newInput =
        this.input + String(this.isEnglishScanner ? keyToEn(char) : char);
      if (!'#-!'.startsWith(newInput.substring(0, 3))) {
        this.reset();
        const element = document.activeElement;
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement
        ) {
          element.value = element.value + newInput;
        }
      } else if (newInput.endsWith('#!-')) {
        this.barcodeSubject.next(newInput);
        this.reset();
        const element = document.activeElement;
        if (
          (element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement) && element.value.endsWith("´")
        ) {
          element.value = element.value.slice(0, -1);
        }
      } else {
        this.input = newInput;
      }
      return true;
    }
    if ((char == '§' || char == '#') && this.input.length == 0) {
      if (char == '§') {
        this.isEnglishScanner = true;
        this.input = keyToEn(char);
      } else {
        this.isEnglishScanner = false;
        this.input = char;
      }
      this.isReading = true;
      preventDefault = true;
    }
    return preventDefault;
  }
}
