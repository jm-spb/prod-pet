import { classNames } from './classNames';

describe('classNames', () => {
  test('with add classes', () => {
    const expexted = 'someClass class1 class2';
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expexted);
  });

  test('with mods', () => {
    const expected = 'someClass class1 class2 hovered scrollable';
    expect(classNames('someClass', { hovered: true, scrollable: true }, ['class1', 'class2'])).toBe(expected);
  });

  test('with diff mods', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2'])).toBe(expected);
  });

  test('with undefined', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(classNames('someClass', { hovered: true, scrollable: undefined }, ['class1', 'class2'])).toBe(expected);
  });

  test('with mods no additional calsses', () => {
    const expected = 'someClass hovered scrollable';
    expect(classNames('someClass', { hovered: true, scrollable: true })).toBe(expected);
  });
});
