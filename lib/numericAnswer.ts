import type { NumericRubric } from '../types';

type Rational = { n: bigint; d: bigint; form: 'integer' | 'decimal' | 'fraction' };
const zero = BigInt(0), one = BigInt(1);
function gcd(a: bigint, b: bigint): bigint { a = a < zero ? -a : a; while (b !== zero) { const t = b; b = a % b; a = t; } return a; }
// Grammar only: no eval, arithmetic expressions, exponent notation or loose parseFloat.
export function parseNumeric(raw: string): Rational | null {
  const s = raw.trim().replace(/−/g, '-');
  if (!s || s.length > 80) return null;
  const mixed = /^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(s);
  const fraction = /^(-?\d+)\s*\/\s*(\d+)$/.exec(s);
  if (mixed || fraction) {
    const d = BigInt((mixed ? mixed[4] : fraction![2]));
    if (d === zero) return null;
    const part = mixed ? BigInt(mixed[3]) : zero;
    if (mixed && part >= d) return null;
    const n = mixed ? (BigInt(mixed[2]) * d + part) * (mixed[1] ? -one : one) : BigInt(fraction![1]);
    return { n, d, form: 'fraction' };
  }
  if (!/^-?(?:(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?|\.\d+)$/.test(s)) return null;
  const clean = s.replace(/,/g, '');
  const places = clean.includes('.') ? clean.split('.')[1].length : 0;
  return { n: BigInt(clean.replace('.', '')), d: BigInt('1' + '0'.repeat(places)), form: places ? 'decimal' : 'integer' };
}
function valueAndUnit(raw: string, rubric: NumericRubric): Rational | null {
  let s = raw.trim().toLowerCase();
  const aliases = [...(rubric.unitAliases || [])].sort((a,b) => b.length-a.length);
  let found = false;
  for (const alias of aliases) {
    const unit = alias.toLowerCase();
    if (unit === '£' && s.startsWith(unit)) { s = s.slice(1).trim(); found = true; break; }
    if (s.endsWith(unit)) { s = s.slice(0, -unit.length).trim(); found = true; break; }
  }
  if (aliases.length && !found && !rubric.unitOptional) return null;
  return parseNumeric(s);
}
export function numericAnswersEqual(answer: string, expected: string, rubric: NumericRubric): boolean {
  const a = valueAndUnit(answer, rubric), e = valueAndUnit(expected, rubric);
  if (!a || !e) return false;
  if (rubric.form === 'fraction' && a.form !== 'fraction') return false;
  if (rubric.form === 'decimal' && a.form === 'fraction') return false;
  if (rubric.simplest && a.form === 'fraction' && gcd(a.n, a.d) !== one) return false;
  return a.n * e.d === e.n * a.d;
}
