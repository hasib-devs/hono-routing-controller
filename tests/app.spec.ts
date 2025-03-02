import assert from "node:assert/strict";
import test from "node:test";


test("app", () => {
    console.log("This is a test");
    assert.equal(1, 1);
});



test('todo() method with message', (t) => {
    t.todo('this is a todo test and is not treated as a failure');
}); 