export class CreateSampleDto {
  name: string;
  title: string;
  description: string;
  color: string;
  region: string;
  details: {
    age: number;
    height: number;
  };
}
