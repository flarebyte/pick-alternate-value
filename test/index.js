import test from "tape"
import pickAlternateValue from "../src"

test("pickAlternateValue", (t) => {
  t.plan(1)
  t.equal(true, pickAlternateValue(), "return true")
})
