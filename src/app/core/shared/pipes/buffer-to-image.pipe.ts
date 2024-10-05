import { Pipe, PipeTransform } from '@angular/core';
import { Buffer } from 'buffer'; // Usar o Buffer de Node.js

@Pipe({
  name: 'bufferToImage',
  standalone: true,
})
export class BufferToImagePipe implements PipeTransform {
  transform(value: Buffer): string {
    const buffer = Buffer.from(value);

    const base64 = buffer.toString('base64');
    return `data:image/png;base64,${base64}`; 
  }
}
