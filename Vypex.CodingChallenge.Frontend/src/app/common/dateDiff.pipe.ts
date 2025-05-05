import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateDiff' })
export class DateDiffPipe implements PipeTransform {
  transform(start: Date | string, end: Date | string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
  }
}