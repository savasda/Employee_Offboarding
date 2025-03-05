import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '@models/employee';

@Pipe({
  name: 'equipmentParser',
  standalone: true
})
export class EquipmentParserPipe implements PipeTransform {
  transform(equipments: Equipment[]): any {
    return equipments.map(eq => eq.name).join(', ');
  }
}
