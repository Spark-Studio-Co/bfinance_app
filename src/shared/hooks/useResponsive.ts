// utils/useResponsive.ts
import { useCallback } from 'react';
import { useWindowDimensions, PixelRatio } from 'react-native';

// Базовые макетные размеры под iPhone X/11/12 (можно поменять)
const BASE_W = 360;
const BASE_H = 640;

export function useResponsive(baseW = BASE_W, baseH = BASE_H) {
  const { width, height, fontScale } = useWindowDimensions();

  // проценты от ширины/высоты
  const wp = useCallback((p: number) => (width * p) / 100, [width]);
  const hp = useCallback((p: number) => (height * p) / 100, [height]);

  // масштабируем “px” из макета пропорционально устройству
  const s = useCallback((size: number) => (width / baseW) * size, [width, baseW]);
  const vs = useCallback((size: number) => (height / baseH) * size, [height, baseH]);

  // «умеренный» скейл — чуть мягче, удобно для шрифтов/отступов
  const ms = useCallback((size: number, factor = 0.5) => size + (s(size) - size) * factor, [s]);

  // шрифты c учетом системного увеличения
  const fs = useCallback(
    (size: number, factor = 0.5) => {
      const scaled = ms(size, factor);
      return PixelRatio.roundToNearestPixel(scaled / fontScale);
    },
    [ms, fontScale]
  );

  return { wp, hp, s, vs, ms, fs };
}
