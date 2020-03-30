import React from 'react';
import renderer from 'react-test-renderer';
import App, { addElementsInActa } from './testApp';
import Acta from '../src';
import { IComponentWithID } from '../src/types';

const paramsErrorMessage = `Acta.subscribeState params =>
[0]: string,
[1]: function,
[2]: mounted react component`;

describe('Acta subscribeState.test method', () => {
  /**
   * Feature
   */
  test('When a state change, the callback is triggered in the component.', () => {
    const app = renderer.create(<App />);

    // Render the app with an empty elements array
    let tree = app.toJSON();
    // The ul child should have no children
    let children = tree?.children?.find(
      // @ts-ignore
      child => child.props.id === 'listContainer',
      // @ts-ignore
    )?.children;
    expect(children).toBe(null);
    // Snapshot the resulting markup
    expect(tree).toMatchSnapshot();

    // Set the value in Acta state
    // It should trigger the callback
    addElementsInActa();

    // Render the app with an elements array containing strings now
    tree = app.toJSON();
    // The ul child should have children now
    children = tree?.children?.find(
      // @ts-ignore
      child => child.props.id === 'listContainer',
      // @ts-ignore
    )?.children;
    expect(Array.isArray(children)).toBe(true);
    expect(children.length > 0).toBe(true);
    // Snapshot the resulting markup
    expect(tree).toMatchSnapshot();
  });

  /**
   * Errors management
   */
  test('When the stateKey param is not a valid string, should throw an error', () => {
    expect(() => {
      // @ts-ignore
      Acta.subscribeState(null, () => true, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('', () => true, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState([], () => true, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState({}, () => true, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      Acta.subscribeState(
        // @ts-ignore
        () => true,
        // @ts-ignore
        () => true,
        // @ts-ignore
        {} as IComponentWithID,
      );
    }).toThrowError(paramsErrorMessage);
  });

  test('When the callback param is not a valid function, should throw an error', () => {
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', '', {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', null, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', undefined, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', [], {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', {}, {} as IComponentWithID);
    }).toThrowError(paramsErrorMessage);
  });

  test('When the callback param is not a valid function, should throw an error', () => {
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', () => true);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', () => true, '');
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', () => true, []);
    }).toThrowError(paramsErrorMessage);
    expect(() => {
      // @ts-ignore
      Acta.subscribeState('testKey', () => true, null);
    }).toThrowError(paramsErrorMessage);
  });
});