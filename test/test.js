import assert from 'assert';
import { calculateImpactFromValues, formatImpact } from '../app.js';

console.log('Running basic tests...');

const v1 = calculateImpactFromValues('car', 'omnivore', 350);
assert.strictEqual(v1, 7.2, 'Car + omnivore + 350 kWh should produce 7.2 kg CO₂e');

const v2 = calculateImpactFromValues('walk', 'vegan', 100);
assert.strictEqual(v2, 1.4, 'Walk + vegan + 100 kWh should produce 1.4 kg CO₂e');

const v3 = calculateImpactFromValues('bus', 'vegetarian', 200);
assert.strictEqual(v3, 3.3, 'Bus + vegetarian + 200 kWh should produce 3.3 kg CO₂e');

assert.strictEqual(formatImpact(4.3), '4.3 kg CO₂e', 'Formatting should match the expected label');

console.log('All tests passed.');