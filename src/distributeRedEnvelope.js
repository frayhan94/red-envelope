/**
 * Distributes the total amount of money into n random parts ensuring
 * each part is at least the minimum amount and the total sum equals the given amount.
 *
 * @param totalAmount - Total amount of money to be distributed.
 * @param numPeople - Number of people to distribute the money to.
 * @param minAmount - Minimum amount each person should receive.
 * @returns Array of amounts each person receives.
 */
function distributeRedEnvelope(totalAmount, numPeople, minAmount = 0.01) {
    if (totalAmount < numPeople * minAmount) {
        throw new Error("Total amount is too small to be distributed equally.");
    }

    let amounts = [];
    let remainingAmount = totalAmount;

    for (let i = 0; i < numPeople; i++) {
        // Ensure at least minAmount for each remaining person
        const maxAmount = remainingAmount - (numPeople - i - 1) * minAmount;
        const randomAmount = Math.random() * (maxAmount - minAmount) + minAmount;
        const amount = parseFloat(randomAmount.toFixed(2)); // Round to two decimal places
        amounts.push(amount);
        remainingAmount -= amount;
    }

    // Adjust the last amount to ensure the sum is exactly totalAmount
    const totalDistributed = amounts.reduce((sum, amount) => sum + amount, 0);
    amounts[amounts.length - 1] += parseFloat((totalAmount - totalDistributed).toFixed(2));

    return amounts.map(amount => parseFloat(amount.toFixed(2)));
}

module.exports = distributeRedEnvelope;
// Example usage:
const totalAmount = 100; // Total amount to be distributed
const numPeople = 10;    // Number of people
const minAmount = 0.01;  // Minimum amount each person should receive

const distributedAmounts = distributeRedEnvelope(totalAmount, numPeople, minAmount);
console.log(distributedAmounts);
console.log("Sum of distributed amounts:", distributedAmounts.reduce((sum, amount) => sum + amount, 0));
