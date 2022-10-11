import { CustomiserProductVariant } from '@store/customiser';

const getSizeVariation = (
  unit: string,
  weight: number,
  variations: Array<CustomiserProductVariant>,
) => {
  let size: string;
  if (unit === 'KGS') {
    switch (true) {
      case 0 <= weight && weight < 10:
        size = 'BABY';
        break;
      case 10 <= weight && weight < 16:
        size = 'TODDLER';
        break;
      case 16 <= weight && weight < 22:
        size = 'S-CHILD';
        break;
      case 22 <= weight && weight < 30:
        size = 'M-CHILD)';
        break;
      case 30 <= weight && weight < 40:
        size = 'L-CHILD';
        break;
      case 40 <= weight && weight < 50:
        size = '2XS';
        break;
      case 50 <= weight && weight < 59:
        size = 'XS';
        break;
      case 59 <= weight && weight < 69:
        size = 'S';
        break;
      case 69 <= weight && weight < 79:
        size = 'M';
        break;
      case 79 <= weight && weight < 90:
        size = 'L';
        break;
      case 90 <= weight && weight < 101:
        size = 'XL';
        break;
      case 101 <= weight && weight < 111:
        size = '2XL';
        break;
      case 111 <= weight && weight < 120:
        size = '3XL';
        break;
      case 120 <= weight:
        size = '4XL';
        break;
    }
  } else {
    switch (true) {
      case 0 <= weight && weight < 22:
        size = 'BABY';
        break;
      case 22 <= weight && weight < 35.3:
        size = 'TODDLER';
        break;
      case 35.3 <= weight && weight < 48.5:
        size = 'S-CHILD';
        break;
      case 48.5 <= weight && weight < 66.1:
        size = 'M-CHILD';
        break;
      case 66.1 <= weight && weight < 88.2:
        size = 'L-CHILD';
        break;
      case 88.2 <= weight && weight < 110.2:
        size = '2XS';
        break;
      case 110.2 <= weight && weight < 130:
        size = 'XS';
        break;
      case 130 <= weight && weight < 152.1:
        size = 'S';
        break;
      case 152.1 <= weight && weight < 174.2:
        size = 'M';
        break;
      case 174.2 <= weight && weight < 198.4:
        size = 'L';
        break;
      case 198.4 <= weight && weight < 222.7:
        size = 'XL';
        break;
      case 222.7 <= weight && weight < 244.7:
        size = '2XL';
        break;
      case 244.7 <= weight && weight < 264.6:
        size = '3XL';
        break;
      case 264.6 <= weight:
        size = '4XL';
        break;
    }
  }
  return variations.find((v) => v.sku?.includes(size));
};

export default getSizeVariation;
