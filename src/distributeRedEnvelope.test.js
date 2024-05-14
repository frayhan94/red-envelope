const distributeRedEnvelope = require('./distributeRedEnvelope');

describe('distributeRedEnvelope', () => {
    test('should distribute total amount correctly with valid inputs', () => {
        const totalAmount = 100;
        const numPeople = 10;
        const minAmount = 0.01;
        const amounts = distributeRedEnvelope(totalAmount, numPeople, minAmount);

        expect(amounts.length).toBe(numPeople);
        expect(amounts.reduce((sum, amount) => sum + amount, 0)).toBeCloseTo(totalAmount, 2);
        amounts.forEach(amount => {
            expect(amount).toBeGreaterThanOrEqual(minAmount);
        });
    });

    test('should throw error if total amount is too small', () => {
        const totalAmount = 0.05;
        const numPeople = 10;
        const minAmount = 0.01;

        expect(() => distributeRedEnvelope(totalAmount, numPeople, minAmount)).toThrow("Total amount is too small to be distributed equally.");
    });

    test('should handle exact amount distribution', () => {
        const totalAmount = 1.0;
        const numPeople = 10;
        const minAmount = 0.1;
        const amounts = distributeRedEnvelope(totalAmount, numPeople, minAmount);

        expect(amounts.length).toBe(numPeople);
        expect(amounts.reduce((sum, amount) => sum + amount, 0)).toBeCloseTo(totalAmount, 2);
        amounts.forEach(amount => {
            expect(amount).toBeGreaterThanOrEqual(minAmount);
        });
    });

    test('should handle large amount and many people', () => {
        const totalAmount = 1000;
        const numPeople = 100;
        const minAmount = 0.01;
        const amounts = distributeRedEnvelope(totalAmount, numPeople, minAmount);

        expect(amounts.length).toBe(numPeople);
        expect(amounts.reduce((sum, amount) => sum + amount, 0)).toBeCloseTo(totalAmount, 2);
        amounts.forEach(amount => {
            expect(amount).toBeGreaterThanOrEqual(minAmount);
        });
    });

    test('should distribute equally when minAmount is large', () => {
        const totalAmount = 50;
        const numPeople = 5;
        const minAmount = 10;
        const amounts = distributeRedEnvelope(totalAmount, numPeople, minAmount);

        expect(amounts.length).toBe(numPeople);
        expect(amounts.reduce((sum, amount) => sum + amount, 0)).toBeCloseTo(totalAmount, 2);
        amounts.forEach(amount => {
            expect(amount).toBeCloseTo(minAmount, 2);
        });
    });
});
