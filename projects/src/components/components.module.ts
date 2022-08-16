import { NgModule } from '@angular/core';
import { AtomsComponentsModule } from './atoms/atoms.module';
import { MoleculesComponentsModule } from './molecules/molecules.module';
import { OrganismsComponentsModule } from './organisms/organisms.module';

const modules = [
  AtomsComponentsModule,
  MoleculesComponentsModule,
  OrganismsComponentsModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class ComponentsModule {}
