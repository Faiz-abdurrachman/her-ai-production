import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'js/frontend/fellow-dashboard/math-learning.js'), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context, { filename: 'js/frontend/fellow-dashboard/math-learning.js' });

const runtime = context.window.HerAiMathLearning;
const records = runtime.submodules.flatMap(submodule => submodule.items.map(item => ({
    submodule,
    item,
    progressId: runtime.progressRecordIdFor(submodule, item)
})));
const progressIds = records.map(record => String(record.progressId));
const topicRecords = records.filter(record => record.item.type === 'topic');

assert.equal(records.length, 89);
assert.equal(topicRecords.length, 54);
assert.equal(new Set(progressIds).size, records.length);
for (const record of records) {
    if (record.item.type === 'topic') {
        const topicNumber = Number(record.item.id.slice(-2));
        assert.equal(record.progressId, Number(record.submodule.id) * 100 + topicNumber);
    } else {
        assert.equal(record.progressId, `${record.item.type}-${record.submodule.id}`);
    }
}

console.log('Math progress IDs valid: 54 numeric topic IDs and 35 unique semantic non-topic IDs.');
