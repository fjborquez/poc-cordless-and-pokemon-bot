import { config } from "../../../src/helpers/config";

    describe('config function', () => {
        const akey = 'akey';
        const avalue = 'avalue';
        process.env[akey] = avalue;

        test('it should return a value when asked for a key', () => {
            const returnedValue = config(akey);

            expect(returnedValue).toBe(avalue);
        });

        test('it should throw an error when there is no existing key', () => {
            const anonkey = 'anonkey';
            const functionWithError = () => config(anonkey);

            expect(functionWithError).toThrowError();
        });
    });
