import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { macierz } from './scena.ts';

const liczby = (m: string): number[] => m.slice('matrix3d('.length, -1).split(',').map(Number);

describe('macierz (homografia ekranu laptopa)', () => {
  it('przesunięty prostokąt daje czyste przesunięcie', () => {
    // Arrange
    const cel: Array<[number, number]> = [[10, 20], [110, 20], [110, 70], [10, 70]];

    // Act
    const m = liczby(macierz(100, 50, cel));

    // Assert
    const oczekiwane = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 0, 1];
    m.forEach((v, i) => assert.ok(Math.abs(v - oczekiwane[i]) < 1e-9, `pozycja ${i}: ${v}`));
  });

  it('zdegenerowany czworokąt (wszystkie rogi w jednym punkcie) nie daje skończonej macierzy', () => {
    const m = liczby(macierz(100, 50, [[5, 5], [5, 5], [5, 5], [5, 5]]));
    assert.ok(m.some((v) => !Number.isFinite(v)));
  });
});
